import Layout  from "../layouts/default.js";
import Header from "../components/profile/header.js";
import Main from "../components/profile/main.js";
import Footer from "../components/profile/footer.js";
import Events from "../components/profile/event.js";


export default function ProfilePage() {
  const { header, main, footer } = Layout(this.root);

  Header(header);
  Main(main);
  Footer(footer);

  Events();
}