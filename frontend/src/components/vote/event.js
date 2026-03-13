import { ping } from "../../utils/home.js";
import { isTokenExpired } from "../../utils/authentication.js";
import { getSocket } from "../../utils/socket.js";
import { jwtDecode } from "jwt-decode";
import styles from "./component.module.css";

const DEFAULT_AVATAR = "https://res.cloudinary.com/hamsters-api/image/upload/v1770500115/default_wdoaeg.jpg";
const POSITION_ORDER = ["President", "Vice President", "Senator", "Party-List"];

export default async function Events() {
  let electionId = null;
  let userEmail = null;
  let currentPosition = null;
  let positions = [];
  let candidatesByPosition = {};
  let tallyByPosition = {};
  let selections = {};

  console.log("Vote Page Event");

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

  // Decode email from token
  const decoded = jwtDecode(token);
  userEmail = decoded.email;

  const savedSelections = sessionStorage.getItem("voteSelections");
  if (savedSelections) {
    try {
      selections = JSON.parse(savedSelections);
    } catch {
      selections = {};
    }
  }

  const socket = getSocket();
  socket.emit("setEmail", token);

  setupSocketListeners(socket);

  socket.emit("requestElectionData");

  attachFooterEvents();

  function setupSocketListeners(socket) {
    socket.on("electionData", handleElectionData);
    socket.on("voteStatusResult", handleVoteStatusResult);
    socket.on("candidatesUpdate", handleCandidatesUpdate);
    socket.on("tallyUpdate", handleTallyUpdate);
    socket.on("electionCountdown", handleElectionCountdown);
    socket.on("electionEnded", handleElectionEnded);
    socket.on("electionError", handleElectionError);
    socket.on("disconnect", handleDisconnect);
  }

  // --- Socket Handlers ---

  function handleElectionData(data) {
    if (!data) {
      window.app.pushRoute("/leaderboards");
      return;
    }

    if (!electionId) {
      electionId = data.electionId;
      sessionStorage.setItem("currentElection", JSON.stringify(data));
      socket.emit("checkVoteStatus", { electionId, userEmail });
    }
  }

  function handleVoteStatusResult({ voted }) {
    if (voted) {
      window.app.pushRoute("/leaderboards");
    }
  }

  function handleCandidatesUpdate(candidates) {
    if (!candidates || candidates.length === 0) return;

    candidatesByPosition = {};
    for (const c of candidates) {
      if (!candidatesByPosition[c.position]) {
        candidatesByPosition[c.position] = [];
      }
      candidatesByPosition[c.position].push({
        candidateId: c.candidateId,
        name: c.fullname,
        image: c.imageUrl || DEFAULT_AVATAR,
      });
    }

    positions = POSITION_ORDER.filter((p) => candidatesByPosition[p]);

    if (!currentPosition && positions.length > 0) {
      currentPosition = positions[0];
    }

    const sidebarEl = document.getElementById("vote-sidebar");
    if (sidebarEl) {
      const activeSlug = currentPosition.toLowerCase().replace(/\s+/g, "-");
      sidebarEl.innerHTML = buildSidebarButtonsHtml(positions, activeSlug);
    }

    attachSidebarEvents();

    rerenderCurrentPosition();
  }

  function handleTallyUpdate(leaderboard) {
    if (!leaderboard || leaderboard.length === 0) return;

    tallyByPosition = {};
    for (const positionData of leaderboard) {
      tallyByPosition[positionData.title] = positionData.candidates;
    }

    rerenderCurrentPosition();
  }

  function handleElectionCountdown() {
    // No-op for vote page
  }

  function handleElectionEnded() {
    alert("The election has ended.");
    window.app.pushRoute("/leaderboards");
  }

  function handleElectionError(error) {
    console.error("Election error:", error);
    window.app.pushRoute("/leaderboards");
  }

  function handleDisconnect() {
    console.log("Socket disconnected on vote page");
  }

  // --- Core Rendering ---

  function rerenderCurrentPosition() {
    if (!currentPosition) return;

    const baseCandidates = candidatesByPosition[currentPosition] || [];
    const tally = tallyByPosition[currentPosition] || [];

    let mergedCandidates;
    if (tally.length > 0) {
      mergedCandidates = tally;
    } else {
      mergedCandidates = baseCandidates.map((c, index) => ({
        candidateId: c.candidateId,
        name: c.name,
        image: c.image,
        rank: index + 1,
        votes: 0,
        percentage: 0,
      }));
    }

    const selectedCandidateId = selections[currentPosition] || null;

    // Update topbar
    const topbarEl = document.getElementById("vote-topbar");
    if (topbarEl) {
      topbarEl.innerHTML = buildTopbarHtml(
        `Vote for ${currentPosition}`,
        `Select your preferred candidate for ${currentPosition}`,
      );
    }

    // Update cards
    const cardsEl = document.getElementById("vote-cards");
    if (cardsEl) {
      if (!mergedCandidates || mergedCandidates.length === 0) {
        cardsEl.innerHTML = `<p style="text-align: center; padding: 40px; color: #666;">No candidates for this position.</p>`;
      } else {
        cardsEl.innerHTML = mergedCandidates
          .map((candidate) =>
            buildCardHtml({
              candidateId: candidate.candidateId,
              name: candidate.name,
              image: candidate.image,
              rank: candidate.rank,
              votes: candidate.votes,
              percentage: candidate.percentage,
              isSelected: candidate.candidateId === selectedCandidateId,
            }),
          )
          .join("");
      }
    }

    attachCardClickEvents();
  }

  // --- DOM Event Handlers ---

  function attachSidebarEvents() {
    const sidebarEl = document.getElementById("vote-sidebar");
    if (!sidebarEl) return;

    const sidebarButtons = sidebarEl.querySelectorAll("[data-position]");

    sidebarButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        sidebarButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const position = btn.getAttribute("data-position");
        if (position) {
          currentPosition = position;
          rerenderCurrentPosition();
        }
      });
    });
  }

  function attachCardClickEvents() {
    const cardsEl = document.getElementById("vote-cards");
    if (!cardsEl) return;

    const cards = cardsEl.querySelectorAll("[data-candidate-id]");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const candidateId = parseInt(card.getAttribute("data-candidate-id"), 10);

        // Toggle selection
        if (selections[currentPosition] === candidateId) {
          delete selections[currentPosition];
        } else {
          selections[currentPosition] = candidateId;
        }

        rerenderCurrentPosition();
      });
    });
  }

  function attachFooterEvents() {
    const cancelButton = document.querySelector("[data-action='cancel']");
    const voteButton = document.querySelector("[data-action='vote']");

    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to cancel your vote?")) {
          window.app.pushRoute("/leaderboards");
        }
      });
    }

    if (voteButton) {
      voteButton.addEventListener("click", () => {
        handleVoteSubmission();
      });
    }
  }

  // --- Vote → Confirmation redirect ---

  function handleVoteSubmission() {
    const missingPositions = positions.filter((p) => !selections[p]);

    if (missingPositions.length > 0) {
      alert(`Please select a candidate for: ${missingPositions.join(", ")}`);
      currentPosition = missingPositions[0];
      updateSidebarActive();
      rerenderCurrentPosition();
      return;
    }

    // store data in sessionStorage for confirmation page
    sessionStorage.setItem("voteSelections", JSON.stringify(selections));
    sessionStorage.setItem("voteCandidatesData", JSON.stringify(candidatesByPosition));
    sessionStorage.setItem("votetallyData", JSON.stringify(tallyByPosition));
    sessionStorage.setItem("voteElectionId", electionId);

    window.app.pushRoute("/confirmation");
  }

  function updateSidebarActive() {
    const sidebarEl = document.getElementById("vote-sidebar");
    if (!sidebarEl) return;

    const sidebarButtons = sidebarEl.querySelectorAll("[data-position]");
    sidebarButtons.forEach((btn) => {
      if (btn.getAttribute("data-position") === currentPosition) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }
}

// --- HTML Builder Helpers ---

function buildTopbarHtml(title, subtitle) {
  return `
    <div class="${styles.topbar}">
      <div class="${styles.topbar_content}">
        <h1 class="${styles.topbar_title}">${title}</h1>
        <p class="${styles.topbar_subtitle}">${subtitle}</p>
      </div>
    </div>
  `;
}

function buildCardHtml({ candidateId, name, image, rank, votes, percentage, isSelected }) {
  return `
    <div class="${styles["card"]} ${isSelected ? styles["card-selected"] : ""}" data-candidate-id="${candidateId}">
      <div class="${styles["status_badge"]}">${rank}</div>
      <div class="${styles["card_content"]}">
          <div class="${styles["card_image"]}" style="background-image: url('${image}')"></div>
          <div class="${styles["card_text"]}">
              <p class="${styles["card_title"]}">${name}</p>
              <p class="${styles["card_total_votes"]}">${votes.toLocaleString()} votes</p>
              <div class="${styles["card_progress_container"]}">
                <p class="${styles["card_progress_label"]}">Chance of Winning: ${percentage}%</p>
                <div class="${styles["card_progress_bar"]}">
                    <div class="${styles["card_progress_fill"]}" style="width: ${percentage}%"></div>
                </div>
              </div>
          </div>
      </div>
    </div>
  `;
}

function buildSidebarButtonsHtml(positions, activeSlug) {
  return positions
    .map((pos) => {
      const slug = pos.toLowerCase().replace(/\s+/g, "-");
      const isActive = slug === activeSlug;
      return `<button class="${styles["sidebar-item"]} ${isActive ? "active" : ""}" data-position="${pos}">${pos}</button>`;
    })
    .join("");
}
