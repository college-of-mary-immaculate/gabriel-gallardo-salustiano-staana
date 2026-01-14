// src/components/voting/sidebar.js
import styles from "./component.module.css";

export default function Sidebar(root){
  root.innerHTML = `
    <div class="${styles['sidenav']}">
      <a class="${styles['sidebar-item']}" href="#president">President</a>
      <a class="${styles['sidebar-item']}" href="#vice-president">Vice President</a>
      <a class="${styles['sidebar-item']}" href="#senator">Senator</a>
      <a class="${styles['sidebar-item']}" href="#mayor">Mayor</a>
      <a class="${styles['sidebar-item']}" href="#vice-mayor">Vice Mayor</a>
    </div>
  `;

  // root.className = styles['sidebar'];
}