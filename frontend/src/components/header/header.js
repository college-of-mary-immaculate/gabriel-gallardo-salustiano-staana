// src/components/header/header.js

class Header {
  constructor(app) {
    this.app = app;
    this.header = null;
    this.hiddenRoutes = ['/login', '/signup'];
    this.init();
  }

  init() {
    this.createHeader();
    this.handleVisibility();
    this.attachEventListeners();
  }

  createHeader() {
    // Create header element
    this.header = document.createElement('header');
    this.header.className = 'app-header';
    this.header.id = 'main-header';

    // Header content
    this.header.innerHTML = `
      <div class="header-container">
        <div class="header-logo">
          <a href="/">
            <span class="logo-text">VOTE PH</span>
          </a>
        </div>

        <div class="header-actions">
          <button class="btn-profile" id="profileBtn">
            <span class="profile-icon">👤</span>
          </button>
      </div>
    `;

    // Insert header at the beginning of body
    document.body.insertBefore(this.header, document.body.firstChild);
  }

  handleVisibility() {
    const currentPath = window.location.pathname;
    
    // Hide header on login/signup pages
    if (this.hiddenRoutes.includes(currentPath)) {
      this.hide();
      document.body.classList.add('no-header');
    } else {
      this.show();
      document.body.classList.remove('no-header');
    }

    // Update active nav link
    this.updateActiveLink(currentPath);
  }

  updateActiveLink(path) {
    const links = this.header.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === path) {
        link.classList.add('active');
      }
    });
  }

  attachEventListeners() {
    // // Handle logout
    // const logoutBtn = this.header.querySelector('#logoutBtn');
    // if (logoutBtn) {
    //   logoutBtn.addEventListener('click', this.handleLogout.bind(this));
    // }

    // Handle profile
    const profileBtn = this.header.querySelector('#profileBtn');
    if (profileBtn) {
      profileBtn.addEventListener('click', this.handleProfile.bind(this));
    }

    // Listen to popstate for route changes (back/forward buttons)
    window.addEventListener('popstate', () => {
      this.handleVisibility();
    });

    // Listen to SPA navigation (intercept pushState)
    const originalPushState = history.pushState;
    history.pushState = (...args) => {
      originalPushState.apply(history, args);
      this.handleVisibility();
    };
  }

  handleLogout() {
    console.log('Logout clicked');
    // Clear any stored auth data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Navigate to login using SPA
    this.app.pushRoute('/login');
  }

  handleProfile() {
    console.log('Profile clicked');
    // Navigate to profile page
    // this.app.pushRoute('/profile');
  }

  show() {
    if (this.header) {
      this.header.style.display = 'block';
    }
  }

  hide() {
    if (this.header) {
      this.header.style.display = 'none';
    }
  }
}

export default Header;