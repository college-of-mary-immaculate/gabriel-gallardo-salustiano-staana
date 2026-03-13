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
    <div class="${styles["login-form-body"]}">
      <div class="${styles["side-pic"]}">
        <img
          class="${styles["login-logo"]}"
          src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767785318/PineTools.com_ballot-box-isolated-vector-41558112_1_wn5dij.png"
          alt="Ballot Box"
        />
      </div>

      <div class="${styles["login-form-container"]}">
        <div class="${styles["label-voting"]}">
          <h2 class="${styles["label-voting-h2"]}">Welcome to VotePH</h2>
          <h3 class="${styles["label-voting-h3"]}">Please login using the form below</h3>
        </div>

        <div class="${styles["user-input"]}">
          <div class="${styles["id-input"]}">
            <p class="${styles["email-input-p"]}">Email</p>
            <input
              type="email"
              id="identifier"
              class="${styles["id-field"]}"
              placeholder="you@example.com"
              autocomplete="email"
            />
          </div>

          <div class="${styles["password-input"]}">
            <p class="${styles["password-input-p"]}">Password</p>
            <div class="${styles["password-wrapper"]}">
              <input
                type="password"
                id="password"
                class="${styles["password-field"]}"
                placeholder="Enter your password"
                autocomplete="current-password"
              />
              <button
                type="button"
                id="togglePassword"
                class="${styles["eye-btn"]}"
                aria-label="Show password"
              >
                <img id="eyeIcon" src="${eyeOpen}" alt="Show password" />
              </button>
            </div>
          </div>
        </div>

        <button id="login-btn" class="${styles["login-btn"]}">Login</button>
        <h3>Don't have an account? <a id="signup-link" href="#">Sign up</a></h3>
      </div>
    </div>
  </div>
  `;
}
