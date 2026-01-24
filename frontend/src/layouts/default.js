export default function Layout(root) {
  root.innerHTML = `
    <header id="header"></header>
    <aside id="sidebar"></aside>
    <main id="main"></main>
    <footer id="footer"></footer>
  `;

  return {
    header: document.getElementById("header"),
    sidebar: document.getElementById("sidebar"),
    main: document.getElementById("main"),
    footer: document.getElementById("footer"),
  };
}
