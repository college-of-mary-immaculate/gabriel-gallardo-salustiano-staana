import styles from "./component.module.css";

export default function PageNotFound(root) {
  root.innerHTML = `
    <div class="${styles['page-wrapper']}">
      <div class="${styles['container']}">

        <div class="${styles['content']}">
          <h1>404</h1>
          <h2>PAGE NOT FOUND</h2>
          <p>
            Oops! We can’t seem to find the page you’re looking for.
            Try going back to the previous page.
          </p>

          <button>Go Back</button>
        </div>

        <div class="${styles['image-container']}">
        </div>

      </div>
    </div>
    `;

   root.className = styles['main'];
}