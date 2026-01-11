import './styles/common.css'
import SPA from './core/spa.js'
import HomePage from "./pages/home.js";
import PageNotFoundPage from "./pages/pageNotFound.js";
import LoginPage from "./pages/login.js";
import SignUpPage from "./pages/signup.js";
import ProfilePage from "./pages/profile.js";

const app = new SPA({
  root: document.getElementById("app"),
  defaultRoute: PageNotFoundPage
});

window.app = app;

// Add routes here
app.add("/", HomePage);
app.add("/login", LoginPage);
app.add("/signup", SignUpPage);
app.add("/profile", ProfilePage);



app.handleRouteChanges();