import Layout from "../layouts/default.js";
import Main from "../components/receipt/main.js";
import Header from "../components/header/header.js";

export default function ReceiptPage() {
  const { main, header, footer } = Layout(this.root);
  Header(header);
  Main(main);
  // Events();
}
