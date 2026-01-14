//components/vote/main.js

import styles from "./component.module.css";
import { CardSSR } from "./card.js";
import { candidates } from "./event.js";
import { TopbarSSR } from "./topbar.js";

export function MainSSR() {
  const cardsHtml = candidates
    .map(candidate => CardSSR(candidate))
    .join('');

  return ` 
    <div  class="${styles['votetopbar']}">
      ${TopbarSSR({
          title: "Review Your Votes",
          subtitle: "Please confirm before submitting"
        })}
    </div>
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