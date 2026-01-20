export default function PageNotFoundLayout(root) {
  root.innerHTML = `
    <header id="header"></header>
    <main id="main"></main>
  `

  return {
    header: document.getElementById('header'),
    main: document.getElementById('main'),
  }
}