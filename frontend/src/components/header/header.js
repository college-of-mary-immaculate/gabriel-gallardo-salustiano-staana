import styles from "./header.module.css";

export function HeaderSSR() {
  return `
    <header class="${styles['app-header']}" id="main-header">
      <div class="${styles['header-container']}">
        <div class="${styles['header-logo']}">
          <a href="/" class="${styles['logo-link']}">
            <h2 class="${styles['logo-text']}">VOTE PH</h2>
          </a>
        </div>

        <div class="${styles['header-actions']}">
          <button class="${styles['btn-profile']}" id="profileBtn">
            <a href="/profile" class="${styles['profile-icon']}">👤</a>
          </button>
        </div>
      </div>
    </header>
  `;
}

// export default class Header {
//   constructor(app, root = document.body) {
//     this.app = app;
//     this.root = root;
//     this.hiddenRoutes = ["/login", "/signup"];
//     this.header = null;

//     this.render();
//     this.handleVisibility();
//     this.attachEventListeners();
//   }

//   render() {
//     // Insert header at the top of the root (same as body.firstChild)
//     this.root.insertAdjacentHTML("afterbegin", HeaderSSR());
//     this.header = document.getElementById("main-header");
//   }

//   handleVisibility() {
//     const currentPath = window.location.pathname;

//     if (this.hiddenRoutes.includes(currentPath)) {
//       this.hide();
//       document.body.classList.add("no-header");
//     } else {
//       this.show();
//       document.body.classList.remove("no-header");
//     }
//   }

//   attachEventListeners() {
//     const profileBtn = document.getElementById("profileBtn");
//     if (profileBtn) {
//       profileBtn.addEventListener("click", this.handleProfile.bind(this));
//     }

//     // Handle browser navigation
//     window.addEventListener("popstate", () => {
//       this.handleVisibility();
//     });

//     // Intercept SPA navigation
//     const originalPushState = history.pushState;
//     history.pushState = (...args) => {
//       originalPushState.apply(history, args);
//       this.handleVisibility();
//     };
//   }

//   handleProfile() {
//     console.log("Profile clicked");
//     // this.app.pushRoute('/profile');
//   }

//   show() {
//     if (this.header) {
//       this.header.style.display = "block";
//     }
//   }

//   hide() {
//     if (this.header) {
//       this.header.style.display = "none";
//     }
//   }
// }
