// ...existing code...
export default function VoteLayout(root) {
  root.innerHTML = `
    <div style="display: flex; justify-content: center; height: 100vh; width: 100vw; margin: 0; padding: 0; overflow: hidden;">
      <div style="display: flex; flex-direction: column; max-width: 1650px; width: 100%; height: 100vh;">
        <div style="display: flex; flex: 1; overflow: hidden;">
          <aside id="sidebar" style="overflow-y: auto;"></aside>
          <main id="main" style="flex: 1; padding: 0; overflow-y: auto; overflow-x: hidden; display: flex; justify-content: center;"></main>
        </div>
        <footer id="footer" style="position: sticky; bottom: 0; width: 100%;"></footer>
      </div>
    </div>
  `;

  // Override the #app max-width for this specific layout and disable scrolling
  const app = document.getElementById('app');
  if (app) {
    app.style.maxWidth = '100%';
    app.style.padding = '0';
    app.style.width = '100%';
  }

  // Disable body scrolling
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';

  return {
    sidebar: document.getElementById('sidebar'),
    main: document.getElementById('main'),
    footer: document.getElementById('footer')
  };
}
// ...existing code...