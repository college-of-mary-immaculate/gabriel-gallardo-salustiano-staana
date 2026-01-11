import styles from "./component.module.css";

export function MainSSR() {
  return `
    <div class="${styles['profile-body']}">
        <div class="${styles['profile-container']}">
            <div class="${styles['profile-img']}">
                <img class="${styles['profile-img-img']}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767623076/user_3_yey8ap.png" alt="profile">
            </div>
            <h2 class="${styles['username']}">luna_dc</h2>

            <div class="${styles['profile-info-box']}">
                <div class="${styles['info-row']}">
                    <span class="${styles['label']}">First Name:</span>
                    <span class="${styles['value']}">Luna</span>
                </div>
                <div class="${styles['info-row']}">
                    <span class="${styles['label']}">Last Name:</span>
                    <span class="${styles['value']}">Dela Cruz</span>
                </div>
                <div class="${styles['info-row']}">
                    <span class="${styles['label']}">Password:</span>
                    <span class="${styles['value']}">............</span>
                </div>
            </div>
            <button class="${styles['logout-btn']}">Logout</button>
        </div>
    </div>
  `;
}

export default function Main(root) {
  root.innerHTML = MainSSR();
  root.className = styles['main'];
}