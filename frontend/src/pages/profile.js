import Layout from "../layouts/default.js";
import Main from "../components/profile/main.js";

export default function Profile() {
  const {main} = Layout(this.root);

  Main(main);
}