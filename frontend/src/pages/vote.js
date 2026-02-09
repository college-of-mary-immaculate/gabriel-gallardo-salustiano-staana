import Layout from "../layouts/default.js";
import Main from "../components/vote/main.js";
import Header from "../components/header/header.js";
import Events from "../components/vote/event.js";

export default function VotePage() {
  const { header, main } = Layout(this.root);
  Header(header);
  Main(main);
  Events();
}
