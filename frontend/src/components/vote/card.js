//components/vote/card.js

import styles from "../vote/component.module.css";

export default function Card({ name, image }) {
  return `
    <div class="${styles['card']}">
        <div class="${styles['card_content']}">
            <div class="${styles['card_image']}" style="background-image: url('${image}')"></div>
            <div class="${styles['card_text']}">
                <p class="${styles['card_title']}">${name}</p>
            </div>
        </div>
    </div>
  `;
}