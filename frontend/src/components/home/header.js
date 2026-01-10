import styles from "./component.module.css";

export function HeaderSSR() {
  return `
    <div class="${styles['header-content']}">
      <p>Home Header Component</p>
    </div>
  `;
}

export default function Header(root) {
  root.innerHTML = HeaderSSR();
  root.className = styles['header'];
}
