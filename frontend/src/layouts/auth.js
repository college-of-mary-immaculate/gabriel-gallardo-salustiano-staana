export function AuthTemplate(mainContent) {
  return `
    <main>${mainContent}</main>
  `;
}

// this just returns the structure in string
export function AuthLayoutSSR() {
  return `
    <main id="main"></main>
  `;
}

// this creates DOM elements
export default function AuthLayout(root) {
  root.innerHTML = AuthLayoutSSR();
  return {
    main: document.getElementById('main'),
  }
}