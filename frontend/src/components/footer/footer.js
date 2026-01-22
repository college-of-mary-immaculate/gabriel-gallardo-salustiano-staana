import styles from "./footer.module.css";

export default function Footer(root) {
  root.innerHTML = `
    <footer class="${styles["app-footer"]}">
      <div class="${styles["footer-container"]}">
        <p class="${styles["footer-content-p"]}">&copy; 2026 Voting PH. All rights reserved.</p>
      </div>
    </footer>
  `;

  //  root.className = styles['footer'];
}
