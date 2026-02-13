import styles from "./component.module.css";
import eyeOpen from "../../assets/icons/eye-open.svg";

export default function Main(root) {
  root.innerHTML = `
       <div class="${styles["signup-form-body"]}">
            <div class="${styles["logo-container"]}">
                <!-- <img src="voting-logo.png" alt="voting-logo" class="logo"> -->
                <h2 class="${styles["logo-container-h2"]}">VOTING SYSTEM LOGO</h2>
            </div>
            <div class="${styles["signup-form-container"]}">
                <div class="${styles["label-account"]}">
                    <h1 class="${styles["label-account-h1"]}">Create Account</h1>
                </div>

                <div class="${styles["user-input"]}">
                    <div class="${styles["last-name-input"]}">
                        <p class="${styles["last-name-input-p"]}">Last Name</p>
                        <input type="text" id="last-name" class="${styles["last-name-field"]}">
                    </div>

                    <div class="${styles["first-name-input"]}">
                        <p class="${styles["first-name-input-p"]}">First Name</p>
                        <input type="text" id="first-name" class="${styles["first-name-field"]}">
                    </div>

                    <div class="${styles["email-input"]}">
                        <p class="${styles["email-input-p"]}">Email</p>
                        <input type="email" id="email" class="${styles["email-field"]}">
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

                    <div class="${styles["confirm-password-input"]}">
                        <p class="${styles["password-input-p"]}">Confirm Password</p>

                        <div class="${styles["password-wrapper"]}">
                            <input
                            type="password"
                            id="confirm-password"
                            class="${styles["password-field"]}"
                            />

                            <button
                            type="button"
                            id="toggleConfirmPassword"
                            class="${styles["eye-btn"]}"
                            aria-label="Show password"
                            >
                            <img
                                id="confirmEyeIcon"
                                src="${eyeOpen}"
                                alt="Show password"
                            />
                            </button>
                        </div>
                    </div>
                </div>

                <button id="signup-btn" class="${styles["create-acc-btn"]}">Sign Up</button>
                <h3>Have already an account? <a id="login-link" href="#">Login</a></h3>
            </div>
    </div>
  `;

  root.className = styles["main"];
}
