// Small click sparks echo the landing-page interaction in the supplied spec.
document.addEventListener("click", (event) => {
  const navLink = event.target.closest(".main-nav a");
  if (navLink) {
    document.querySelector('.main-nav a[aria-current="location"]')?.removeAttribute("aria-current");
    navLink.setAttribute("aria-current", "location");
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const burst = document.createElement("span");
  burst.className = "click-burst";
  burst.style.left = `${event.clientX}px`;
  burst.style.top = `${event.clientY}px`;
  document.body.append(burst);
  window.setTimeout(() => burst.remove(), 420);
});

const themeToggle = document.querySelector(".theme-toggle");
themeToggle?.addEventListener("click", () => {
  const light = document.documentElement.dataset.theme !== "light";
  document.documentElement.dataset.theme = light ? "light" : "dark";
  themeToggle.setAttribute("aria-pressed", String(light));
  themeToggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  themeToggle.querySelector("span").textContent = light ? "◑" : "◐";
});
