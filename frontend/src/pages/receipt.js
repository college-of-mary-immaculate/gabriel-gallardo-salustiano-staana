import { LayoutTemplate } from "../layouts/default.js";
import { HeaderSSR } from "../components/header/header.js";
import { MainSSR as ReceiptMain } from "../components/receipt/main.js";

const template = () => LayoutTemplate(
  HeaderSSR(),
  ReceiptMain(),
  ""
);

export function renderSSR() {
  return template();
}

export default function ReceiptPage() {
  this.root.innerHTML = template();
}
