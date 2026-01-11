import styles from "./component.module.css";

export function MainSSR() {
  return `
    <div class="${styles['main-content']}">
      <h1>Page Not Found Main Component</h1>
    </div>
  `;
}

export default function Main(root) {
  root.innerHTML = MainSSR();
  root.className = styles['main'];
}