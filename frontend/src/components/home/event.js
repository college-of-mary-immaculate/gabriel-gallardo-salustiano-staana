import { isTokenExpired } from "../../utils/authentication";

export default async function Events() {
  console.log("Home Page Event");
  window.addEventListener("load", async function () {
    fetch(`http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/v1/`)
      .then((response) => {
        if (!response.ok) {
          document.getElementById("under-maintenance").style.display = "block";
          document.getElementById("app").style.display = "none";
        } else {
          document.getElementById("under-maintenance").style.display = "none";
          document.getElementById("app").style.display = "block";
        }
      })
      .catch((error) => {
        document.getElementById("under-maintenance").style.display = "block";
        document.getElementById("app").style.display = "none";
      });
  });

  const voteNowButton = document.getElementById("vote-btn");
  if (!voteNowButton) return;

  // authentication
  if (localStorage.getItem("token")) {
    const isExpired = isTokenExpired(localStorage.getItem("token"));
    if (isExpired) {
      // window.alert("Unauthenticated. Login again.");
      localStorage.removeItem("token");
      window.app.pushRoute("/");
    } else {
      window.app.pushRoute("/leaderboards");
    }
  } else {
    voteNowButton.addEventListener("click", (event) => {
      event.preventDefault();

      const token = localStorage.getItem("token");

      if (token && !isTokenExpired(token)) {
        window.app.pushRoute("/leaderboards");
      } else {
        localStorage.removeItem("token");
        window.app.pushRoute("/login");
      }
    });
  }

  const socket = io();
}
