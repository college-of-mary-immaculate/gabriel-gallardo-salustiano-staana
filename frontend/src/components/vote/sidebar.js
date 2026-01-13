// src/components/voting/sidebar.js
import styles from "./component.module.css";

export function SidebarSSR(){
  return `
    <div class="${styles['sidenav']}">
      <a class="${styles['sidebar-item']}" href="#president">President</a>
      <a class="${styles['sidebar-item']}" href="#vice-president">Vice President</a>
      <a class="${styles['sidebar-item']}" href="#senator">Senator</a>
      <a class="${styles['sidebar-item']}" href="#mayor">Mayor</a>
      <a class="${styles['sidebar-item']}" href="#vice-mayor">Vice Mayor</a>
    </div>
  `;
}

export default function Main(root) {
  root.innerHTML = SidebarSSR();
  root.className = styles['main'];
}