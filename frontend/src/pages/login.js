import { LayoutTemplate } from "../layouts/default.js";
// import { HeaderSSR } from "../components/login/header.js";
import { MainSSR } from "../components/login/main.js";
// import { FooterSSR } from "../components/login/footer.js";
// import Events from "../components/login/event.js";

const template = () => LayoutTemplate(
  "", 
  MainSSR(), 
  ""
);

export function renderSSR() {
  return template();
}

export default function Home() {
  this.root.innerHTML = template();
  // Events();
}
