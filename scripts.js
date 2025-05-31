// Toggle dark theme
const body = document.body;
const themeToggle = document.getElementById('switch-theme');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});