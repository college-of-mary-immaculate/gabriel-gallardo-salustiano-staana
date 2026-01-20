import styles from "./component.module.css";

export default function Winner(root) {
   root.className = styles.main;

  root.innerHTML = `
  <body>
  <div class="${styles['container']}">
    <h1 class="${styles['title']}">Election Winners</h1>
    <h2 class="${styles['subtitle']}">Congratulations to the Elected Officials of the Republic</h2>

    <div class="${styles['cards']}">
      <div class="${styles['card']}">
        <img 
          src="https://res.cloudinary.com/deogcjil5/image/upload/v1768886062/Screenshot_2026-01-20_130819-removebg-preview_1_rzucf1.png" 
          alt="Juan Cruz" 
          class="${styles['avatar']}">

        <div class="${styles['card-info']}">
          <div class="${styles['name-role']}">
            <span class="${styles['name']}">Juan Cruz</span>
            <span class="${styles['role']}">President</span>
          </div>

          <div class="${styles['votes']}">
           <img 
              src="https://res.cloudinary.com/deogcjil5/image/upload/v1768887078/Screenshot_2026-01-20_133026-removebg-preview_mdy3ma.png" 
              alt="vote icon" 
              class="${styles['vote-icon']}">
            <span class="${styles['vote-count']}">30,021 votes</span>
            <span class="${styles['percent']}">87%</span>
          </div>
          
          <div class="${styles['progress-bar']}">
          </div>
        </div>
      </div>
    </div>

    <div class="${styles['cards']}">
      <div class="${styles['card']}">
        <img 
          src="https://res.cloudinary.com/deogcjil5/image/upload/v1768886062/Screenshot_2026-01-20_130819-removebg-preview_1_rzucf1.png" 
          alt="Juan Cruz" 
          class="${styles['avatar']}">

        <div class="${styles['card-info']}">
          <div class="${styles['name-role']}">
            <span class="${styles['name']}">Juan Cruz</span>
            <span class="${styles['role']}">Vice President</span>
          </div>

          <div class="${styles['votes']}">
           <img 
              src="https://res.cloudinary.com/deogcjil5/image/upload/v1768887078/Screenshot_2026-01-20_133026-removebg-preview_mdy3ma.png" 
              alt="vote icon" 
              class="${styles['vote-icon']}">
            <span class="${styles['vote-count']}">30,021 votes</span>
            <span class="${styles['percent']}">87%</span>
          </div>
          
          <div class="${styles['progress-bar']}">
          </div>
        </div>
      </div>
    </div>

    <div class="${styles['cards']}">
      <div class="${styles['card']}">
        <img 
          src="https://res.cloudinary.com/deogcjil5/image/upload/v1768886062/Screenshot_2026-01-20_130819-removebg-preview_1_rzucf1.png" 
          alt="Juan Cruz" 
          class="${styles['avatar']}">

        <div class="${styles['card-info']}">
          <div class="${styles['name-role']}">
            <span class="${styles['name']}">Juan Cruz</span>
            <span class="${styles['role']}">Secretary</span>
          </div>

          <div class="${styles['votes']}">
           <img 
              src="https://res.cloudinary.com/deogcjil5/image/upload/v1768887078/Screenshot_2026-01-20_133026-removebg-preview_mdy3ma.png" 
              alt="vote icon" 
              class="${styles['vote-icon']}">
            <span class="${styles['vote-count']}">30,021 votes</span>
            <span class="${styles['percent']}">87%</span>
          </div>
          
          <div class="${styles['progress-bar']}">
          </div>
        </div>
      </div>
    </div>

    <div class="${styles['cards']}">
      <div class="${styles['card']}">
        <img 
          src="https://res.cloudinary.com/deogcjil5/image/upload/v1768886062/Screenshot_2026-01-20_130819-removebg-preview_1_rzucf1.png" 
          alt="Juan Cruz" 
          class="${styles['avatar']}">

        <div class="${styles['card-info']}">
          <div class="${styles['name-role']}">
            <span class="${styles['name']}">Juan Cruz</span>
            <span class="${styles['role']}">Senator</span>
          </div>

          <div class="${styles['votes']}">
           <img 
              src="https://res.cloudinary.com/deogcjil5/image/upload/v1768887078/Screenshot_2026-01-20_133026-removebg-preview_mdy3ma.png" 
              alt="vote icon" 
              class="${styles['vote-icon']}">
            <span class="${styles['vote-count']}">30,021 votes</span>
            <span class="${styles['percent']}">87%</span>
          </div>
          
          <div class="${styles['progress-bar']}">
          </div>
        </div>
      </div>
    </div>

    </div>
  </div>
</body>
    
  `;

   root.className = styles['main'];
}