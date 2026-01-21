import AuthTemplate from "../layouts/auth.js";
// import Header from "../components/home/header.js";
import Main from "../components/signup/main.js";
// import Footer from "../components/home/footer.js";
// import Events from "../components/home/event.js";

export default function SignPage() {
  const { main } = AuthTemplate(this.root);


  Main(main);

  Events();
}