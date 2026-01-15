// import Layout from "../layouts/confirmationLayout.js";
// import Main from "../components/confirmation/main.js";
// import Header from "../components/confirmation/header.js"


// export default function Confirmation() {
//   const { header, main } = Layout(this.root);

//   Header(header);
//   Main(main);
// }

import Layout from "../layouts/default.js";
import Main from "../components/confirmation/main.js";

export default function Confirmation() {
  const {main} = Layout(this.root);

  Main(main);
}