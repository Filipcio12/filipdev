document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle");
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navOverlay = document.querySelector(".nav-overlay");

  const closeNav = () => {
    navLinks.classList.remove("open");
    navOverlay.classList.remove("open");
  };

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navOverlay.classList.toggle("open");
  });

  navOverlay.addEventListener("click", closeNav);
});
