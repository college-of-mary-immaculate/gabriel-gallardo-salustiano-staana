import SPA from "./core/spa.js";
import PageNotFound from "./pages/pageNotFound.js";
import Home from "./pages/home.js";
import Login from "./pages/login.js";
import SignUp from "./pages/signup.js";

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

app.handleRouteChanges();