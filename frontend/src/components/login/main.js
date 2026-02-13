import styles from "./component.module.css";
import eyeOpen from "../../assets/icons/eye-open.svg";

export default function Main(root) {
  root.innerHTML = `
    <div class="${styles["login-form-body"]}">
        <div class="${styles["logo-container"]}">
            <!-- <img src="voting-logo.png" alt="voting-logo" class="logo"> -->
            <h2 class="${styles["logo-container-h2"]}">VOTING SYSTEM LOGO</h2>
        </div> 
        <div class="${styles["login-form-container"]}">
            <div class="${styles["label-voting"]}">
                <h2 class="${styles["label-voting-h2"]}">Welcome to VotePH</h2>
                <h3 class="${styles["label-voting-h3"]}">Please login using the form below</h3>
            </div>

            <div class="${styles["user-input"]}">
                <div class="${styles["id-input"]}">
                    <p class="${styles["email-input-p"]}">Email</p>
                    <input type="email" id="identifier" class="${styles["id-field"]}">
                </div>

                <div class="${styles["password-input"]}">
                    <p class="${styles["password-input-p"]}">Password</p>

                    <div class="${styles["password-wrapper"]}">
                        <input
                        type="password"
                        id="password"
                        class="${styles["password-field"]}"
                        />

                        <button
                        type="button"
                        id="togglePassword"
                        class="${styles["eye-btn"]}"
                        aria-label="Show password"
                        >
                        <img
                            id="eyeIcon"
                            src="${eyeOpen}"
                            alt="Show password"
                        />
                        </button>
                    </div>
                </div>

            </div>

            <button id="login-btn" class="${styles["login-btn"]}">Login</button>
            <h3>Don't have an account? <a id="signup-link" href="#">Sign up</a></h3>
        </div>
    </div>
  `;

  //    root.className = styles['main'];
}
