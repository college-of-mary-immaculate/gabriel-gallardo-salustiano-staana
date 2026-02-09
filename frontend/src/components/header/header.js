import styles from "./header.module.css";

export default function Header(root) {
  root.innerHTML = `
    <header class="${styles["app-header"]}" id="main-header">
      <div class="${styles["header-container"]}">
        <div class="${styles["header-logo"]}">
          <a href="/" class="${styles["logo-link"]}">
            <h2 class="${styles["logo-text"]}">VOTE PH</h2>
          </a>
        </div>

        <nav class="${styles["header-nav"]}">
          <ul class="${styles["nav-list"]}">
            <li><a href="/vote" class="${styles["nav-link"]}">Vote</a></li>
            <li><a href="/winners" class="${styles["nav-link"]}">Winners</a></li>
          </ul>
        </nav>

        <div class="${styles["header-actions"]}">
          <button class="${styles["btn-profile"]}" id="profileBtn">
            <a href="/profile" class="${styles["profile-icon"]}">👤</a>
          </button>
        </div>
      </div>
    </header>
  `;

  // root.className = styles['header'];
}
