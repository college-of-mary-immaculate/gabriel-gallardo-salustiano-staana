import SPA from "./core/spa.js";
import PageNotFound from "./pages/pageNotFound.js";
import Home from "./pages/home.js";
import Login from "./pages/login.js";
import SignUp from "./pages/signup.js";
import Profile from "./pages/profile.js";
import Landing from "./pages/landing.js";

import "./styles/common.css";

const app = new SPA ({
  root: document.getElementById("app"),
  defaultRoute: PageNotFound
});

window.app = app;

// Add routes here
app.add("/", Home);
app.add("/login", Login);
app.add("/signup", SignUp);
app.add("/profile", Profile);
app.add("/landing", Landing);

app.handleRouteChanges();