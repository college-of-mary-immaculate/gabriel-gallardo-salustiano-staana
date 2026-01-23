import VoteLayoutTemplate from "../layouts/default.js";
import Main from "../components/vote/main.js";
import Sidebar from "../components/sidebar/sidebar.js";
import Header from "../components/header/header.js";

export default function VotePage() {
  const { header, sidebar, main } = VoteLayoutTemplate(this.root);
  Header(header);
  Sidebar(sidebar);
  Main(main);
}
