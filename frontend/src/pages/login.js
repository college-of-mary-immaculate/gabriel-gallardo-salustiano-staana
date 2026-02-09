import Layout from "../layouts/default.js";
import Main from "../components/login/main.js";
import Events from "../components/login/event.js";

export default function LoginPage() {
  const { main } = Layout(this.root);

  Main(main);
  Events();
}
