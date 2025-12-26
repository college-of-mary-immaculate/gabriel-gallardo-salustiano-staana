import styles from "./component.module.css";

export default function Main(root) {
  root.innerHTML = `
    <!-- Lagay mo here lahat ng elements mo sa main -->
    <div class="${styles['main-content']}">
        <h1>Page Not Found Main Component</h1>
    </div>
  `;

   root.className = styles['main'];
}