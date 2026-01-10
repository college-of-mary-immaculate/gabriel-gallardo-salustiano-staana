import { LayoutTemplate } from "../layouts/default.js";
import { HeaderSSR } from "../components/pageNotFound/header.js";
import { MainSSR } from "../components/pageNotFound/main.js";
import { FooterSSR } from "../components/pageNotFound/footer.js";
import Events from "../components/pageNotFound/event.js";

const template = () => LayoutTemplate(
  HeaderSSR(), 
  MainSSR(), 
  FooterSSR()
);

export function renderSSR() {
  return template();
}

export default function PageNotFound() {
  this.root.innerHTML = template();
  Events();
}
