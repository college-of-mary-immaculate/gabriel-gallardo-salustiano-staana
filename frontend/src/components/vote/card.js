//components/vote/card.js

import styles from "./component.module.css";
 
export function CardSSR({ name, image}) {
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

export default function Card(container, {name}) {
  container.innerHTML = CardSSR({ name });
}