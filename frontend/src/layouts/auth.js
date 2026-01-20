export default function AuthTemplate(root) {
  root.innerHTML = `
    <main id="main"></main>
  `
  return {
    main: document.getElementById('main'),
  }
}
