import Layout from "../layouts/default.js";
import Main from "../components/landing/main.js";

export default function Landing() {
  const {main} = Layout(this.root);

  Main(main);
}