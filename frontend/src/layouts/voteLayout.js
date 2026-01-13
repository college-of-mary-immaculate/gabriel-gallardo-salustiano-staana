// Returns the layout with actual content (string only)
import '../styles/voteLayout.css';

export function VoteLayoutTemplate(
  headerContent,
  sidebarContent,
  mainContent,
  footerContent
) {
  return `
    ${headerContent}
    <div class="vote-layout-root">
      <div class="vote-layout-container">
        <div class="vote-layout-body">
          <div class="vote-layout-aside">
            <aside>${sidebarContent}</aside>
          </div>

          <div class="vote-layout-main">
            <main>${mainContent}</main>
          </div>
        </div>
        <footer>${footerContent}</footer>
      </div>
    </div>
  `;
}

// Returns ONLY the structure (SSR-style)
export function VoteLayoutSSR() {
  return `
    <div class="vote-layout-root">
      <div class="vote-layout-container">
        <header id="header"></header>
        <div class="vote-layout-body">
          <div class="vote-layout-aside">
            <aside id="sidebar"></aside>
          </div>

          <div class="vote-layout-main">
            <main id="main"></main>
          </div>
        </div>
        <footer id="footer"></footer>
      </div>
    </div>
  `;
}

// Creates DOM elements and returns references
export default function VoteLayout(root) {
  root.innerHTML = VoteLayoutSSR();

  // Layout-specific overrides (kept minimal & structural)
  const app = document.getElementById('app');
  if (app) {
    app.style.maxWidth = '100%';
    app.style.padding = '0';
    app.style.width = '100%';
  }

  document.body.classList.add('vote-layout-no-scroll');

  return {
    header: document.getElementById('header'),
    sidebar: document.getElementById('sidebar'),
    main: document.getElementById('main'),
    footer: document.getElementById('footer')
  };
}



// // ...existing code...
// export default function VoteLayout(root) {
//   root.innerHTML = `
//     <div style="display: flex; justify-content: center; height: 100vh; width: 100vw; margin: 0; padding: 0; overflow: hidden;">
//       <div style="display: flex; flex-direction: column; max-width: 1650px; width: 100%; height: 100vh;">
//         <div style="display: flex; flex: 1; overflow: hidden;">
//           <aside id="sidebar" style="overflow-y: auto;"></aside>
//           <main id="main" style="flex: 1; padding: 0; overflow-y: auto; overflow-x: hidden; display: flex; justify-content: center;"></main>
//         </div>
//         <footer id="footer" style="position: sticky; bottom: 0; width: 100%;"></footer>
//       </div>
//     </div>
//   `;

//   // Override the #app max-width for this specific layout and disable scrolling
//   const app = document.getElementById('app');
//   if (app) {
//     app.style.maxWidth = '100%';
//     app.style.padding = '0';
//     app.style.width = '100%';
//   }

//   // Disable body scrolling
//   document.body.style.overflow = 'hidden';
//   document.documentElement.style.overflow = 'hidden';

//   return {
//     sidebar: document.getElementById('sidebar'),
//     main: document.getElementById('main'),
//     footer: document.getElementById('footer')
//   };
// }
// // ...existing code...

// export function VoteLayoutTemplate(headerContent, sidebarContent, mainContent, footerContent) {
//   return `
//     <div>
//       <div>
//         <div>
//           <header>${headerContent}</header>
//           <aside>${sidebarContent}</aside>
//           <main>${mainContent}</main>
//         </div>
//         <footer>${footerContent}</footer>
//       </div>
//     </div>
//   `;
// }

// // this just returns the structure in string
// export function LayoutSSR() {
//   return `
//     <header id="header"></header>
//     <aside id="sidebar"></header>
//     <main id="main"></main>
//     <footer id="footer"></footer>
//   `;
// }

// // this creates DOM elements
// export default function Layout(root) {
//   root.innerHTML = LayoutSSR();
//   return {
//     header: document.getElementById('header'),
//     main: document.getElementById('main'),
//     footer: document.getElementById('footer')
//   }
// }