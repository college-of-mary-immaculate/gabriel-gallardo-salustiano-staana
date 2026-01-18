//components/vote/card.js

import styles from "../vote/component.module.css";

export default function Card({ name, image, status_badge }) {
  return `
    <div class="${styles["card"]}">
      <div class="${styles["status_badge"]}">${status_badge}</div>
      <div class="${styles["card_content"]}">
          <div class="${styles["card_image"]}" style="background-image: url('${image}')"></div>
          <div class="${styles["card_text"]}">
              <p class="${styles["card_title"]}">${name}</p>
          </div>
      </div>
    </div>
  `;
}
