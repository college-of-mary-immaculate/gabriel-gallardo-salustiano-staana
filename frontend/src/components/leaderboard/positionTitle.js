// components/vote/PositionTitle.js
import styles from "./component.module.css";

export default function PositionTitle({ title }) {
  return `
    <h2 class="${styles["position-title"]}">${title}</h2>
  `;
}
