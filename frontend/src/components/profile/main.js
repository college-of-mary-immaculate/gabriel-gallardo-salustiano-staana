import styles from "./component.module.css";

export default function Main(root) {
  root.innerHTML = `
<div class="${styles["profile-body"]}">
        <div class="${styles["profile-container"]}">
            <div class="${styles["profile-img"]}">
                <img class="${styles["profile-img-img"]}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767623076/user_3_yey8ap.png" alt="profile">
            </div>
            <h2 id="profile-fullname" class="${styles["username"]}">Loading...</h2>

            <div class="${styles["profile-info-box"]}">
                <div class="${styles["info-row"]}">
                    <span class="${styles["label"]}">Full Name:</span>
                    <span id="profile-name" class="${styles["value"]}">Loading...</span>
                </div>
                <div class="${styles["info-row"]}">
                    <span class="${styles["label"]}">Email:</span>
                    <span id="profile-email" class="${styles["value"]}">Loading...</span>
                </div>
                <div class="${styles["info-row"]}">
                    <span class="${styles["label"]}">VIN:</span>
                    <span id="profile-vin" class="${styles["value"]}">Loading...</span>
                </div>
            </div>
            <button id="logout-btn" class="${styles["logout-btn"]}">Logout</button>
        </div>
    </div>
  `;

  root.className = styles["main"];
}
