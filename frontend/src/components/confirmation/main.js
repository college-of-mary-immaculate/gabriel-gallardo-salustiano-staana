import styles from "./component.module.css";

export default function Main(root) {
  root.innerHTML = `
    <div class="${styles["container"]}" id="confirmation-content">
      <p style="text-align: center; padding: 20px; color: #666;">Loading...</p>
    </div>
  `;
}
