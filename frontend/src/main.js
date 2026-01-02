// import SPA from "./core/spa.js";
// import PageNotFound from "./pages/pageNotFound.js";
// import Home from "./pages/home.js";
// import Login from "./pages/login.js";
// import SignUp from "./pages/signup.js";

// import "./styles/common.css";

// const app = new SPA ({
//   root: document.getElementById("app"),
//   defaultRoute: PageNotFound
// });

// window.app = app;

// // Add routes here
// app.add("/", Home);
// app.add("/login", Login);
// app.add("/signup", SignUp);

// app.handleRouteChanges();

// src/main.js

import SPA from "./core/spa.js";
import PageNotFound from "./pages/pageNotFound.js";
import Home from "./pages/home.js";
import Login from "./pages/login.js";
import SignUp from "./pages/signup.js";
import Header from "./components/header/header.js";

import "./styles/common.css";
import "./components/header/header.css";

const app = new SPA({
  root: document.getElementById("app"),
  defaultRoute: PageNotFound
});

window.app = app;

// Initialize Header (it will automatically hide on login/signup pages)
const header = new Header(app);
window.appHeader = header;

// Add routes here
app.add("/", Home);
app.add("/login", Login);
app.add("/signup", SignUp);

app.handleRouteChanges();