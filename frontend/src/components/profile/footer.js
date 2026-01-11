import styles from "./component.module.css";

export function FooterSSR() {
  return `
    <div class="${styles['footer-content']}">
      <p>Profile Footer Component</p>
    </div>
  `;
}

export default function Footer(root) {
  root.innerHTML = FooterSSR();
  root.className = styles['footer'];
}