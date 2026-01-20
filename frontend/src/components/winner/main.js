import styles from "./component.module.css";

export default function Winner(root) {
   root.className = styles.main;

  root.innerHTML = `
  <body>
  <div class="${styles['container']}">
    <h1 class="${styles['title']}">Title</h1>
    <h2 class="${styles['subtitle']}">Subtitle</h2>

    <div class="${styles['cards']}">
      <div class="${styles['card']}">
        <img 
          src="https://res.cloudinary.com/deogcjil5/image/upload/v1768886062/Screenshot_2026-01-20_130819-removebg-preview_1_rzucf1.png" 
          alt="Juan Cruz" 
          class="${styles['avatar']}">
        <div class="${styles['card-info']}">
          <div class="${styles['name-role']}">
            <span class="${styles['name']}">Juan Cruz</span>
            <span class="${styles['role president']}">President</span>
          </div>
          <div class="${styles['votes']}">
            <span class="${styles['vote-count']}">30,021 votes</span>
            <div class="${styles['progress-bar']}">
              <div class="${styles['progress president']}" style="width: 87%;"></div>
            </div>
          </div>
        </div>
        <span class="${styles['percent']}">87%</span>
      </div>

      <div class="${styles['card']}">
        <img 
          src="https://res.cloudinary.com/deogcjil5/image/upload/v1768886062/Screenshot_2026-01-20_130819-removebg-preview_1_rzucf1.png" 
          alt="Juan Cruz" 
          class="${styles['avatar']}">
        <div class="${styles['card-info']}">
          <div class="${styles['name-role']}">
            <span class="${styles['name']}">Juan Cruz</span>
            <span class="${styles['role vice-president']}">Vice President</span>
          </div>
          <div class="${styles['votes']}">
            <span class="${styles['vote-count']}">30,021 votes</span>
            <div class="${styles['progress-bar']}">
              <div class="${styles['progress vice-president']}" style="width: 87%;"></div>
            </div>
          </div>
        </div>
        <span class="${styles['percent']}">87%</span>
      </div>

      <div class="${styles['card']}">
        <img 
          src="https://res.cloudinary.com/deogcjil5/image/upload/v1768886062/Screenshot_2026-01-20_130819-removebg-preview_1_rzucf1.png" 
          alt="Juan Cruz" 
          class="${styles['avatar']}">
        <div class="${styles['card-info']}">
          <div class="${styles['name-role']}">
            <span class="${styles['name']}">Juan Cruz</span>
            <span class="${styles['role secretary']}">Secretary</span>
          </div>
          <div class="${styles['votes']}">
            <span class="${styles['vote-count']}">30,021 votes</span>
            <div class="${styles['progress-bar']}">
              <div class="${styles['progress secretary']}" style="width: 87%;"></div>
            </div>
          </div>
        </div>
        <span class="${styles['percent']}">87%</span>
      </div>

      <div class="${styles['card']}">
        <img 
          src="https://res.cloudinary.com/deogcjil5/image/upload/v1768886062/Screenshot_2026-01-20_130819-removebg-preview_1_rzucf1.png" 
          alt="Juan Cruz" 
          class="${styles['avatar']}">
        <div class="${styles['card-info']}">
          <div class="${styles['name-role']}">
            <span class="${styles['name']}">Juan Cruz</span>
            <span class="${styles['role senator']}">Senator</span>
          </div>
          <div class="${styles['votes']}">
            <span class="${styles['vote-count']}">30,021 votes</span>
            <div class="${styles['progress-bar']}">
              <div class="${styles['progress senator']}" style="width: 87%;"></div>
            </div>
          </div>
        </div>
        <span class="${styles['percen']}t">87%</span>
      </div>
    </div>
  </div>
</body>
    
  `;

   root.className = styles['main'];
}