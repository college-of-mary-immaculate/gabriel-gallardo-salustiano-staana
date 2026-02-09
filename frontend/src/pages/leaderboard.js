import Layout from "../layouts/default.js";
import Header from "../components/header/header.js";
import Main from "../components/leaderboard/main.js";
import Events from "../components/leaderboard/event.js";

export default function LeaderboardPage() {
  const { header, main } = Layout(this.root);
  Header(header);
  Main(main);
  Events();
}
