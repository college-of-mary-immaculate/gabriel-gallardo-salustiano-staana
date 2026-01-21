import Layout from "../layouts/default.js";
import Main from "../components/pageNotFound/main.js";
import Events from "../components/pageNotFound/event.js";

export default function PageNotFound() {
  const { main } = Layout(this.root);

  Main(main);

  // Events();
}
