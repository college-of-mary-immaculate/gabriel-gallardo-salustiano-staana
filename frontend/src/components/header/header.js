import styles from "./header.module.css";
import checkToSlot from "../../assets/icons/check-to-slot-solid-full.svg";
import trophy from "../../assets/icons/trophy-solid-full.svg";
import user from "../../assets/icons/user-solid-full.svg";

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
            <li>
              <a href="/vote" class="${styles["nav-link"]}">
                <img class="${styles["nav-icon"]}" src="${checkToSlot}" alt="Vote" />
                <span class="${styles["nav-label"]}">Vote</span>
              </a>
            </li>
            <li>
              <a href="/winners" class="${styles["nav-link"]}">
                <img class="${styles["nav-icon"]}" src="${trophy}" alt="Winners" />
                <span class="${styles["nav-label"]}">Winners</span>
              </a>
            </li>
            <li>
              <a href="/profile" class="${styles["nav-link"]}">
                <img class="${styles["nav-icon"]}" src="${user}" alt="Profile" />
                <span class="${styles["nav-label"]}">Profile</span>
              </a>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  `;
}
