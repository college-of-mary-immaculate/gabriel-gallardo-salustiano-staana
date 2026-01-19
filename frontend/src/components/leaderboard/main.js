import Circle from "./circle.js";
import { leaderboardData } from "./event.js";
import styles from "./component.module.css";
import VoteTally from "./voteTally.js";
import PositionTitle from "./positionTitle.js";

export default function Main(root) {
  document.body.classList.add("page-leaderboard");

  // Generate HTML for each position
  const leaderboardHtml = leaderboardData
    .map((positionData) => {
      const top3Circles = positionData.candidates
        .slice(0, 3)
        .map((candidate, index) => Circle(candidate, index))
        .join("");

      const voteTallyHtml = VoteTally({
        title: "Leaderboard",
        totalVotes: positionData.candidates.reduce(
          (sum, c) => sum + c.votes,
          0,
        ),
        candidates: positionData.candidates,
      });

      return `
        <div class="${styles["leaderboard-container"]}">
          ${PositionTitle({ title: positionData.title })}
          <div class="${styles["circles-wrapper"]}">
            ${top3Circles}
          </div>
          ${voteTallyHtml}
        </div>
      `;
    })
    .join("");

  root.innerHTML = leaderboardHtml;
  root.className = styles["main"];
}
