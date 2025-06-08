document.addEventListener('DOMContentLoaded', async () => {
  // 1) inject all snippets
  const placeholders = Array.from(document.querySelectorAll('[data-include]'));
  for (const el of placeholders) {
    const url = el.dataset.include;
    try {
      const res  = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status);
      el.outerHTML = await res.text();
    } catch (err) {
      console.error(`Include failed for ${url}:`, err);
      el.innerHTML = '<!-- include failed -->';
    }
  }

  // 2) now that header.html has been injected, wire up the theme-switch
  const body         = document.body;
  const themeToggle  = document.getElementById('switch-theme');
  if (!themeToggle) return;  // nothing to do if you still don’t have one

  // restore saved theme
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
  }

  // wire up clicks
  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});