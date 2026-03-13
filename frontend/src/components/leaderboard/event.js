import { ping } from "../../utils/home";
import { isTokenExpired } from "../../utils/authentication";
import { getSocket } from "../../utils/socket.js";
import styles from "./component.module.css";

export default async function Events() {
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

  const socket = getSocket();
  socket.emit("setEmail", token);

  setupSocketListeners(socket);

  socket.emit("requestElectionData");

  function setupSocketListeners(socket) {
    socket.on("electionData", handleElectionData);
    socket.on("candidatesUpdate", handleCandidatesUpdate);
    socket.on("tallyUpdate", handleTallyUpdate);
    socket.on("electionCountdown", handleElectionCountdown);
    socket.on("electionEnded", handleElectionEnded);
    socket.on("winnersUpdate", handleWinnersUpdate);
    socket.on("electionError", handleElectionError);
    socket.on("disconnect", handleDisconnect);
  }

  function handleElectionData(electionData) {
    if (!electionData) {
      updateEmptyState("No active election");
      return;
    }

    sessionStorage.setItem("currentElection", JSON.stringify(electionData));
  }

  function handleCandidatesUpdate(candidates) {
    sessionStorage.setItem("candidates", JSON.stringify(candidates));
  }

  function handleTallyUpdate(leaderboard) {
    if (!leaderboard || leaderboard.length === 0) return;
    updateLeaderboard(leaderboard);
  }

  function handleElectionCountdown(countdownData) {
    const countdownContainer = document.getElementById("election-countdown");
    if (!countdownContainer) return;
    countdownContainer.innerHTML = buildCountdownHtml(countdownData);
  }

  function handleElectionEnded() {
    const countdownContainer = document.getElementById("election-countdown");
    if (countdownContainer) {
      countdownContainer.innerHTML = `
        <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); border-radius: 12px;">
          <h2 style="color: white; margin: 0 0 10px 0;">Election Has Ended</h2>
          <p style="color: white; margin: 0;">Viewing final results...</p>
        </div>
      `;
    }
  }

  function handleWinnersUpdate(data) {
    sessionStorage.setItem("winners", JSON.stringify(data.winners));
  }

  function handleElectionError(error) {
    console.error("Election error:", error);
    updateEmptyState(`Error: ${error.message || "Failed to load election data"}`);
  }

  function handleDisconnect() {
    const countdownContainer = document.getElementById("election-countdown");
    if (countdownContainer) {
      countdownContainer.innerHTML = `
        <p style="color: red; text-align: center; padding: 20px; background: #fee; border-radius: 12px;">
          Connection lost. Attempting to reconnect...
        </p>
      `;
    }
  }

  function updateLeaderboard(leaderboard) {
    const container = document.getElementById("leaderboard-content");
    if (!container) return;

    const emptyState = container.querySelector('[class*="empty-state"]');
    if (emptyState) {
      emptyState.remove();
    }

    leaderboard.forEach((positionData) => {
      const positionId = positionData.title.toLowerCase().replace(/\s+/g, "-");
      const positionElement = document.getElementById(`position-${positionId}`);

      if (positionElement) {
        const candidateList = positionElement.querySelector('[class*="candidate-list"]');
        const scrollTop = candidateList ? candidateList.scrollTop : 0;

        positionElement.outerHTML = buildLeaderboardPositionHtml(positionData);

        if (scrollTop) {
          const newElement = document.getElementById(`position-${positionId}`);
          const newList = newElement?.querySelector('[class*="candidate-list"]');
          if (newList) newList.scrollTop = scrollTop;
        }
      } else {
        container.insertAdjacentHTML("beforeend", buildLeaderboardPositionHtml(positionData));
      }
    });
  }

  function updateEmptyState(message) {
    const container = document.getElementById("leaderboard-content");
    if (container) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px;">
          <p style="color: #666; font-size: 18px;">${message}</p>
        </div>
      `;
    }
  }
}

// --- HTML Builder Helpers ---

function buildLeaderboardPositionHtml(positionData) {
  const positionId = positionData.title.toLowerCase().replace(/\s+/g, "-");

  const top3Circles = positionData.candidates
    .slice(0, 3)
    .map((candidate, index) => buildCircleHtml(candidate, index))
    .join("");

  const totalVotes = positionData.candidates.reduce((sum, c) => sum + c.votes, 0);
  const voteTallyHtml = buildVoteTallyHtml({
    title: "Leaderboard",
    totalVotes,
    candidates: positionData.candidates,
  });

  return `
    <div id="position-${positionId}" data-position="${positionData.title}" class="${styles["leaderboard-container"]}">
      <h2 class="${styles["position-title"]}">${positionData.title}</h2>
      <div class="${styles["circles-wrapper"]}">
        ${top3Circles}
      </div>
      ${voteTallyHtml}
    </div>
  `;
}

function buildCircleHtml({ name, votes, image }, index) {
  const sizeClass = index === 0 ? styles["large"] : styles["small"];
  const rankClass = styles[`rank-${index + 1}`];

  return `
    <div class="${styles["circle-container"]} ${rankClass}">
      <div class="${styles["circle"]} ${sizeClass}">
        <div class="${styles["circle-image"]}" style="background-image: url('${image}')"></div>
      </div>
      <div class="${styles["circle-details"]}">
        <p class="${styles["circle-name"]}">${name}</p>
        <p class="${styles["circle-total-vote"]}">${votes}</p>
      </div>
    </div>
  `;
}

function buildVoteTallyHtml({ title, totalVotes, candidates }) {
  const limitedCandidates = (candidates ?? []).slice(0, 10);

  return `
    <section class="${styles["voting-tally"]}">
      ${title ? `<h2 class="${styles["voting-tally-h2"]}">${title}</h2>` : ""}
      ${totalVotes ? `<p class="${styles["total-votes"]}">${totalVotes.toLocaleString()} total votes</p>` : ""}
      <div class="${styles["candidate-list"]}">
        <div class="${styles["candidate-column"]}">
          ${limitedCandidates.map(buildCandidateItemHtml).join("")}
        </div>
      </div>
    </section>
  `;
}

function buildCandidateItemHtml({ rank, image, name, votes, percentage, color }) {
  return `
    <div class="${styles["candidate-item"]}">
      <span class="${styles["rank-number"]}">${rank}</span>
      <img class="${styles["candidate-avatar"]}" src="${image}" alt="${name}" />
      <span class="${styles["candidate-name"]}">${name}</span>
      <div class="${styles["progress-container"]}">
        <div class="${styles["progress-bar"]} ${styles[color]}" style="width: ${percentage}%;"></div>
      </div>
      <span class="${styles["vote-count"]}">${votes.toLocaleString()}</span>
    </div>
  `;
}

function buildCountdownHtml(countdownData) {
  if (!countdownData || !countdownData.countdown) {
    return `<p class="${styles["countdown-text"]}">Loading...</p>`;
  }

  return `
    <div class="${styles["countdown-wrapper"]}">
      <h3 class="${styles["countdown-label"]}">Election Ends In:</h3>
      <p class="${styles["countdown-display"]}">${countdownData.countdown}</p>
    </div>
  `;
}
