// server/index.js
import "dotenv/config.js";
import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import { io as Client } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

import { getActiveElection, getElectionHistory } from "./api/election.js";
import { getOrCreateElection, markElectionEnd } from "./utils/electionManager.js";
import { initializeElectionCandidates } from "./utils/candidateManager.js";
import { calculateCountdown } from "./utils/countdown.js";
import { getVoteCounts, hasVotedInElection } from "./api/vote.js";
import { getCurrentCandidates, getCandidatesByElection } from "./api/candidate.js";
import { computeLeaderboard, computeWinners } from "./utils/tallyComputer.js";

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
  app.use(express.static(join(__dirname, "dist")));
  app.get("*all", (request, response) => {
    response.sendFile(join(__dirname, "dist/index.html"));
  });
} else {
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
  let activeVoters = [];
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

        if (election) {
          const candidates = await getCurrentCandidates();
          socket.emit("candidatesUpdate", candidates);

          const voteCounts = await getVoteCounts(election.electionId);
          const leaderboard = computeLeaderboard(voteCounts, candidates);
          socket.emit("tallyUpdate", leaderboard);
        }
      } catch (error) {
        console.error("Error fetching election data:", error);
        socket.emit("electionError", { message: "Failed to fetch election data" });
      }
    });

    socket.on("requestPastElections", async () => {
      try {
        const pastElections = await getElectionHistory();
        socket.emit("pastElections", pastElections);
      } catch (error) {
        console.error("Error fetching past elections:", error);
        socket.emit("electionError", { message: "Failed to fetch past elections" });
      }
    });

    socket.on("requestElectionWinners", async ({ electionId }) => {
      try {
        const candidates = await getCandidatesByElection(electionId);
        const voteCounts = await getVoteCounts(electionId);
        const winners = computeWinners(voteCounts, candidates);
        socket.emit("electionWinners", { electionId, winners });
      } catch (error) {
        console.error("Error computing winners:", error);
        socket.emit("winnersError", { message: "Failed to compute winners" });
      }
    });

    socket.on("checkVoteStatus", async ({ electionId, userEmail }) => {
      try {
        const voted = await hasVotedInElection(electionId, userEmail);
        socket.emit("voteStatusResult", { electionId, voted });
      } catch (error) {
        console.error("Error checking vote status:", error);
        socket.emit("voteStatusResult", { electionId, voted: false });
      }
    });

    socket.on("voteSubmitted", async ({ electionId }) => {
      try {
        const candidates = await getCurrentCandidates();
        const voteCounts = await getVoteCounts(electionId);
        const leaderboard = computeLeaderboard(voteCounts, candidates);

        if (process.env.PUBLISHER === "true") {
          io.emit("tallyUpdate", leaderboard);
        } else {
          if (typeof subscriberSocket !== "undefined" && subscriberSocket?.connected) {
            subscriberSocket.emit("voted", { electionId, tally: leaderboard });
          }

          io.emit("tallyUpdate", leaderboard);
        }
      } catch (error) {
        console.error("Error broadcasting tally:", error);
      }
    });

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
      const election = await getOrCreateElection();
      await initializeElectionCandidates(election.electionId);
    } catch (error) {
      console.error("Failed to initialize election or candidates:", error);
    }

    setInterval(async () => {
      try {
        const election = await getActiveElection();

        if (election) {
          const candidates = await getCurrentCandidates();
          const voteCounts = await getVoteCounts(election.electionId);
          const leaderboard = computeLeaderboard(voteCounts, candidates);
          const countdown = calculateCountdown(new Date(election.endTime));

          io.emit("tallyUpdate", leaderboard);
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
            const winners = computeWinners(voteCounts, candidates);

            io.emit("electionEnded", {
              electionId: election.electionId,
              endTime: election.endTime,
            });

            io.emit("winnersUpdate", {
              electionId: election.electionId,
              winners,
            });

            activeVoters = [];

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

            subscriberSocket.on("electionCountdown", (data) => {
              io.emit("electionCountdown", data);
            });

            subscriberSocket.on("electionData", (data) => {
              io.emit("electionData", data);
            });

            subscriberSocket.on("candidatesUpdate", (data) => {
              io.emit("candidatesUpdate", data);
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
      }
    });
  }

  server.listen(process.env.PORT, () => {
    console.log(`Application is running on port: ${process.env.PORT}`);
  });
} catch (error) {
  console.error("Application error:", error);
}
