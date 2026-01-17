//components/vote/circle.js

import styles from "./component.module.css";

export default function Circle({ name, totalVote, image }, index) {
  // First and third circles are small, middle one is large
  const sizeClass = index === 1 ? styles["large"] : styles["small"];

  return `
    <div class="${styles["circle-container"]}">
      <div class="${styles["circle"]} ${sizeClass}">
        <div class="${styles["circle-image"]}" style="background-image: url('${image}')"></div>
      </div>
      <div class="${styles["circle-details"]}">
        <p class="${styles["circle-total-vote"]}">${totalVote}</p>
        <p class="${styles["circle-name"]}">${name}</p>
      </div>
    </div>
  `;
}
