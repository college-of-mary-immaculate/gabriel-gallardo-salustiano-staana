import { LayoutTemplate } from "../layouts/default.js";
import { HeaderSSR } from "../components/signup/header.js";
import { MainSSR } from "../components/signup/main.js";
import { FooterSSR } from "../components/signup/footer.js";
import Events from "../components/signup/event.js";

const template = () => LayoutTemplate(
  HeaderSSR(), 
  MainSSR(), 
  FooterSSR()
);

export function renderSSR() {
  return template();
}

export default function SignupPage() {
  this.root.innerHTML = template();
  Events();
}
