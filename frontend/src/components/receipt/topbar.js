// components/vote/topbar.js

import styles from "../vote/component.module.css";

export function TopbarSSR({ title, subtitle }) {
  return `
    <div class="${styles.topbar}">
      <div class="${styles.topbar_content}">
        <h1 class="${styles.topbar_title}">${title}</h1>
        <p class="${styles.topbar_subtitle}">${subtitle}</p>
      </div>
    </div>
  `;
}

export default function Topbar(container, props) {
  container.innerHTML = TopbarSSR(props);
}
