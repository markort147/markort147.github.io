(function () {
    hljs.highlightAll();
})();

(function () {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.href.includes(location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
})();

(function () {
  const root = document.documentElement;
  const btn  = document.getElementById("theme-toggle");
  const order = ["light", "dark", "auto"];

  function current() { return root.hasAttribute("data-theme") ? root.getAttribute("data-theme") : "auto"; }

  function apply(mode) {
    if (mode === "auto") {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme-mode", "auto");
    } else {
      root.setAttribute("data-theme", mode);
      localStorage.setItem("theme-mode", mode);
    }
    btn.textContent = mode === "light" ? "☀️" : mode === "dark" ? "🌙" : "🖥️";
    btn.title = "Theme: " + mode;
  }

  btn?.addEventListener("click", () => {
    const next = order[(order.indexOf(current()) + 1) % order.length];
    apply(next);
  });

  // init icon
  apply(current());
})();