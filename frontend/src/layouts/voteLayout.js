// Returns the layout with actual content (string only)
import '../styles/voteLayout.css';

export default function VoteLayoutTemplate(root) {
  root.innerHTML = `
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
  `

  return {
    header: document.getElementById('header'),
    sidebar: document.getElementById('sidebar'),
    main: document.getElementById('main'),
    footer: document.getElementById('footer')
  }
}