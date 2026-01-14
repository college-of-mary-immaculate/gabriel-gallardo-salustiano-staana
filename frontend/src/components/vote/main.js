import styles from "./component.module.css";
import Card from "./card.js";
import { candidates } from "./event.js";
import Topbar from "./topbar.js";

export default function Main(root) {
  const cardsHtml = candidates
    .map(candidate => Card(candidate))
    .join('');

  root.innerHTML = `
    <div class="${styles.votetopbar}">
      ${Topbar({
        title: "Review Your Votes",
        subtitle: "Please confirm before submitting"
      })}
    </div>

    <div class="${styles['main-content']}">
      ${cardsHtml}
    </div>

    <div class="${styles.footer}">
      <button class="${styles['cancel-button']}">Cancel Vote</button>
      <button class="${styles['vote-button']}">Vote</button>
    </div>
  `;

  root.className = styles.main;
}
