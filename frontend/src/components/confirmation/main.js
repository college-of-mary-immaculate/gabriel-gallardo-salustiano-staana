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
              <img src="https://res.cloudinary.com/hamsters-api/image/upload/v1767584015/v8_cdshyj.avif" alt="avatar">
              <div>
                <p class="${styles["role"]}">President</p>
                <p class="${styles["name"]}">Juan Cruz</p>
              </div>
            </div>
            <button class="${styles["edit"]}">Edit</button>
          </div>

          <div class="${styles["member"]}">
            <div class="${styles["left"]}">
              <img src="https://res.cloudinary.com/hamsters-api/image/upload/v1767584015/v8_cdshyj.avif" alt="avatar">
              <div>
                <p class="${styles["role"]}">President</p>
                <p class="${styles["name"]}">Juan Cruz</p>
              </div>
            </div>
            <button class="${styles["edit"]}">Edit</button>
          </div>

          <div class="${styles["member"]}">
            <div class="${styles["left"]}">
              <img src="https://res.cloudinary.com/hamsters-api/image/upload/v1767584015/v8_cdshyj.avif" alt="avatar">
              <div>
                <p class="${styles["role"]}">President</p>
                <p class="${styles["name"]}">Juan Cruz</p>
              </div>
            </div>
            <button class="${styles["edit"]}">Edit</button>
          </div>

          <div class="${styles["member"]}">
            <div class="${styles["left"]}">
              <img src="https://res.cloudinary.com/hamsters-api/image/upload/v1767584015/v8_cdshyj.avif" alt="avatar">
              <div>
                <p class="${styles["role"]}">President</p>
                <p class="${styles["name"]}">Juan Cruz</p>
              </div>
            </div>
            <button class="${styles["edit"]}">Edit</button>
          </div>

          <div class="${styles["member"]}">
            <div class="${styles["left"]}">
              <img src="https://res.cloudinary.com/hamsters-api/image/upload/v1767584015/v8_cdshyj.avif" alt="avatar">
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
