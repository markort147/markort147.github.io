function updateHighlightTheme() {
  const oldLink = document.getElementById('hljs-theme');
  if (oldLink) oldLink.remove();

  const isDark = document.body.classList.contains('dark');
  const newLink = document.createElement('link');
  newLink.id = 'hljs-theme';
  newLink.rel = 'stylesheet';
  newLink.href = isDark
    ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github-dark.min.css'
    : 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/styles/stackoverflow-light.min.css';

  newLink.onload = () => hljs.highlightAll();
  document.head.appendChild(newLink);
  console.log("updated highlight");
}

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  const body = document.body;
  const resolvedTheme = theme === 'auto' ? getSystemTheme() : theme;

  body.classList.toggle('dark', resolvedTheme === 'dark');
  updateHighlightTheme();

  // Update icon (optional)
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    switch (theme) {
      case 'dark':
        themeIcon.className = 'fas fa-moon';
        break;
      case 'light':
        themeIcon.className = 'fas fa-sun';
        break;
      case 'auto':
        themeIcon.className = 'fas fa-desktop';
        break;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('switch-theme');
  const themeStates = ['light', 'dark', 'auto'];
  let currentIndex = themeStates.indexOf(localStorage.getItem('theme') || 'auto');

  if (!themeToggle) return;

  function updateTheme() {
    const theme = themeStates[currentIndex];
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  }

  // On click: cycle through states
  themeToggle.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % themeStates.length;
    updateTheme();
  });

  // Watch system preference only in auto mode
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'auto') {
      applyTheme('auto');
    }
  });

  // Initial setup
  updateTheme();
});