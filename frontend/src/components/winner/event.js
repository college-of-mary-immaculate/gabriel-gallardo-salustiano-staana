import { ping } from "../../utils/home";
import { isTokenExpired } from "../../utils/authentication";
import styles from "./component.module.css";

export default async function Events() {
  let socket = null;

  window.addEventListener("load", async function () {
    try {
      await ping();
      document.getElementById("under-maintenance").style.display = "none";
      document.getElementById("app").style.display = "block";
    } catch {
      document.getElementById("under-maintenance").style.display = "block";
      document.getElementById("app").style.display = "none";
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      window.app.pushRoute("/login");
      return;
    }

    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      window.app.pushRoute("/login");
      return;
    }

    const stored = sessionStorage.getItem("winners");
    if (stored) {
      try {
        renderWinners(JSON.parse(stored));
      } catch {}
    }

    if (!socket) {
      socket = io();
      socket.emit("setEmail", token);
    }

    setupSocketListeners(socket);

    const electionData = sessionStorage.getItem("currentElection");
    if (electionData) {
      try {
        const { electionId } = JSON.parse(electionData);
        socket.emit("requestElectionWinners", { electionId });
      } catch {}
    } else {
      socket.emit("requestElectionData");
    }
  });

  function setupSocketListeners(socket) {
    socket.on("electionWinners", handleElectionWinners);
    socket.on("winnersUpdate", handleWinnersUpdate);
    socket.on("electionData", handleElectionData);
    socket.on("winnersError", handleWinnersError);
    socket.on("disconnect", handleDisconnect);
  }

  function handleElectionWinners(data) {
    if (data?.winners) {
      sessionStorage.setItem("winners", JSON.stringify(data.winners));
      renderWinners(data.winners);
    }
  }

  function handleWinnersUpdate(data) {
    if (data?.winners) {
      sessionStorage.setItem("winners", JSON.stringify(data.winners));
      renderWinners(data.winners);
    }
  }

  function handleElectionData(electionData) {
    if (electionData?.electionId) {
      sessionStorage.setItem("currentElection", JSON.stringify(electionData));
      socket.emit("requestElectionWinners", { electionId: electionData.electionId });
    } else {
      updateEmptyState("No active election");
    }
  }

  function handleWinnersError(error) {
    console.error("Winners error:", error);
    updateEmptyState(error?.message || "Failed to load winners");
  }

  function handleDisconnect() {
    const container = document.getElementById("winner-cards");
    if (container) {
      container.innerHTML = `
        <p style="color: red; text-align: center; padding: 20px;">
          Connection lost. Attempting to reconnect...
        </p>
      `;
    }
  }

  function renderWinners(winners) {
    const container = document.getElementById("winner-cards");
    if (!container) return;

    if (!winners || winners.length === 0) {
      updateEmptyState("No winners in the last election");
      return;
    }

    container.innerHTML = winners.map(buildWinnerCardHtml).join("");
  }

  function updateEmptyState(message) {
    const container = document.getElementById("winner-cards");
    if (container) {
      container.innerHTML = `
        <p style="text-align: center; padding: 20px; color: #666;">${message}</p>
      `;
    }
  }
}

// --- HTML Builder Helpers ---

function buildWinnerCardHtml({ name, position, image, votes, percentage }) {
  return `
    <div class="${styles["cards"]}">
      <div class="${styles["card"]}">
        <img src="${image}" alt="${name}" class="${styles["avatar"]}">
        <div class="${styles["card-info"]}">
          <div class="${styles["name-role"]}">
            <span class="${styles["name"]}">${name}</span>
            <span class="${styles["role"]}">${position}</span>
          </div>
          <div class="${styles["votes"]}">
            <span class="${styles["vote-count"]}">${votes.toLocaleString()} votes</span>
            <span class="${styles["percent"]}">${percentage}%</span>
          </div>
          <div class="${styles["progress-bar"]}" style="background: linear-gradient(to right, #2563eb ${percentage}%, #e2e8f0 ${percentage}%);"></div>
        </div>
      </div>
    </div>
  `;
}
