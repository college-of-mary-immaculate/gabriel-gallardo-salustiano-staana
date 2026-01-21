import styles from "./component.module.css";

export default function CandidateItem({
  rank,
  image,
  name,
  votes,
  percentage,
  color,
}) {
  return `
    <div class="${styles["candidate-item"]}">
      <span class="${styles["rank-number"]}">${rank}</span>

      <img
        class="${styles["candidate-avatar"]}"
        src="${image}"
        alt="${name}"
      />

      <span class="${styles["candidate-name"]}">${name}</span>

      <div class="${styles["progress-container"]}">
        <div
          class="${styles["progress-bar"]} ${styles[color]}"
          style="width: ${percentage}%;"
        ></div>
      </div>

      <span class="${styles["vote-count"]}">
        ${votes.toLocaleString()}
      </span>
    </div>
  `;
}
