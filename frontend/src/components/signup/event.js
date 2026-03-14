import { ping } from "../../utils/home";
import { isTokenExpired } from "../../utils/authentication";
import { register } from "../../utils/account";
import eyeOpen from "../../assets/icons/eye-open.svg";
import eyeClosed from "../../assets/icons/eye-closed.svg";

export default async function Events() {
  console.log("Register Page Event");

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

  attachRegisterFormEvents();
  attachPasswordToggleEvents();
  attachLoginLinkEvent();
  attachBackHomeEvent();
}

function attachRegisterFormEvents() {
  const signupBtn = document.getElementById("signup-btn");
  const lastNameInput = document.getElementById("last-name");
  const firstNameInput = document.getElementById("first-name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");

  if (
    !signupBtn ||
    !lastNameInput ||
    !firstNameInput ||
    !emailInput ||
    !passwordInput ||
    !confirmPasswordInput
  ) {
    console.error("Register form elements not found");
    return;
  }

  signupBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    await handleRegister(
      lastNameInput,
      firstNameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      signupBtn,
    );
  });

  const handleEnterKey = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await handleRegister(
        lastNameInput,
        firstNameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
        signupBtn,
      );
    }
  };

  lastNameInput.addEventListener("keypress", handleEnterKey);
  firstNameInput.addEventListener("keypress", handleEnterKey);
  emailInput.addEventListener("keypress", handleEnterKey);
  passwordInput.addEventListener("keypress", handleEnterKey);
  confirmPasswordInput.addEventListener("keypress", handleEnterKey);
}

async function handleRegister(
  lastNameInput,
  firstNameInput,
  emailInput,
  passwordInput,
  confirmPasswordInput,
  signupBtn,
) {
  const lastName = lastNameInput.value.trim();
  const firstName = firstNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if (!lastName || !firstName || !email || !password || !confirmPassword) {
    alert("Please fill in all fields");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const fullname = `${firstName} ${lastName}`;

  signupBtn.disabled = true;
  signupBtn.textContent = "Signing up...";

  try {
    const response = await register(email, fullname, password, confirmPassword);

    if (response.success) {
      alert("Account created successfully! Please login.");
      window.app.pushRoute("/login");
    } else {
      alert("Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Register error:", error);

    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "Registration failed";

      if (status === 409) {
        alert("An account with this email already exists");
      } else if (status === 400) {
        alert(`Registration error: ${message}`);
      } else {
        alert(`Registration error: ${message}`);
      }
    } else if (error.request) {
      alert("Cannot connect to server. Please try again.");
    } else {
      alert("An unexpected error occurred");
    }
  } finally {
    signupBtn.disabled = false;
    signupBtn.textContent = "Sign Up";
  }
}

function attachPasswordToggleEvents() {
  const passwordInput = document.getElementById("password");
  const toggleBtn = document.getElementById("togglePassword");
  const eyeIcon = document.getElementById("eyeIcon");

  if (passwordInput && toggleBtn && eyeIcon) {
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

  const confirmPasswordInput = document.getElementById("confirm-password");
  const toggleConfirmBtn = document.getElementById("toggleConfirmPassword");
  const confirmEyeIcon = document.getElementById("confirmEyeIcon");

  if (confirmPasswordInput && toggleConfirmBtn && confirmEyeIcon) {
    toggleConfirmBtn.addEventListener("click", () => {
      const isPassword = confirmPasswordInput.type === "password";
      confirmPasswordInput.type = isPassword ? "text" : "password";
      confirmEyeIcon.src = isPassword ? eyeOpen : eyeClosed;
      confirmEyeIcon.alt = isPassword ? "Hide password" : "Show password";
      toggleConfirmBtn.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password",
      );
    });
  }
}

function attachLoginLinkEvent() {
  const loginLink = document.getElementById("login-link");

  if (!loginLink) return;

  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.app.pushRoute("/login");
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
