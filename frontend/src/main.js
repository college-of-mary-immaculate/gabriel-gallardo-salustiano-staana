import "./styles/common.css";
import SPA from "./core/spa.js";
import HomePage from "./pages/home.js";
import PageNotFoundPage from "./pages/pageNotFound.js";
import LoginPage from "./pages/login.js";
import SignUpPage from "./pages/signup.js";
import ProfilePage from "./pages/profile.js";
import VotePage from "./pages/vote.js";
import ReceiptPage from "./pages/receipt.js";
import Confirmation from "./pages/confirmation.js";
import LeaderboardPage from "./pages/leaderboard.js";

const app = new SPA({
  root: document.getElementById("app"),
  defaultRoute: PageNotFoundPage,
});

window.app = app;

// Add routes here
app.add("/", HomePage);
app.add("/login", LoginPage);
app.add("/signup", SignUpPage);
app.add("/profile", ProfilePage);
app.add("/vote", VotePage);
app.add("/receipt", ReceiptPage);
app.add("/confirmation", Confirmation);
app.add("/leaderboard", LeaderboardPage);

app.handleRouteChanges();
