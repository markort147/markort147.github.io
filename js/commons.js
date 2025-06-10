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
  // inject all snippets
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

  // now that header.html has been injected, wire up the theme-switch
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

  // markdown conversion  
  const mdPost = document.getElementById("md-post");
  const htmlPost = document.getElementById("html-post");
  if (mdPost && htmlPost) {
    const markdown = mdPost.innerHTML;
    if (!markdown) {
      htmlPost.innerHTML = '<p><em>Failed to load markdown content.</em></p>';
    } else {
      try {
        htmlPost.innerHTML = marked.parse(markdown);
      } catch (err) {
        console.error(`Error parsing markdown content:`, err);
        htmlPost.innerHTML = '<p><em>Failed to load article.</em></p>';
      }
      updateHighlightTheme();
    }
  }
});