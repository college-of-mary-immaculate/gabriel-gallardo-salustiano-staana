import styles from "./component.module.css";

export default function Header(root) {
  root.innerHTML = `
    <div class="${styles['header-content']}">
      <p>Page Not Found Header Component</p>
    </div>
  `;
  
  root.className = styles['header'];
}