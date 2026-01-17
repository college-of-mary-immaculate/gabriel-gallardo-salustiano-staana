import Circle from "./circle.js";
import { candidates } from "./event.js";
import styles from "./component.module.css";

export default function Main(root) {
  const circlesHtml = candidates
    .map((candidate, index) => Circle(candidate, index))
    .join("");

  root.innerHTML = `
        <div class="${styles["leaderboard-container"]}">
            <div class="${styles["circles-wrapper"]}">
                ${circlesHtml}
            </div>

            <section class="${styles["voting-tally"]}">
                <h2 class="${styles["voting-tally-h2"]}">For President</h2>
                <p class="${styles["total-votes"]}">7,206 total votes</p>

                <div class="${styles["candidate-list"]}">
                    <div class="${styles["candidate-column"]}">
                        <div class="${styles["candidate-item"]}">
                            <span class="${styles["rank-number"]}">1</span>
                            <img class="${styles["candidate-avatar"]}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767787554/Ellipse_5_js8ouy.png" alt="Candidate">
                            <span class="${styles["candidate-name"]}">Juan Cruz</span>
                            <div class="${styles["progress-container"]}">
                                <div class="${styles["progress-bar"]} ${styles["blue"]}" style="width: 42%;"></div>
                            </div>
                            <span class="${styles["vote-count"]}">30,021</span>
                        </div>

                        <div class="${styles["candidate-item"]}">
                            <span class="${styles["rank-number"]}">1</span>
                            <img class="${styles["candidate-avatar"]}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767787554/Ellipse_5_1_tstccu.png" alt="Candidate">
                            <span class="${styles["candidate-name"]}">Juan Cruz</span>
                            <div class="${styles["progress-container"]}">
                                <div class="${styles["progress-bar"]} ${styles["light-blue"]}" style="width: 41%;"></div>
                            </div>
                            <span class="${styles["vote-count"]}">30,006</span>
                        </div>

                        <div class="${styles["candidate-item"]}">
                            <span class="${styles["rank-number"]}">1</span>
                            <img class="${styles["candidate-avatar"]}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767787553/Ellipse_5_3_jpor6t.png" alt="Candidate">
                            <span class="${styles["candidate-name"]}">Juan Cruz</span>
                            <div class="${styles["progress-container"]}">
                                <div class="${styles["progress-bar"]} ${styles["cyan"]}" style="width: 33%;"></div>
                            </div>
                            <span class="${styles["vote-count"]}">24,091</span>
                        </div>

                        <div class="${styles["candidate-item"]}">
                            <span class="${styles["rank-number"]}">1</span>
                            <img class="${styles["candidate-avatar"]}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767787553/Ellipse_5_4_qy4p1c.png" alt="Candidate">
                            <span class="${styles["candidate-name"]}">Juan Cruz</span>
                            <div class="${styles["progress-container"]}">
                                <div class="${styles["progress-bar"]} ${styles["green"]}" style="width: 29%;"></div>
                            </div>
                            <span class="${styles["vote-count"]}">21,043</span>
                        </div>

                        <div class="${styles["candidate-item"]}">
                            <span class="${styles["rank-number"]}">1</span>
                            <img class="${styles["candidate-avatar"]}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767787553/Ellipse_5_5_yf1eit.png" alt="Candidate">
                            <span class="${styles["candidate-name"]}">Juan Cruz</span>
                            <div class="${styles["progress-container"]}">
                                <div class="${styles["progress-bar"]} ${styles["purple"]}" style="width: 26%;"></div>
                            </div>
                            <span class="${styles["vote-count"]}">18,721</span>
                        </div>
                    </div>

                    <div class="${styles["candidate-column"]}">
                        <div class="${styles["candidate-item"]}">
                            <span class="${styles["rank-number"]}">1</span>
                            <img class="${styles["candidate-avatar"]}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767787554/Ellipse_5_js8ouy.png" alt="Candidate">
                            <span class="${styles["candidate-name"]}">Juan Cruz</span>
                            <div class="${styles["progress-container"]}">
                                <div class="${styles["progress-bar"]} ${styles["blue"]}" style="width: 42%;"></div>
                            </div>
                            <span class="${styles["vote-count"]}">30,021</span>
                        </div>

                        <div class="${styles["candidate-item"]}">
                            <span class="${styles["rank-number"]}">1</span>
                            <img class="${styles["candidate-avatar"]}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767787554/Ellipse_5_1_tstccu.png" alt="Candidate">
                            <span class="${styles["candidate-name"]}">Juan Cruz</span>
                            <div class="${styles["progress-container"]}">
                                <div class="${styles["progress-bar"]} ${styles["light-blue"]}" style="width: 41%;"></div>
                            </div>
                            <span class="${styles["vote-count"]}">30,006</span>
                        </div>

                        <div class="${styles["candidate-item"]}">
                            <span class="${styles["rank-number"]}">1</span>
                            <img class="${styles["candidate-avatar"]}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767787553/Ellipse_5_3_jpor6t.png" alt="Candidate">
                            <span class="${styles["candidate-name"]}">Juan Cruz</span>
                            <div class="${styles["progress-container"]}">
                                <div class="${styles["progress-bar"]} ${styles["cyan"]}" style="width: 33%;"></div>
                            </div>
                            <span class="${styles["vote-count"]}">24,091</span>
                        </div>

                        <div class="${styles["candidate-item"]}">
                            <span class="${styles["rank-number"]}">1</span>
                            <img class="${styles["candidate-avatar"]}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767787553/Ellipse_5_4_qy4p1c.png" alt="Candidate">
                            <span class="${styles["candidate-name"]}">Juan Cruz</span>
                            <div class="${styles["progress-container"]}">
                                <div class="${styles["progress-bar"]} ${styles["green"]}" style="width: 29%;"></div>
                            </div>
                            <span class="${styles["vote-count"]}">21,043</span>
                        </div>

                        <div class="${styles["candidate-item"]}">
                            <span class="${styles["rank-number"]}">1</span>
                            <img class="${styles["candidate-avatar"]}" src="https://res.cloudinary.com/dayv9oa8q/image/upload/v1767787553/Ellipse_5_5_yf1eit.png" alt="Candidate">
                            <span class="${styles["candidate-name"]}">Juan Cruz</span>
                            <div class="${styles["progress-container"]}">
                                <div class="${styles["progress-bar"]} ${styles["purple"]}" style="width: 26%;"></div>
                            </div>
                            <span class="${styles["vote-count"]}">18,721</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
  `;

  root.className = styles["main"];
}
