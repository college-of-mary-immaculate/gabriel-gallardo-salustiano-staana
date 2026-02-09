import Layout from "../layouts/default.js";
import Header from "../components/header/header.js";
import Main from "../components/receipt/main.js";
import Events from "../components/receipt/event.js";

export default function ReceiptPage() {
  const { header, main } = Layout(this.root);
  Header(header);
  Main(main);
  Events();
}
