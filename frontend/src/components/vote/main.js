import styles from "./component.module.css";

export default function Main(root) {
  root.innerHTML = `
    <div class="${styles['main-content']}">
        <div class="${styles['card']}">
            <div class="${styles['card_shine']}"></div>
            <div class="${styles['card_glow']}"></div>
            <div class="${styles['card_content']}">
                <div style="--bg-color: #1a27aeff" class="${styles['card_image']}"></div>
                <div class="${styles['card_text']}">
                    <p class="${styles['card_title']}">John Doe</p>
                </div>
            </div>
        </div>

        <div class="${styles['card']}">
            <div class="${styles['card_shine']}"></div>
            <div class="${styles['card_glow']}"></div>
            <div class="${styles['card_content']}">
                <div style="--bg-color: #1a27aeff" class="${styles['card_image']}"></div>
                <div class="${styles['card_text']}">
                    <p class="${styles['card_title']}">John Doe</p>
                </div>
            </div>
        </div>

        <div class="${styles['card']}">
            <div class="${styles['card_shine']}"></div>
            <div class="${styles['card_glow']}"></div>
            <div class="${styles['card_content']}">
                <div style="--bg-color: #1a27aeff" class="${styles['card_image']}"></div>
                <div class="${styles['card_text']}">
                    <p class="${styles['card_title']}">John Doe</p>
                </div>
            </div>
        </div>
        
    </div>
  `;

   root.className = styles['main'];
}