import styles from "./component.module.css";

export default function Main(root) {
  root.innerHTML = `
        <div class="${styles["main-content"]}">
            <div class="${styles["secondary-header"]}">
                <div class="${styles["left-side-content"]}">
                    <h2 class="${styles["secondary-header-h2"]}">Every Voice Matters in Philippine Governance</h2>
                    <h3 class="${styles["secondary-header-h3"]}">Join live polls on voting for government officials and see real-time results</h3>

                    <button class="${styles["vote-btn"]}">
                        <p class="${styles["vote-btn-p"]}">Vote Now</p>
                        <img class="${styles["vote-btn-img"]}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767785163/Arrow_left_kxvav2.png" alt="arrow">
                    </button>
                </div>

                <div class="${styles["side-pic"]}">
                    <img class="${styles["side-pic-img"]}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767785318/PineTools.com_ballot-box-isolated-vector-41558112_1_wn5dij.png" alt="Ballot Box">
                </div>
            </div>
        </div>
  `;

  root.className = styles["main"];
}
