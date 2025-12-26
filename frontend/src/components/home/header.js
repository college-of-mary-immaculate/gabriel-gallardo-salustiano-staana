import styles from "./component.module.css";

export default function Header(root) {
  root.innerHTML = `
    <div class="${styles['']}">
        <p>Home Header Component</p>
    </div>
  `;
  
  root.className = styles['header'];
}
