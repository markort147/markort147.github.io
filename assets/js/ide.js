// Guard highlight.js usage because CDN failures would otherwise stop the rest of the UI scripts.
(function () {
  const highlightRequested = document.getElementById("hljs-dark");
  if (!highlightRequested) return;

  if (!(window.hljs && typeof window.hljs.highlightAll === "function")) {
    console.warn("highlight.js not available, skipping code highlighting.");
    return;
  }
  window.hljs.highlightAll();
})();

(function () {
  const currentHost = location.hostname;
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    try {
      const linkHost = new URL(link.href).hostname;
      if (linkHost && linkHost !== currentHost) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    } catch (error) {
      console.warn('Skipped malformed link', link.href, error);
    }
  });
})();

(function () {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  const order = ["light", "dark", "auto"];
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const highlightSheets = {
    light: document.getElementById("hljs-light"),
    dark: document.getElementById("hljs-dark")
  };

  function current() { return root.hasAttribute("data-theme") ? root.getAttribute("data-theme") : "auto"; }

  function resolved(mode) {
    if (mode === "auto") {
      return media.matches ? "dark" : "light";
    }
    return mode;
  }

  function syncHighlightTheme(mode) {
    if (!highlightSheets.light || !highlightSheets.dark) return;
    const target = resolved(mode);
    highlightSheets.dark.disabled = target !== "dark";
    highlightSheets.light.disabled = target === "dark";
  }

  function apply(mode) {
    if (mode === "auto") {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme-mode", "auto");
    } else {
      root.setAttribute("data-theme", mode);
      localStorage.setItem("theme-mode", mode);
    }

    if (btn) {
      btn.textContent = mode === "light" ? "☀️" : mode === "dark" ? "🌙" : "🖥️";
      btn.title = "Theme: " + mode;
    }
    syncHighlightTheme(mode);
  }

  btn?.addEventListener("click", () => {
    const next = order[(order.indexOf(current()) + 1) % order.length];
    apply(next);
  });

  const mediaListener = () => {
    if (current() === "auto") {
      syncHighlightTheme("auto");
    }
  };

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", mediaListener);
  } else if (typeof media.addListener === "function") {
    media.addListener(mediaListener);
  }

  // init icon
  apply(current());
})();

(function () {
  const toggleBtn = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");
  const mobileQuery = window.matchMedia("(max-width: 768px)");

  if (!toggleBtn || !sidebar || !backdrop) return;

  function setState(open) {
    sidebar.classList.toggle("is-open", open);
    document.body.classList.toggle("sidebar-open", open);
    backdrop.classList.toggle("visible", open);
    toggleBtn.setAttribute("aria-expanded", open);
  }

  toggleBtn.addEventListener("click", () => {
    const shouldOpen = !sidebar.classList.contains("is-open");
    setState(shouldOpen);
  });

  backdrop.addEventListener("click", () => setState(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setState(false);
    }
  });

  const mqHandler = (event) => {
    if (!event.matches) {
      setState(false);
    }
  };

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", mqHandler);
  } else if (typeof mobileQuery.addListener === "function") {
    mobileQuery.addListener(mqHandler);
  }
})();

(function () {
  const content = document.querySelector(".doc.content");
  const tocTree = document.getElementById("toc-tree");
  if (!content || !tocTree) return;

  const headings = Array.from(content.querySelectorAll("h2, h3, h4"));
  if (!headings.length) {
    tocTree.textContent = "—";
    return;
  }

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const idMap = new Map();

  headings.forEach((heading) => {
    if (!heading.id) {
      let base = slugify(heading.textContent);
      if (!base) base = `section-${Math.random().toString(36).slice(2, 7)}`;
      const count = idMap.get(base) || 0;
      idMap.set(base, count + 1);
      heading.id = count ? `${base}-${count}` : base;
    }
  });

  const rootList = document.createElement("ul");
  let currentLevel = 2;
  const listStack = [rootList];

  headings.forEach((heading) => {
    let level = parseInt(heading.tagName[1], 10);
    if (Number.isNaN(level)) level = 2;
    level = Math.max(2, Math.min(4, level));

    if (level > currentLevel) {
      const targetLevel = Math.min(level, currentLevel + 1);
      const parentList = listStack[listStack.length - 1];
      const lastItem = parentList.lastElementChild;
      if (lastItem) {
        const newList = document.createElement("ul");
        lastItem.appendChild(newList);
        listStack.push(newList);
        currentLevel = targetLevel;
      }
    } else if (level < currentLevel) {
      while (level < currentLevel && listStack.length > 1) {
        listStack.pop();
        currentLevel--;
      }
    }

    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent.trim();
    li.appendChild(link);
    listStack[listStack.length - 1].appendChild(li);
  });

  tocTree.appendChild(rootList);
})();

(function () {
  const tocToggle = document.getElementById("toc-toggle");
  const tocPanel = document.getElementById("toc-panel");
  const tocBackdrop = document.getElementById("toc-backdrop");
  const mobileQuery = window.matchMedia("(max-width: 1024px)");

  if (!tocToggle || !tocPanel || !tocBackdrop) return;

  function setState(open) {
    if (!mobileQuery.matches) {
      tocPanel.classList.remove("is-open");
      tocBackdrop.classList.remove("visible");
      document.body.classList.remove("toc-open");
      tocToggle.setAttribute("aria-expanded", "false");
      return;
    }
    tocPanel.classList.toggle("is-open", open);
    tocBackdrop.classList.toggle("visible", open);
    document.body.classList.toggle("toc-open", open);
    tocToggle.setAttribute("aria-expanded", String(open));
  }

  tocToggle.addEventListener("click", () => {
    if (!mobileQuery.matches) return;
    const shouldOpen = !tocPanel.classList.contains("is-open");
    setState(shouldOpen);
  });

  tocBackdrop.addEventListener("click", () => setState(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setState(false);
  });

  const mqHandler = (event) => {
    if (!event.matches) {
      setState(false);
    }
  };

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", mqHandler);
  } else if (typeof mobileQuery.addListener === "function") {
    mobileQuery.addListener(mqHandler);
  }
})();
