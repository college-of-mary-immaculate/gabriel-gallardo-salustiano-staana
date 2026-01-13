import styles from "./component.module.css";

export function CardSSR({ name, bgColor = "#1a27aeff" }) {
  return `
    <div class="${styles['card']}">
        <div class="${styles['card_shine']}"></div>
        <div class="${styles['card_glow']}"></div>
        <div class="${styles['card_content']}">
            <div style="background: linear-gradient(45deg, ${bgColor}, ${bgColor}dd)" class="${styles['card_image']}"></div>
            <div class="${styles['card_text']}">
                <p class="${styles['card_title']}">${name}</p>
            </div>
        </div>
    </div>
  `;
}

export default function Card(container, { name, bgColor }) {
  container.innerHTML = CardSSR({ name, bgColor });
}