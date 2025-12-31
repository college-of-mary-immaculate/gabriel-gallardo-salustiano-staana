import Layout from "../layouts/default.js";
import Main from "../components/create account/main.js";

export default function SignUp() {
  const {main} = Layout(this.root);

  Main(main);
}