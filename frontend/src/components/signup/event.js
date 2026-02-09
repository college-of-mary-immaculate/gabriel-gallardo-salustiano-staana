import { ping } from "../../utils/home";
import { isTokenExpired } from "../../utils/authentication";
import { register } from "../../utils/account";
import eyeOpen from "../../assets/icons/eye-open.svg";
import eyeClosed from "../../assets/icons/eye-closed.svg";

export default async function Events() {
  console.log("Register Page Event");

  window.addEventListener("load", async function () {
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

    // attachRegisterFormEvents();
    // attachPasswordToggleEvents();
  });
}

// function attachRegisterFormEvents() {

// }

// async function handRegister() {
//   try {
//   } catch (error) {
//     console.error("Register Error", error);
//   }
// }

// function attachPasswordToggleEvents() {

// }
