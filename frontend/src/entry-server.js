import { matchRoute } from './Routes.js';

export function render(url) {
  const renderer = matchRoute(url);
  return renderer();
}
