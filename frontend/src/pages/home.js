import Layout from "../layouts/default.js";
import Header from "../components/header/header.js";
import Main from "../components/home/main.js";
import Footer from "../components/footer/footer.js";
import Events from "../components/home/event.js";

export default function HomePage() {
  const { header, main, footer } = Layout(this.root);
  Header(header);
  Main(main);
  Footer(footer);

  Events();
}