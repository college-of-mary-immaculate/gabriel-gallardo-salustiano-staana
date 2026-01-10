import VoteLayout from "../layouts/voteLayout.js";
import Main from "../components/vote/main.js";
import Sidebar from "../components/vote/sidebar.js"


export default function Home() {
  const { sidebar, main } = VoteLayout(this.root);

  Sidebar(sidebar);
  Main(main);
}