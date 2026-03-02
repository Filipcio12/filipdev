document.addEventListener("DOMContentLoaded", () => {
  // Theme switcher
  const themeToggle = document.querySelector(".theme-toggle");
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  // Side drawer for mobile
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

  // Copy button in code blocks.
  // document.querySelectorAll("pre").forEach((pre) => {
  //   const button = document.createElement("button");
  //   button.innerText = "❏";
  //   button.classList.add("copy-button");

  //   button.addEventListener("click", () => {
  //     const code = pre.querySelector("code").innerText;
  //     navigator.clipboard.writeText(code).then(() => {
  //       button.innerText = "✓";
  //       setTimeout(() => (button.innerText = "❏"), 2000);
  //     });
  //   });

  //   pre.style.position = "relative";
  //   pre.appendChild(button);
  // });
  document.querySelectorAll("pre").forEach((pre) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("code-wrapper");
  pre.parentNode.insertBefore(wrapper, pre);
  wrapper.appendChild(pre);

  const button = document.createElement("button");
  button.innerText = "❏";
  button.classList.add("copy-button");

  button.addEventListener("click", () => {
    const code = pre.querySelector("code").innerText;
    navigator.clipboard.writeText(code).then(() => {
      button.innerText = "✓";
      setTimeout(() => (button.innerText = "❏"), 2000);
    });
  });

  wrapper.appendChild(button);
});
});
