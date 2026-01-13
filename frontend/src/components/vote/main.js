import styles from "./component.module.css";
import { CardSSR } from "./card.js";

// Sample data - you can replace this with actual data
const candidates = [
  { name: "John Doe", bgColor: "#1a27aeff" },
  { name: "Jane Smith", bgColor: "#2a37beff" },
  { name: "Bob Johnson", bgColor: "#3a47ceff" },
  { name: "Alice Williams", bgColor: "#4a57deff" },
  { name: "Charlie Brown", bgColor: "#5a67eeff" },
  { name: "Diana Prince", bgColor: "#6a77feff" },
  { name: "Eve Davis", bgColor: "#7a87ffff" }
];

export function MainSSR() {
  const cardsHtml = candidates
    .map(candidate => CardSSR(candidate))
    .join('');

  return `
    <div class="${styles['main-content']}">
        ${cardsHtml}
    </div>

    <div class="${styles['footer']}">
        <button class="${styles['cancel-button']}">Cancel Vote</button>
        <button class="${styles['vote-button']}">Vote</button>
    </div>
  `;
}

export default function Main(root) {
  root.innerHTML = MainSSR();
  root.className = styles['main'];
}

// import styles from "./component.module.css";

// export function MainSSR() {
//   return `
//     <div class="${styles['main-content']}">
//         <div class="${styles['card']}">
//             <div class="${styles['card_shine']}"></div>
//             <div class="${styles['card_glow']}"></div>
//             <div class="${styles['card_content']}">
//                 <div style="--bg-color: #1a27aeff" class="${styles['card_image']}"></div>
//                 <div class="${styles['card_text']}">
//                     <p class="${styles['card_title']}">John Doe</p>
//                 </div>
//             </div>
//         </div>

//         <div class="${styles['card']}">
//             <div class="${styles['card_shine']}"></div>
//             <div class="${styles['card_glow']}"></div>
//             <div class="${styles['card_content']}">
//                 <div style="--bg-color: #1a27aeff" class="${styles['card_image']}"></div>
//                 <div class="${styles['card_text']}">
//                     <p class="${styles['card_title']}">John Doe</p>
//                 </div>
//             </div>
//         </div>

//         <div class="${styles['card']}">
//             <div class="${styles['card_shine']}"></div>
//             <div class="${styles['card_glow']}"></div>
//             <div class="${styles['card_content']}">
//                 <div style="--bg-color: #1a27aeff" class="${styles['card_image']}"></div>
//                 <div class="${styles['card_text']}">
//                     <p class="${styles['card_title']}">John Doe</p>
//                 </div>
//             </div>
//         </div>

//         <div class="${styles['card']}">
//             <div class="${styles['card_shine']}"></div>
//             <div class="${styles['card_glow']}"></div>
//             <div class="${styles['card_content']}">
//                 <div style="--bg-color: #1a27aeff" class="${styles['card_image']}"></div>
//                 <div class="${styles['card_text']}">
//                     <p class="${styles['card_title']}">John Doe</p>
//                 </div>
//             </div>
//         </div>

//         <div class="${styles['card']}">
//             <div class="${styles['card_shine']}"></div>
//             <div class="${styles['card_glow']}"></div>
//             <div class="${styles['card_content']}">
//                 <div style="--bg-color: #1a27aeff" class="${styles['card_image']}"></div>
//                 <div class="${styles['card_text']}">
//                     <p class="${styles['card_title']}">John Doe</p>
//                 </div>
//             </div>
//         </div>

//         <div class="${styles['card']}">
//             <div class="${styles['card_shine']}"></div>
//             <div class="${styles['card_glow']}"></div>
//             <div class="${styles['card_content']}">
//                 <div style="--bg-color: #1a27aeff" class="${styles['card_image']}"></div>
//                 <div class="${styles['card_text']}">
//                     <p class="${styles['card_title']}">John Doe</p>
//                 </div>
//             </div>
//         </div>

//         <div class="${styles['card']}">
//             <div class="${styles['card_shine']}"></div>
//             <div class="${styles['card_glow']}"></div>
//             <div class="${styles['card_content']}">
//                 <div style="--bg-color: #1a27aeff" class="${styles['card_image']}"></div>
//                 <div class="${styles['card_text']}">
//                     <p class="${styles['card_title']}">John Doe</p>
//                 </div>
//             </div>
//         </div>
//     </div>

//     <div class="${styles['footer']}">
//         <button class="${styles['cancel-button']}">Cancel Vote</button>
//         <button class="${styles['vote-button']}">Vote</button>
//     </div>
//   `;
// }

// export default function Main(root) {
//   root.innerHTML = MainSSR();
//   root.className = styles['main'];
// }