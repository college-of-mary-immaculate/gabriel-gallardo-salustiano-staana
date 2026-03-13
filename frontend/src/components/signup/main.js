import styles from "./component.module.css";
import eyeOpen from "../../assets/icons/eye-open.svg";

export default function Main(root) {
  root.innerHTML = `
    <div> 
        <a id="back-home" href="#" class="${styles["back-home"]}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back to home
        </a>
       <div class="${styles["signup-form-body"]}">
            <div class="${styles["side-pic"]}">
                 <img class="${styles["sign-up-logo"]}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767785318/PineTools.com_ballot-box-isolated-vector-41558112_1_wn5dij.png" alt="Ballot Box">
            </div>
            <div class="${styles["signup-form-container"]}">
                <div class="${styles["label-account"]}">
                    <h1 class="${styles["label-account-h1"]}">Create Account</h1>
                </div>

                <div class="${styles["user-input"]}">
                    <div class="${styles["first-name-input"]}">
                        <p class="${styles["first-name-input-p"]}">First Name</p>
                        <input type="text" id="first-name" class="${styles["first-name-field"]}">
                    </div>

                    <div class="${styles["last-name-input"]}">
                        <p class="${styles["last-name-input-p"]}">Last Name</p>
                        <input type="text" id="last-name" class="${styles["last-name-field"]}">
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
    </div>
  `;

  root.className = styles["main"];
}
