import Layout from "../layouts/default.js";
import Header from "../components/header/header.js";
import Main from "../components/profile/main.js";
import Events from "../components/profile/event.js";

export default function ProfilePage() {
  const { header, main } = Layout(this.root);
  Header(header);
  Main(main);
  Events();
}
