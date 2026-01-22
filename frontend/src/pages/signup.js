import Layout from "../layouts/default.js";
import Main from "../components/signup/main.js";

export default function SignPage() {
  const { main } = Layout(this.root);

  Main(main);

  Events();
}
