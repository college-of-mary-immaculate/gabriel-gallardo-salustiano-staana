import styles from "./component.module.css";

export default function Footer(root) {
  root.innerHTML = `
    <div class="footer">
        <p>Home Footer Component</p>
    </div>
  `;

   root.className = styles['footer'];
}