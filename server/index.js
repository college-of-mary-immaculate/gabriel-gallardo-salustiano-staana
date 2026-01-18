// server/index.js
import "dotenv/config.js";
import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import { io as Client } from "socket.io-client";

const app = express();
const server = createServer(app);

// Initialize Socket.IO server with WebSocket and polling transports
const io = new Server(server, {
  transports: ["websocket", "polling"],
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

try {
  let isConnectedToPublisher = false;
  let activeVoters = [];

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      if (socket.data.email) {
        activeVoters = activeVoters.filter((v) => v !== socket.data.email);
        io.emit("activeVoters", activeVoters);
      }
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  server.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
  });
} catch (error) {
  console.error("Server error:", error);
}
