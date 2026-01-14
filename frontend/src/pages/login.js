import AuthTemplate from "../layouts/auth.js";
import Main from "../components/login/main.js";


export default function LoginPage() {
  const { main } = AuthTemplate(this.root);

  Main(main);

}