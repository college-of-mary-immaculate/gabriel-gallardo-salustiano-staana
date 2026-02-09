import styles from "./component.module.css";

export default function Main(root) {
  document.body.classList.add("page-winner");

  root.innerHTML = `
    <div class="${styles["winner-content"]}">
      <div class="${styles["container"]}">
        <h1 class="${styles["title"]}">Election Winners</h1>
        <h2 class="${styles["subtitle"]}">Congratulations to the Elected Officials of the Republic</h2>
        <div id="winner-cards">
          <p style="text-align: center; padding: 20px; color: #666;">Loading winners...</p>
        </div>
      </div>
    </div>
  `;

  root.className = styles["main"];
}
