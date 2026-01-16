import { renderSSR as Home } from "./pages/home.js";
import { renderSSR as PageNotFound } from "./pages/pageNotFound.js";
import { renderSSR as Profile } from "./pages/profile.js";

export const ROUTES = {
  HOME: "/",
  PROFILE: "/profile",
};

export const routes = {
  [ROUTES.HOME]: Home,
  [ROUTES.PROFILE]: Profile,
};

export function matchRoute(url) {
  return routes[url] || PageNotFound;
}
