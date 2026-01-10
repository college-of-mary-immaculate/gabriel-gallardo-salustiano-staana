import { LayoutTemplate } from "../layouts/default.js";
import { HeaderSSR } from "../components/profile/header.js";
import { MainSSR } from "../components/profile/main.js";
import { FooterSSR } from "../components/profile/footer.js";
import Events from "../components/profile/event.js";

const template = () => LayoutTemplate(
  HeaderSSR(), 
  MainSSR(), 
  FooterSSR()
);

export function renderSSR() {
  return template();
}

export default function ProfilePage() {
  this.root.innerHTML = template();
  Events();
}
