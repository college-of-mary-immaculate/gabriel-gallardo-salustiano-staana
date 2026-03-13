import { ping } from "../../utils/home.js";
import { isTokenExpired } from "../../utils/authentication.js";
import { getProfile } from "../../utils/account.js";

export default async function Events() {
  console.log("Profile Page Event");

  try {
    await ping();
    document.getElementById("under-maintenance").style.display = "none";
    document.getElementById("app").style.display = "block";
  } catch {
    document.getElementById("under-maintenance").style.display = "block";
    document.getElementById("app").style.display = "none";
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    window.app.pushRoute("/login");
    return;
  }

  if (isTokenExpired(token)) {
    localStorage.removeItem("token");
    window.app.pushRoute("/login");
    return;
  }

  await loadProfile();
  attachLogoutEvent();
}

async function loadProfile() {
  try {
    const response = await getProfile();

    if (response.success) {
      const { fullname, email, vin } = response.data;

      document.getElementById("profile-fullname").textContent = fullname || "";
      document.getElementById("profile-name").textContent = fullname || "";
      document.getElementById("profile-email").textContent = email || "";
      document.getElementById("profile-vin").textContent = vin || "";
    }
  } catch (error) {
    console.error("Failed to load profile:", error);

    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        localStorage.removeItem("token");
        window.app.pushRoute("/login");
      } else {
        alert("Failed to load profile. Please try again.");
      }
    } else if (error.request) {
      alert("Cannot connect to server. Please try again.");
    } else {
      alert("An unexpected error occurred");
    }
  }
}

function attachLogoutEvent() {
  const logoutBtn = document.getElementById("logout-btn");

  if (!logoutBtn) {
    console.error("Logout button not found");
    return;
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.app.pushRoute("/login");
  });
}
