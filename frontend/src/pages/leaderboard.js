import Layout from "../layouts/default.js";
import Header from "../components/header/header.js";
import Main from "../components/leaderboard/main.js";
import Footer from "../components/footer/footer.js";

export default function LeaderboardPage() {
  const { header, main, footer } = Layout(this.root);
  Header(header);
  Main(main);
  Footer(footer);
}
