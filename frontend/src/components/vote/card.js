//components/vote/card.js

import styles from "../vote/component.module.css";

export default function Card({ name, image, status_badge, total_votes }) {
  return `
    <div class="${styles["card"]}">
      <div class="${styles["status_badge"]}">${status_badge}</div>
      <div class="${styles["card_content"]}">
          <div class="${styles["card_image"]}" style="background-image: url('${image}')"></div>
          <div class="${styles["card_text"]}">
              <p class="${styles["card_title"]}">${name}</p>
              <p class="${styles["card_total_votes"]}">${total_votes} votes</p>
              <div class="${styles["card_progress_container"]}">
                <p class="${styles["card_progress_label"]}">Chance of Winning: 42%</p>
                <div class="${styles["card_progress_bar"]}">
                    <div class="${styles["card_progress_fill"]}"></div>
                </div>
              </div>
          </div>
      </div>
    </div>
  `;
}
