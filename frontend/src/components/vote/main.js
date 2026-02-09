import styles from "./component.module.css";

export default function Main(root) {
  root.innerHTML = `
    <div id="sidebar-overlay"></div>
    <div class="${styles["sidebar-container"]}" id="burger-menu">
      <div class="${styles["sidenav"]}" id="vote-sidebar">
        <p style="padding: 15px; color: #666;">Loading positions...</p>
      </div>
    </div>

    <div class="${styles.votetopbar}" id="vote-topbar">
      <div class="${styles.topbar}">
        <div class="${styles.topbar_content}">
          <h1 class="${styles.topbar_title}">Loading...</h1>
          <p class="${styles.topbar_subtitle}">Fetching election data</p>
        </div>
      </div>
    </div>

    <div class="${styles["main-wrapper"]}">
      <div class="${styles["main-content"]}" id="vote-cards">
        <p style="text-align: center; padding: 40px; color: #666;">
          Loading candidates...
        </p>
      </div>
    </div>

    <div class="${styles.footer}">
      <button class="${styles["cancel-button"]}" data-action="cancel">Cancel Vote</button>
      <button class="${styles["vote-button"]}" data-action="vote">Vote</button>
    </div>
  `;
}
