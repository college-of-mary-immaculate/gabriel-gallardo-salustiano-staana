import ConfirmationLayout from "../layouts/confirmationLayout.js";
import Main from "../components/confirmation/main.js";
import Header from "../components/confirmation/header.js"


export default function Home() {
  const { header, main } = ConfirmationLayout(this.root);

  Header(header);
  Main(main);
}