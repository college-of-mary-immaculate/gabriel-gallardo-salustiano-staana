// import { LayoutTemplate } from "../layouts/default.js";
import { AuthTemplate } from "../layouts/auth.js";
// import { HeaderSSR } from "../components/signup/header.js";
import { MainSSR } from "../components/signup/main.js";
// import { FooterSSR } from "../components/signup/footer.js";
import Events from "../components/signup/event.js";

const template = () => AuthTemplate(
  MainSSR()
);

export function renderSSR() {
  return template();
}

export default function SignUpPage() {
  this.root.innerHTML = template();
  Events();
}
