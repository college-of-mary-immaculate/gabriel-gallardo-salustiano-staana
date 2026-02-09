import styles from "./component.module.css";

export default function Main(root) {
  document.body.classList.add("page-leaderboard");

  root.innerHTML = `
    <div id="leaderboard-content">
      <div id="election-countdown" class="${styles["countdown-container"]}">
        <p class="${styles["countdown-text"]}">Loading election data...</p>
      </div>
      <div class="${styles["empty-state"]}">
        <p>Loading leaderboard data...</p>
      </div>
    </div>
  `;
  root.className = styles["main"];
}
