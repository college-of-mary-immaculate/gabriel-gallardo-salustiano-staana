import { ping } from "../../utils/home";

export default async function Events() {
  console.log("Page Not Found Event");

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
  });
}
