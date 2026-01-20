import styles from "./component.module.css";

export default function Main(root) {
  root.innerHTML = `
    <div class="${styles['login-form-body']}">
        <div class="${styles['logo-container']}">
            <!-- <img src="voting-logo.png" alt="voting-logo" class="logo"> -->
            <h2 class="${styles['logo-container-h2']}">VOTING SYSTEM LOGO</h2>
        </div> 
        <div class="${styles['login-form-container']}">
            <div class="${styles['label-voting']}">
                <h2 class="${styles['label-voting-h2']}">Welcome to Title</h2>
                <h3 class="${styles['label-voting-h3']}">Please login using the form below</h3>
            </div>

            <div class="${styles['user-input']}">
                <div class="${styles['id-input']}">
                    <p class="${styles['id-input-p']}">Voter ID Number</p>
                    <input type="number" class="${styles['id-field']}">
                </div>

                <div class="${styles['password-input']}">
                    <p class="${styles['password-input-p']}">Password</p>
                    <input type="text" class="${styles['password-field']}">
                </div>
            </div>

            <button class="${styles['login-btn']}">Login</button>
            <h3>Don't have an account? <a href="#">Sign up</a></h3>
        </div>
    </div>
  `;

//    root.className = styles['main'];
}