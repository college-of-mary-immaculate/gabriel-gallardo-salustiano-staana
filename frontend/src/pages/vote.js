import { VoteLayoutTemplate } from "../layouts/voteLayout.js";
import { MainSSR as VoteMain } from "../components/vote/main.js";
import { Sidebar } from "../components/vote/sidebar.js";
import { HeaderSSR } from "../components/header/header.js";

const template = () => VoteLayoutTemplate(
  HeaderSSR(),
  Sidebar(),
  VoteMain(),
);

export function renderSSR() {
  return template();
}

export default function VotePage() {
  this.root.innerHTML = template();
  // Events();
}
