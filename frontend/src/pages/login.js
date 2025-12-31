import Layout from "../layouts/default.js";
import Main from "../components/login/main.js";

export default function Home() {
  const {main} = Layout(this.root);

  Main(main);
}