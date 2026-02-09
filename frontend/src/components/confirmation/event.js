import { ping } from "../../utils/home.js";
import { isTokenExpired } from "../../utils/authentication.js";
import { castVote } from "../../utils/vote.js";
import { jwtDecode } from "jwt-decode";
import styles from "./component.module.css";

const POSITION_ORDER = ["President", "Vice President", "Senator", "Party-List"];

export default async function Events() {
  let socket = null;
  let electionId = null;
  let userEmail = null;
  let selections = {};
  let displayData = [];

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

    const decoded = jwtDecode(token);
    userEmail = decoded.email;

    const savedSelections = sessionStorage.getItem("voteSelections");
    const savedCandidates = sessionStorage.getItem("voteCandidatesData");
    const savedTally = sessionStorage.getItem("votetallyData");
    electionId = sessionStorage.getItem("voteElectionId");

    if (!savedSelections || !electionId) {
      window.app.pushRoute("/vote");
      return;
    }

    try {
      selections = JSON.parse(savedSelections);
    } catch {
      window.app.pushRoute("/vote");
      return;
    }

    const candidatesByPosition = savedCandidates ? JSON.parse(savedCandidates) : {};
    const tallyByPosition = savedTally ? JSON.parse(savedTally) : {};

    displayData = buildDisplayData(selections, candidatesByPosition, tallyByPosition);

    if (displayData.length === 0) {
      window.app.pushRoute("/vote");
      return;
    }

    const contentEl = document.getElementById("confirmation-content");
    if (contentEl) {
      contentEl.innerHTML = buildConfirmationHtml(displayData);
    }

    if (!socket) {
      socket = io();
      socket.emit("setEmail", token);
    }

    socket.on("electionEnded", () => {
      alert("The election has ended.");
      if (socket) socket.disconnect();
      window.app.pushRoute("/leaderboards");
    });

    attachButtonEvents();
  });

  function buildDisplayData(selections, candidatesByPosition, tallyByPosition) {
    const result = [];

    for (const position of POSITION_ORDER) {
      const candidateId = selections[position];
      if (!candidateId) continue;

      const tally = tallyByPosition[position] || [];
      const tallyMatch = tally.find((c) => c.candidateId === candidateId);

      if (tallyMatch) {
        result.push({
          position,
          candidateId: tallyMatch.candidateId,
          name: tallyMatch.name,
          image: tallyMatch.image,
        });
        continue;
      }

      const candidates = candidatesByPosition[position] || [];
      const candidateMatch = candidates.find((c) => c.candidateId === candidateId);

      if (candidateMatch) {
        result.push({
          position,
          candidateId: candidateMatch.candidateId,
          name: candidateMatch.name,
          image: candidateMatch.image,
        });
      }
    }

    return result;
  }

  function attachButtonEvents() {
    const cancelButton = document.querySelector("[data-action='cancel']");
    const submitButton = document.querySelector("[data-action='submit']");

    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        window.app.pushRoute("/vote");
      });
    }

    if (submitButton) {
      submitButton.addEventListener("click", async () => {
        await handleSubmit();
      });
    }
  }

  async function handleSubmit() {
    if (!confirm("Are you sure you want to submit your vote? This action cannot be undone.")) {
      return;
    }

    const votes = Object.values(selections).map((candidateId) => ({ candidateId }));

    const submitButton = document.querySelector("[data-action='submit']");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    try {
      await castVote({ userEmail, votes });

      if (socket && electionId) {
        socket.emit("voteSubmitted", { electionId });
      }

      sessionStorage.setItem(
        "voteReceipt",
        JSON.stringify({
          userEmail,
          selections: displayData,
          votedAt: new Date().toISOString(),
        }),
      );

      window.app.pushRoute("/receipt");
    } catch (error) {
      console.error("Vote submission error:", error);

      if (error.response) {
        alert(`Vote failed: ${error.response.data?.message || "Unknown error"}`);
      } else {
        alert("Failed to submit vote. Please try again.");
      }

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
      }
    }
  }
}

// --- HTML Builder Helper ---

function buildConfirmationHtml(displayData) {
  const membersHtml = displayData
    .map(
      ({ position, name, image }) => `
      <div class="${styles["member"]}">
        <div class="${styles["left"]}">
          <img src="${image}" alt="avatar">
          <div>
            <p class="${styles["role"]}">${position}</p>
            <p class="${styles["name"]}">${name}</p>
          </div>
        </div>
      </div>`,
    )
    .join("");

  return `
    ${membersHtml}
    <div class="${styles["actions"]}">
      <button class="${styles["cancel"]}" data-action="cancel">Cancel</button>
      <button class="${styles["submit"]}" data-action="submit">Submit</button>
    </div>
  `;
}
