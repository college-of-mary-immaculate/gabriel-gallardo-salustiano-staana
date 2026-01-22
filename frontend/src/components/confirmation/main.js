import styles from "./component.module.css";

export default function Confirmation(root) {
  root.className = styles.main;

  root.innerHTML = `
    <body>
      <div class="${styles["page"]}">
        <div class=${styles["card"]}">

          <div class="${styles["container"]}">
            <div class="${styles["member"]}">
            <div class="${styles["left"]}">
              <img src="https://res.cloudinary.com/deogcjil5/image/upload/v1768116437/Screenshot_2026-01-11_152604-removebg-preview_becxso.png" alt="avatar">
              <div>
                <p class="${styles["role"]}">President</p>
                <p class="${styles["name"]}">Juan Cruz</p>
              </div>
            </div>
            <button class="${styles["edit"]}">Edit</button>
          </div>

          <div class="${styles["member"]}">
            <div class="${styles["left"]}">
              <img src="https://res.cloudinary.com/deogcjil5/image/upload/v1768116437/Screenshot_2026-01-11_152604-removebg-preview_becxso.png" alt="avatar">
              <div>
                <p class="${styles["role"]}">President</p>
                <p class="${styles["name"]}">Juan Cruz</p>
              </div>
            </div>
            <button class="${styles["edit"]}">Edit</button>
          </div>

          <div class="${styles["member"]}">
            <div class="${styles["left"]}">
              <img src="https://res.cloudinary.com/deogcjil5/image/upload/v1768116437/Screenshot_2026-01-11_152604-removebg-preview_becxso.png" alt="avatar">
              <div>
                <p class="${styles["role"]}">President</p>
                <p class="${styles["name"]}">Juan Cruz</p>
              </div>
            </div>
            <button class="${styles["edit"]}">Edit</button>
          </div>

          <div class="${styles["member"]}">
            <div class="${styles["left"]}">
              <img src="https://res.cloudinary.com/deogcjil5/image/upload/v1768116437/Screenshot_2026-01-11_152604-removebg-preview_becxso.png" alt="avatar">
              <div>
                <p class="${styles["role"]}">President</p>
                <p class="${styles["name"]}">Juan Cruz</p>
              </div>
            </div>
            <button class="${styles["edit"]}">Edit</button>
          </div>

          <div class="${styles["member"]}">
            <div class="${styles["left"]}">
              <img src="https://res.cloudinary.com/deogcjil5/image/upload/v1768116437/Screenshot_2026-01-11_152604-removebg-preview_becxso.png" alt="avatar">
              <div>
                <p class="${styles["role"]}">President</p>
                <p class="${styles["name"]}">Juan Cruz</p>
              </div>
            </div>
            <button class="${styles["edit"]}">Edit</button>
          </div>

          <div class="${styles["actions"]}">
            <button class="${styles["cancel"]}">Cancel</button>
            <button class="${styles["submit"]}">Submit</button>
          </div>          
        </div>
      </div>

    </body>
  `;

  root.className = styles["main"];
}
