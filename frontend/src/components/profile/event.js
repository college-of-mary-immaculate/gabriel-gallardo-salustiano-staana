import { ping } from "../../utils/home.js";
import { isTokenExpired } from "../../utils/authentication.js";

export default async function Events() {
  window.addEventListener("load", async function () {
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
  });
}
