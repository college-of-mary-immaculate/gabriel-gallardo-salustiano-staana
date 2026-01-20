import styles from "./component.module.css";
import { splitIntoColumns } from "./event.js";
import CandidateItem from "./candidateItem.js";

export default function VoteTally({ title, totalVotes, candidates }) {
  const limitedCandidates = (candidates ?? []).slice(0, 10);
  const columns = splitIntoColumns(limitedCandidates, 7);

  return `
    <section class="${styles["voting-tally"]}">
      ${title ? `<h2 class="${styles["voting-tally-h2"]}">${title}</h2>` : ""}
      ${
        totalVotes
          ? `<p class="${styles["total-votes"]}">
        ${totalVotes.toLocaleString()} total votes
      </p>`
          : ""
      }

      <div class="${styles["candidate-list"]}">
        ${columns
          .map(
            (column) => `
              <div class="${styles["candidate-column"]}">
                ${column.map(CandidateItem).join("")}
              </div>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}
