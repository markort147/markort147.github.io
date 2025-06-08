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
}

document.addEventListener('DOMContentLoaded', async () => {
  // 1) inject all snippets
  const placeholders = Array.from(document.querySelectorAll('[data-include]'));
  for (const el of placeholders) {
    const url = el.dataset.include;
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status);
      el.outerHTML = await res.text();
    } catch (err) {
      console.error(`Include failed for ${url}:`, err);
      el.innerHTML = '<!-- include failed -->';
    }
  }

  // 2) now that header.html has been injected, wire up the theme-switch
  const body = document.body;
  const themeToggle = document.getElementById('switch-theme');
  if (!themeToggle) return;  // nothing to do if you still don’t have one

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

  // markdown conversion  
  const posts = document.querySelectorAll('.post');
  for (const el of posts) {
    const url = el.dataset.mdUrl;
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status);
      const markdown = await res.text();

      const match = markdown.match(/^---\n([\s\S]+?)\n---\n?/);
      let content = markdown;

      if (match) {
        content = markdown.slice(match[0].length);
      }

      el.innerHTML = marked.parse(content);
    } catch (err) {
      console.error(`Error loading ${url}:`, err);
      el.innerHTML = '<p><em>Failed to load article.</em></p>';
    }
  }
  updateHighlightTheme();
});