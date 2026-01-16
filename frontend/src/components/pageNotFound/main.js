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
        <img
          src="https://res.cloudinary.com/deogcjil5/image/upload/v1768551943/%D0%98%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B_%D0%BF%D0%BE%D0%B8%D1%81%D0%BA%D0%B0_%D0%BA%D0%BE%D0%BB%D0%BB%D0%B5%D0%B4%D0%B6%D0%B0_%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD_%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5_%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%8B%D0%B5_%D0%B8%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D0%B8_%D0%BC%D1%83%D0%BB%D1%8C%D1%82%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%BE%D0%B2___%D0%9F%D1%80%D0%B5%D0%BC%D0%B8%D1%83%D0%BC_%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-removebg-preview_cfzumw.png"
          alt="404 Illustration"
        />
        </div>

      </div>
    </div>
    `;

   root.className = styles['main'];
}