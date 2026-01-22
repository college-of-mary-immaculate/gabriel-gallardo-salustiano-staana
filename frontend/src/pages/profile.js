import AuthTemplate from "../layouts/default.js";
import Main from "../components/profile/main.js";
import Events from "../components/profile/event.js";

export default function ProfilePage() {
  const { main } = AuthTemplate(this.root);
  Main(main);
  Events();
}
