import AuthTemplate from "../layouts/auth.js";
import Main from "../components/pageNotFound/main.js";
import Events from "../components/pageNotFound/event.js";

export default function PageNotFound() {
  const { main } = AuthTemplate(this.root);

  Main(main);

  // Events();
}
