import { ping } from "../../utils/home";
import { isTokenExpired } from "../../utils/authentication";
import { login } from "../../utils/account";
import eyeOpen from "../../assets/icons/eye-open.svg";
import eyeClosed from "../../assets/icons/eye-closed.svg";

export default async function Events() {
  console.log("Login Page Event");

  try {
    await ping();
    document.getElementById("under-maintenance").style.display = "none";
    document.getElementById("app").style.display = "block";
  } catch (error) {
    document.getElementById("under-maintenance").style.display = "block";
    document.getElementById("app").style.display = "none";
    return;
  }

  if (localStorage.getItem("token")) {
    const isExpired = isTokenExpired(localStorage.getItem("token"));
    if (isExpired) {
      localStorage.removeItem("token");
    } else {
      window.app.pushRoute("/leaderboards");
      return;
    }
  }

  loginMode = "email";
  attachLoginModeToggle();
  attachLoginFormEvents();
  attachPasswordToggleEvents();
  attachSignupLinkEvent();
  attachBackHomeEvent();
}

let loginMode = "email";

function attachLoginModeToggle() {
  const emailBtn = document.getElementById("mode-email");
  const vinBtn = document.getElementById("mode-vin");
  const identifierInput = document.getElementById("identifier");
  const identifierLabel = document.getElementById("identifier-label");

  if (!emailBtn || !vinBtn || !identifierInput || !identifierLabel) return;

  function setMode(mode) {
    loginMode = mode;
    identifierInput.value = "";

    if (mode === "email") {
      identifierInput.type = "email";
      identifierInput.placeholder = "you@example.com";
      identifierInput.autocomplete = "email";
      identifierLabel.textContent = "Email";
      emailBtn.dataset.active = "true";
      vinBtn.dataset.active = "false";
    } else {
      identifierInput.type = "text";
      identifierInput.placeholder = "Enter your VIN";
      identifierInput.autocomplete = "off";
      identifierLabel.textContent = "VIN";
      emailBtn.dataset.active = "false";
      vinBtn.dataset.active = "true";
    }
  }

  emailBtn.addEventListener("click", () => setMode("email"));
  vinBtn.addEventListener("click", () => setMode("vin"));
}

function attachLoginFormEvents() {
  const loginBtn = document.getElementById("login-btn");
  const identifierInput = document.getElementById("identifier");
  const passwordInput = document.getElementById("password");

  if (!loginBtn || !identifierInput || !passwordInput) {
    console.error("Login form elements not found");
    return;
  }

  loginBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    await handleLogin(identifierInput, passwordInput, loginBtn);
  });

  const handleEnterKey = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await handleLogin(identifierInput, passwordInput, loginBtn);
    }
  };

  identifierInput.addEventListener("keypress", handleEnterKey);
  passwordInput.addEventListener("keypress", handleEnterKey);
}

async function handleLogin(identifierInput, passwordInput, loginBtn) {
  const identifier = identifierInput.value.trim();
  const password = passwordInput.value.trim();

  if (!identifier || !password) {
    alert("Please enter both email/VIN and password");
    return;
  }

  if (loginMode === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(identifier)) {
      alert("Please enter a valid email address");
      return;
    }
  } else {
    const vinRegex = /^VIN-[0-9A-F]{8}$/;
    if (!vinRegex.test(identifier)) {
      alert("Please enter a valid VIN (e.g. VIN-A1B2C3D4)");
      return;
    }
  }

  loginBtn.disabled = true;
  loginBtn.textContent = "Logging in...";

  try {
    const response = await login(identifier, password);

    if (response.success) {
      localStorage.setItem("token", response.data.token);
      window.app.pushRoute("/leaderboards");
    } else {
      alert("Login failed: No token received");
    }
  } catch (error) {
    console.error("Login error:", error);

    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "Login failed";

      if (status === 401) {
        alert("Invalid email or password");
      } else if (status === 404) {
        alert("Invalid email or password");
      } else {
        alert(`Login error: ${message}`);
      }
    } else if (error.request) {
      alert("Cannot connect to server. Please try again.");
    } else {
      alert("An unexpected error occurred");
    }
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "Login";
  }
}

function attachSignupLinkEvent() {
  const signupLink = document.getElementById("signup-link");

  if (!signupLink) return;

  signupLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.app.pushRoute("/signup");
  });
}

function attachPasswordToggleEvents() {
  const passwordInput = document.getElementById("password");
  const toggleBtn = document.getElementById("togglePassword");
  const eyeIcon = document.getElementById("eyeIcon");

  if (!passwordInput || !toggleBtn || !eyeIcon) {
    console.error("Password toggle elements not found");
    return;
  }

  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";

    eyeIcon.src = isPassword ? eyeOpen : eyeClosed;
    eyeIcon.alt = isPassword ? "Hide password" : "Show password";

    toggleBtn.setAttribute(
      "aria-label",
      isPassword ? "Hide password" : "Show password",
    );
  });
}

function attachBackHomeEvent() {
  const backHome = document.getElementById("back-home");

  if (!backHome) return;

  backHome.addEventListener("click", (e) => {
    e.preventDefault();
    window.app.pushRoute("/");
  });
}
