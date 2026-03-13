import styles from "./component.module.css";

export default function Main(root) {
  root.innerHTML = `
<div class="${styles["profile-body"]}">
  <div class="${styles["profile-container"]}">

    <div class="${styles["profile-header"]}">
      <div class="${styles["profile-avatar"]}">
        <img class="${styles["profile-avatar-img"]}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767623076/user_3_yey8ap.png" alt="profile">
      </div>
      <h2 id="profile-fullname" class="${styles["username"]}">Loading...</h2>
      <span class="${styles["status-badge"]}">Active member</span>
    </div>

    <div class="${styles["profile-info-box"]}">
      <div class="${styles["info-row"]}">
        <div class="${styles["info-icon"]}">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 1c-3.3 0-6 1.6-6 3.5V14h12v-1.5C14 9.6 11.3 8 8 8Z" fill="currentColor"/>
          </svg>
        </div>
        <div class="${styles["info-content"]}">
          <span class="${styles["label"]}">Full Name</span>
          <span id="profile-name" class="${styles["value"]}">Loading...</span>
        </div>
      </div>

      <div class="${styles["info-row"]}">
        <div class="${styles["info-icon"]}">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4Zm1.5 1v.382l4.5 2.7 4.5-2.7V5h-9ZM12 7.118 8 9.5 4 7.118V12h8V7.118Z" fill="currentColor"/>
          </svg>
        </div>
        <div class="${styles["info-content"]}">
          <span class="${styles["label"]}">Email</span>
          <span id="profile-email" class="${styles["value"]} ${styles["value--link"]}">Loading...</span>
        </div>
      </div>

      <div class="${styles["info-row"]} ${styles["info-row--last"]}">
        <div class="${styles["info-icon"]}">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="4" width="14" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <path d="M4 8h2m2 0h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="${styles["info-content"]}">
          <span class="${styles["label"]}">VIN</span>
          <span id="profile-vin" class="${styles["value"]} ${styles["value--mono"]}">Loading...</span>
        </div>
      </div>
    </div>

    <button id="logout-btn" class="${styles["logout-btn"]}">
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3M10 11l3-3-3-3M13 8H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Sign out
    </button>

  </div>
</div>
  `;

  root.className = styles["main"];
}
