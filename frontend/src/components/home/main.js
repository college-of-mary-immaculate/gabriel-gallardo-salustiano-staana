import styles from "./component.module.css";
import { ROUTES } from "../../Routes";

export function MainSSR() {
  return `
    <div class="${styles['main-content']}">
      <h1>Home Main Component</h1>
      <a href="${ROUTES.PROFILE}" id="profile-button" class="${styles['profile-button']}">
        Go to Profile
      </a>
    </div>
  `;
}

export default function Main(root) {
  root.innerHTML = MainSSR();
  root.className = styles['main'];
}
