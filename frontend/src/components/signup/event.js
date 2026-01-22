export function initPasswordToggle(eyeIcon, eyeOffIcon) {
  const passwordInput = document.getElementById("password");
  const toggleBtn = document.getElementById("togglePassword");
  const icon = document.getElementById("eyeIcon");

  if (!passwordInput || !toggleBtn || !icon) return;

  toggleBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";

    icon.src = isHidden ? eyeOffIcon : eyeIcon;
    icon.alt = isHidden ? "Hide password" : "Show password";

    toggleBtn.setAttribute(
      "aria-label",
      isHidden ? "Hide password" : "Show password",
    );
  });
}
