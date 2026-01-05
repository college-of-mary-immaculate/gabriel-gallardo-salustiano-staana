import Layout from "../layouts/default.js";
import Main from "../components/signupForm/main.js";

export default function SignUp() {
  const {main} = Layout(this.root);

  Main(main);
}