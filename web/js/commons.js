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
  console.log("updated highligth");
}

document.addEventListener('DOMContentLoaded', async () => {

  // wire up the theme-switch
  const body = document.body;
  const themeToggle = document.getElementById('switch-theme');
  if (!themeToggle) return;

  // restore saved theme
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
  }

  // wire up clicks
  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateHighlightTheme();
  });

  updateHighlightTheme();
});