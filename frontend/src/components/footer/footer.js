import styles from "./component.module.css";

export default function Footer(root) {
  root.innerHTML = `
    <div class="${styles['footer-content']}">
      <p class="${styles['footer-content-p']}">&copy; 2026 Voting PH. All rights reserved.</p>
    </div>
  `;

  //  root.className = styles['footer'];
}