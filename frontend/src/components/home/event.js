import { ping } from "../../utils/home";
import { isTokenExpired } from "../../utils/authentication";

export default async function Events() {
  console.log("Home Page Event");

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

    attachVoteButtonEvent();
  });
}

function attachVoteButtonEvent() {
  const voteBtn = document.getElementById("vote-btn");

  if (!voteBtn) {
    console.error("Vote button not found");
    return;
  }

  voteBtn.addEventListener("click", (event) => {
    event.preventDefault();
    handleVoteButtonClick();
  });
}

function handleVoteButtonClick() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.app.pushRoute("/login");
    return;
  }

  const isExpired = isTokenExpired(token);
  if (isExpired) {
    localStorage.removeItem("token");
    window.app.pushRoute("/login");
    return;
  }

  window.app.pushRoute("/leaderboards");
}
