export function LayoutTemplate(headerContent, mainContent, footerContent) {
  return `
    <header>${headerContent}</header>
    <main>${mainContent}</main>
    <footer>${footerContent}</footer>
  `;
}

// this just returns the structure in string
export function LayoutSSR() {
  return `
    <header id="header"></header>
    <main id="main"></main>
    <footer id="footer"></footer>
  `;
}

// this creates DOM elements
export default function Layout(root) {
  root.innerHTML = LayoutSSR();
  return {
    header: document.getElementById('header'),
    main: document.getElementById('main'),
    footer: document.getElementById('footer')
  }
}