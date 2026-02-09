import styles from "./component.module.css";
import eye from "../../assets/icons/hide.png";

export default function Confirmation(root) {
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
                        <input type="text" class="${styles["last-name-field"]}">
                    </div>

                    <div class="${styles["first-name-input"]}">
                        <p class="${styles["first-name-input-p"]}">First Name</p>
                        <input type="text" class="${styles["first-name-field"]}">
                    </div>

                    <div class="${styles["email-input"]}">
                        <p class="${styles["email-input-p"]}">Email</p>
                        <input type="text" class="${styles["email-field"]}">
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
                                src="${eye}"
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
                            id="togglePassword"
                            class="${styles["eye-btn"]}"
                            aria-label="Show password"
                            >
                            <img
                                id="eyeIcon"
                                src="${eye}"
                                alt="Show password"
                            />
                            </button>
                        </div>
                    </div>
                </div>

                <button class="${styles["create-acc-btn"]}">Sign Up</button>
                <h3>Have already an account? <a href="#">Login</a></h3>
            </div>      
    </div>
  `;

  root.className = styles["main"];
}
