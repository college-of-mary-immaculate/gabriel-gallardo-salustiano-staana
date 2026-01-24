// src/components/voting/sidebar.js
import styles from "./sidebar.module.css";

export default function Sidebar(root) {
  root.innerHTML = `
    <div class="${styles["overlay"]}" id="sidebar-overlay"></div>
    <div class="${styles["sidebar-container"]}" id="burger-menu">
      <div class="${styles["sidenav"]}" id="sidebar">
        <a class="${styles["sidebar-item"]} active" href="#president">President</a>
        <a class="${styles["sidebar-item"]}" href="#vice-president">Vice President</a>
        <a class="${styles["sidebar-item"]}" href="#senator">Senator</a>
        <a class="${styles["sidebar-item"]}" href="#mayor">Partylist</a>
      </div>
    </div>
  `;
}
