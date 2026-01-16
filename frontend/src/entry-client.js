import './styles/common.css'
import SPA from './core/spa.js'
import HomePage from "./pages/home.js";
import PageNotFoundPage from "./pages/pageNotFound.js";
import ProfilePage from "./pages/profile.js";  

const app = new SPA({
  root: document.getElementById("app"),
  defaultRoute: PageNotFoundPage
});

app.add("/", HomePage);
app.add("/profile", ProfilePage);
app.handleRouteChanges();
