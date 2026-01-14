export default function Layout(root) {
  root.innerHTML = `
    <header id="header"></header>
    <main id="main"></main>
    <footer id="footer"></footer>
  `

  return {
    header: document.getElementById('header'),
    main: document.getElementById('main'),
    footer: document.getElementById('footer')
  }
}