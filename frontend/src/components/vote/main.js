import styles from "./component.module.css";
import Card from "./card.js";
import Topbar from "./topbar.js";
import {
  candidatesByPosition,
  positionInfo,
  attachSidebarEvents,
  attachVoteEvents,
  setRenderFunction,
} from "./event.js";

export default function Main(root) {
  function renderContent(position = "president") {
    const candidates =
      candidatesByPosition[position] || candidatesByPosition.president;
    const info = positionInfo[position] || positionInfo.president;

    const cardsHtml = candidates.map((candidate) => Card(candidate)).join("");

    root.innerHTML = `
    <div class="${styles.votetopbar}">
      ${Topbar({
        title: info.title,
        subtitle: info.subtitle,
      })}
    </div>

    <div class="${styles["main-wrapper"]}">
      <div class="${styles["main-content"]}">
        ${cardsHtml}
      </div>
    </div>

    <div class="${styles.footer}">
      <button class="${styles["cancel-button"]}" data-action="cancel">Cancel Vote</button>
      <button class="${styles["vote-button"]}" data-action="vote">Vote</button>
    </div>
  `;
    attachVoteEvents();
  }

  // Set the render function so sidebar can trigger re-renders
  setRenderFunction(renderContent);

  // Initial render for president
  renderContent("president");

  // Attach sidebar events (only once)
  setTimeout(() => {
    attachSidebarEvents();
  }, 0);
}
