# Coding Guidelines

This document explains conventions for creating components, pages, utilities, styling, and the `event.js` pattern.

1) Components
- Folder structure (example):
```
src/components/<componentName>/
  header.js
  main.js
  footer.js
  event.js        # optional
  component.module.css
```
- Each rendering file exports a function that receives a `root` DOM element and updates it:
```js
// main.js
import styles from './component.module.css'
export default function Main(root) {
  root.innerHTML = `\n  <div class="${styles['main-content']}">\n    <h1>Title</h1>\n  </div>\n`;
  root.className = styles['main'];
}
```
- Use small, focused render functions (Header, Main, Footer). Keep markup and minimal vanilla JS for event wiring.

2) event.js
- Purpose: attach event listeners, set up sockets or timers, perform DOM queries that need the elements to be mounted.
- Pattern: export a default async function named `Events`. Call `Events()` from the page after mounting components.
```js
// event.js
export default async function Events() {
  window.addEventListener('load', () => { /* initial setup */ })
  // or query and attach event listeners to component elements
}
```
- Keep event handlers scoped to the component by querying inside the component's root and avoid global selectors when possible.
- Clean up: if you add global event listeners (e.g., to window), ensure there is a plan to remove them if the component may be unmounted in the future.

3) Pages & Layouts
- Pages import Layout and component pieces and call them in order:
```js
import Layout from '../layouts/default.js'
import Header from '../components/myComp/header.js'
import Main from '../components/myComp/main.js'
import Footer from '../components/myComp/footer.js'
import Events from '../components/myComp/event.js'

export default function MyPage() {
  const { header, main, footer } = Layout(this.root)
  Header(header)
  Main(main)
  Footer(footer)
  Events()
}
```
- Keep pages thin: they should orchestrate components, not implement business logic.

4) Utilities
- Keep utilities pure and side-effect free when possible.
- Example: `src/utils/counter.js` exposes a function `setupCounter(element)` that wires behavior to the given element.
- Place generic reusable helper functions in `src/utils/`.

5) Styling
- Use CSS modules per component: `component.module.css` and import as: `import styles from './component.module.css'`.
- Class naming: prefer simple names scoped to the component: `.main`, `.main-content`, `.header`, `.btn`, etc.
- Avoid global styles unless it’s common layout or utility styles (place in `src/styles/common.css`).

6) JavaScript style & imports
- Use ES modules (the project is `type: module`).
- Keep functions small and prefer named exports for utilities.
- Use async/await for asynchronous setup in `event.js` when necessary.

7) Accessibility
- Use semantic HTML elements and provide meaningful alt text for images.
- Ensure focus order and keyboard accessibility for interactive elements.

8) Examples and templates
- Copy the `src/components/home/` folder as a starting template for new components.
- For a brand-new component, create a folder with `header.js`, `main.js`, `footer.js`, `event.js` (optional), and `component.module.css` and follow the patterns above.
