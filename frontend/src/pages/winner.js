import Layout from "../layouts/default.js";
import Main from "../components/winner/main.js";

export default function Winner() {
  const {main} = Layout(this.root);

  Main(main);
}