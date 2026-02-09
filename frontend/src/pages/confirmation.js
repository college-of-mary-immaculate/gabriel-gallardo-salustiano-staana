import Layout from "../layouts/default.js";
import Header from "../components/header/header.js";
import Main from "../components/confirmation/main.js";
import Events from "../components/confirmation/event.js";

export default function ConfirmationPage() {
  const { header, main } = Layout(this.root);
  Header(header);
  Main(main);
  Events();
}
