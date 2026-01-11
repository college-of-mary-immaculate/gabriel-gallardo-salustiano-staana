import styles from "./component.module.css";

export function HeaderSSR() {
  return `
    <div class="${styles['header-content']}">
      <h1 class="${styles['header-title']}">VOTE PH</h1>
      <div class="${styles['profile-top']}">
          <img class="${styles['profile-top-img']}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767623076/user_3_yey8ap.png" alt="Profile">
      </div>
    </div>
  `;
}

export default function Header(root) {
  root.innerHTML = HeaderSSR();
  root.className = styles['header'];
}
