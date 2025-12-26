# Architecture & Project Structure

Top-level source layout:
```
src/
  components/    # Reusable UI components (each component in its own folder)
  layouts/       # Layouts that compose header/main/footer regions
  pages/         # Page entry points that assemble layouts + components
  core/          # SPA router and bootstrapping (e.g., spa.js)
  utils/         # Small reusable utility functions
  styles/        # Global styles
```

Key patterns
- Pages (e.g., `src/pages/home.js`) import a layout and component pieces and then invoke an `Events()` function from the component when needed.
- Layouts return DOM references for `header`, `main`, and `footer` elements so pages can mount components.
- Components are folder-scoped and generally include:
  - `header.js`, `main.js`, `footer.js` — render functions that accept a DOM element `root` and apply `root.innerHTML` and `root.className`.
  - `event.js` — optional file that sets up event listeners and initial behavior (export default async function Events()).
  - `component.module.css` — CSS module for component-scoped styles.

Examples
- See `src/pages/home.js` to see a real page assembly.
- See `src/components/home/` to see the compositional pattern.

Reminder
- Keep components small and focused.
- Prefer composing small components instead of making very large monolith components.
- Keep DOM id usage limited to layout anchors only (header/main/footer). Use classNames for styling and querying within a component.