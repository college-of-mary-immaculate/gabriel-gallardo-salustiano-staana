import styles from "./component.module.css";

export default function Main(root) {
  root.innerHTML = `
    <div class="${styles["receipt-body"]}">
      <div class="${styles["label-container"]}">
        <h2 class="${styles["label-h2"]}">Voting Receipt</h2>
      </div>
      <div class="${styles["your-vote-container"]}" id="receipt-content">
        <p style="text-align: center; padding: 20px; color: #666;">Loading receipt...</p>
      </div>
    </div>
  `;
}
