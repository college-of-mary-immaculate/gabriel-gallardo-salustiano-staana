import { renderSSR as HomePage } from "./pages/home.js";
import { renderSSR as PageNotFound } from "./pages/pageNotFound.js";
import { renderSSR as LoginPage } from "./pages/login.js";
import { renderSSR as SignUpPage } from "./pages/signup.js";
import { renderSSR as ProfilePage } from "./pages/profile.js";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PROFILE: "/profile",
};

export const routes = {
  [ROUTES.HOME]: HomePage,
  [ROUTES.LOGIN]: LoginPage,
  [ROUTES.SIGNUP]: SignUpPage,
  [ROUTES.PROFILE]: ProfilePage,
};

export function matchRoute(url) {
  return routes[url] || PageNotFound;
}
