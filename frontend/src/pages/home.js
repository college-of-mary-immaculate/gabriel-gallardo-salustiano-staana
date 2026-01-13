import { LayoutTemplate } from "../layouts/default.js";
import { HeaderSSR } from "../components/header/header.js";
import { MainSSR } from "../components/home/main.js";
import { FooterSSR } from "../components/home/footer.js";
import Events from "../components/home/event.js";

const template = () => LayoutTemplate(
  "",
  HeaderSSR(),
  MainSSR(), 
  ""
);

export function renderSSR() {
  return template();
}

export default function HomePage() {
  this.root.innerHTML = template();
  Events();
}
