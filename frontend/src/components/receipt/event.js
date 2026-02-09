import { ping } from "../../utils/home.js";
import { isTokenExpired } from "../../utils/authentication.js";
import styles from "./component.module.css";

export default async function Events() {
  let socket = null;
  console.log("Receipt Page Event");

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

    const savedReceipt = sessionStorage.getItem("voteReceipt");

    if (!savedReceipt) {
      window.app.pushRoute("/leaderboards");
      return;
    }

    let receiptData;
    try {
      receiptData = JSON.parse(savedReceipt);
    } catch {
      window.app.pushRoute("/leaderboards");
      return;
    }

    const contentEl = document.getElementById("receipt-content");
    if (contentEl) {
      contentEl.innerHTML = buildReceiptHtml(receiptData);
    }

    sessionStorage.removeItem("voteSelections");
    sessionStorage.removeItem("voteCandidatesData");
    sessionStorage.removeItem("votetallyData");
    sessionStorage.removeItem("voteElectionId");

    if (!socket) {
      socket = io();
      socket.emit("setEmail", token);
    }

    socket.on("electionEnded", () => {
      alert("The election has ended.");
      if (socket) socket.disconnect();
      window.app.pushRoute("/leaderboards");
    });
  });
}

// --- HTML Builder Helper ---

function buildReceiptHtml({ userEmail, selections, votedAt }) {
  const date = new Date(votedAt);
  const dateStr = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const receiptNo = `VR-${date.getFullYear()}-${Date.now().toString().slice(-7)}`;

  const voteRowsHtml = selections
    .map(
      ({ position, name }) => `
      <div class="${styles["vote-row"]}">
        <span class="${styles["vote-label"]}">${position}</span>
        <span class="${styles["vote-dots"]}"></span>
        <span class="${styles["vote-value"]}">${name}</span>
      </div>`,
    )
    .join("");

  return `
    <div class="${styles.center}">
      <span class="${styles["vote-recorded"]}">Vote Recorded</span>
      <div class="${styles["mt-sm"]}">
        <small>Receipt No: ${receiptNo}</small>
      </div>
    </div>

    <hr class="${styles.divider}" />

    <div class="${styles["info-row"]}">
      <span class="${styles["info-label"]}">Voter:</span>
      <span class="${styles["info-value"]}">${userEmail}</span>
    </div>

    <div class="${styles["info-row"]}">
      <span class="${styles["info-label"]}">Date:</span>
      <span class="${styles["info-value"]}">${dateStr}</span>
    </div>

    <div class="${styles["info-row"]}">
      <span class="${styles["info-label"]}">Time:</span>
      <span class="${styles["info-value"]}">${timeStr}</span>
    </div>

    <hr class="${styles.divider}" />

    <div class="${styles["section-title"]}">Your Votes</div>

    ${voteRowsHtml}
  `;
}
