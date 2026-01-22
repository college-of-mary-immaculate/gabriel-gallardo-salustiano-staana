// server/index.js
import "dotenv/config.js";
import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import { io as Client } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

import { getWinners, getActiveElection } from "./utils/election.js";
import { getOrCreateElection, markElectionEnd } from "./utils/electionManager.js";
import { initializeElectionCandidates } from "./utils/candidateManager.js";
import { calculateCountdown } from "./utils/countdown.js";
import { fetchTally } from "./utils/vote.js";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  transports: ["websocket", "polling"],
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  },
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.CONTAINERIZED === "true") {
  // In container: serve from /dist
  app.use(express.static(join(__dirname, "dist")));
  app.get("*all", (request, response) => {
    response.sendFile(join(__dirname, "dist/index.html"));
  });
} else {
  // In development: serve from ../dist
  app.use(express.static(join(__dirname, "../dist")));
  app.get("*all", async (request, response) => {
    response.sendFile(join(__dirname, "../dist/index.html"));
  });
}

const portsLists = process.env.PORTS.split(",").map((url) => {
  const [host, port] = url.split(":");
  return { host, port };
});

try {
  let isConnectedToPublisher = false;
  let votes = {};
  let activeVoters = [];
  let currentElection = null;
  let currentCandidates = null;
  let electionEnded = false;

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("setEmail", (token) => {
      try {
        const decoded = jwtDecode(token);
        socket.data.email = decoded.email;
        socket.data.userId = decoded.userId || decoded.vin;

        if (!activeVoters.includes(socket.data.email)) {
          activeVoters.push(socket.data.email);
          io.emit("activeVoters", activeVoters);
          console.log(`Active voters: ${activeVoters.length}`);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    });

    socket.emit("activeVoters", activeVoters);

    socket.on("requestElectionData", async () => {
      try {
        const election = await getActiveElection();
        socket.emit("electionData", election);

        // Also send current tally if election exists
        if (election) {
          const tally = await fetchTally(election.electionId);
          socket.emit("tallyUpdate", tally);
        }
      } catch (error) {
        console.error("Error fetching election data:", error);
        socket.emit("electionError", { message: "Failed to fetch election data" });
      }
    });

    socket.on("requestTally", async ({ electionId }) => {
      try {
        const tally = await fetchTally(electionId);
        socket.emit("tallyUpdate", tally);
      } catch (error) {
        console.error("Error fetching tally:", error);
        socket.emit("tallyError", { message: "Failed to fetch tally" });
      }
    });

    socket.on("requestWinners", async ({ electionId }) => {
      try {
        const winners = await getWinners(electionId);
        socket.emit("winnersUpdate", { electionId, winners });
      } catch (error) {
        console.error("Error fetching winners:", error);
        socket.emit("winnersError", { message: "Failed to fetch winners" });
      }
    });

    socket.on("voteSubmitted", async ({ electionId }) => {
      try {
        const tally = await fetchTally(electionId);

        if (process.env.PUBLISHER === "true") {
          io.emit("tallyUpdate", tally);
        } else {
          if (typeof subscriberSocket !== "undefined" && subscriberSocket?.connected) {
            subscriberSocket.emit("voted", { electionId, tally });
          }

          // Also update own clients
          io.emit("tallyUpdate", tally);
        }
      } catch (error) {
        console.error("Error broadcasting tally:", error);
      }
    });

    // handle discovery requests (for subscriber instances)
    socket.on("discovery", () => {
      if (process.env.PUBLISHER === "true") {
        const publisherAddress = `ws://${process.env.SERVER_NAME}:${process.env.PORT}`;
        console.log(`Publisher address requested: ${publisherAddress}`);
        socket.emit("address", publisherAddress);
      }
    });

    socket.on("disconnect", () => {
      if (socket.data.email) {
        activeVoters = activeVoters.filter((v) => v !== socket.data.email);
        io.emit("activeVoters", activeVoters);
        console.log(`Client disconnected: ${socket.id}, Active voters: ${activeVoters.length}`);
      } else {
        console.log(`Client disconnected: ${socket.id}`);
      }
    });
  });

  // PUBLISHER: Broadcasts election updates to all clients
  if (process.env.PUBLISHER === "true") {
    console.log("🔴 Running as PUBLISHER");
    try {
      currentElection = await getOrCreateElection();
      currentCandidates = await initializeElectionCandidates(currentElection.electionId);
    } catch (error) {
      console.error("Failed to initialize election or candidates:", error);
    }

    setInterval(async () => {
      try {
        const election = await getActiveElection();

        if (election) {
          const tally = await fetchTally(election.electionId);
          const countdown = calculateCountdown(new Date(election.endTime));

          io.emit("tallyUpdate", tally);
          io.emit("electionData", election);
          io.emit("electionCountdown", {
            electionId: election.electionId,
            countdown: countdown.display,
            totalMs: countdown.totalMs,
            hours: countdown.hours,
            minutes: countdown.minutes,
            seconds: countdown.seconds,
          });

          if (countdown.ended && !electionEnded) {
            electionEnded = true;
            const winners = await getWinners(election.electionId);

            io.emit("electionEnded", {
              electionId: election.electionId,
              endTime: election.endTime,
            });

            io.emit("winnersUpdate", {
              electionId: election.electionId,
              winners,
            });

            activeVoters = [];
            votes = {};

            await markElectionEnd(election.electionId);

            try {
              const newElection = await getActiveElection();
              if (newElection) {
                await initializeElectionCandidates(newElection.electionId);
              }
            } catch (error) {
              console.error("Failed to initialize candidates for new election:", error);
            }

            electionEnded = false;
          }
        }
      } catch (error) {
        console.error("Error in publisher broadcast loop:", error);
      }
    }, 1000);
  } else {
    // SUBSCRIBER: Connects to publisher and relays events to clients
    console.log("🔵 Running as SUBSCRIBER");

    portsLists.forEach(({ host, port }) => {
      if (!isConnectedToPublisher) {
        const messengerSocket = Client(`ws://${host}:${port}`, {
          transports: ["websocket", "polling"],
        });

        messengerSocket.on("connect", () => {
          console.log(`Finding publisher`);
          messengerSocket.emit("discovery");
        });

        messengerSocket.on("address", (url) => {
          if (!isConnectedToPublisher) {
            isConnectedToPublisher = true;
            console.log(`Subscriber on port ${process.env.PORT} connected to publisher: ${url}`);

            const subscriberSocket = Client(url, {
              transports: ["websocket", "polling"],
            });

            subscriberSocket.on("connect", () => {
              console.log("Connected to publisher server");
            });

            subscriberSocket.on("tallyUpdate", (data) => {
              io.emit("tallyUpdate", data);
            });

            subscriberSocket.on("electionData", (data) => {
              io.emit("electionData", data);
            });

            subscriberSocket.on("electionEnded", (data) => {
              console.log(`Relaying election ended: ${data.electionId}`);
              io.emit("electionEnded", data);
            });

            subscriberSocket.on("winnersUpdate", (data) => {
              console.log(`Relaying winners for election: ${data.electionId}`);
              io.emit("winnersUpdate", data);
            });

            subscriberSocket.on("activeVoters", (data) => {
              io.emit("activeVoters", data);
            });

            subscriberSocket.on("voted", (data) => {
              console.log(`Vote received from subscriber for election: ${data.electionId}`);
              io.emit("tallyUpdate", data.tally);
            });

            subscriberSocket.on("disconnect", () => {
              console.log("Disconnected from publisher");
              isConnectedToPublisher = false;
            });

            subscriberSocket.on("connect_error", (error) => {
              console.error("Connection error to publisher:", error.message);
            });
          }
        });

        // messengerSocket.on("connect_error", (error) => {
        //   // Silent fail for discovery - not all servers are publishers
        // });
      }
    });
  }

  server.listen(process.env.PORT, () => {
    console.log(`Application is running on port: ${process.env.PORT}`);
  });
} catch (error) {
  console.error("Application error:", error);
}
