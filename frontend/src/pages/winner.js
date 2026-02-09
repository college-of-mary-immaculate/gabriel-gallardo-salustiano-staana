import Layout from "../layouts/default.js";
import Main from "../components/winner/main.js";
import Header from "../components/header/header.js";
import Events from "../components/winner/event.js";

export default function Winner() {
  const { header, main } = Layout(this.root);
  Header(header);
  Main(main);
  Events();
}
