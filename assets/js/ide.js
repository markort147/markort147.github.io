(function () {
    const root = document.documentElement;
    const readout = document.getElementById('hue-readout');
    const setHue = (h) => {
        const v = ((h % 360) + 360) % 360;
        root.style.setProperty('--hue', v);
        if (readout) readout.textContent = v;
        localStorage.setItem('mono-hue', v);
    };
    const saved = localStorage.getItem('mono-hue');
    if (saved) setHue(parseInt(saved, 10));
    document.getElementById('hue-inc')?.addEventListener('click', () => setHue((+getComputedStyle(root).getPropertyValue('--hue')) + 10));
    document.getElementById('hue-dec')?.addEventListener('click', () => setHue((+getComputedStyle(root).getPropertyValue('--hue')) - 10));
})();

(function () {
    document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
        document.getElementById('sidebar')?.classList.toggle('hidden');
        document.querySelector('.workspace')?.classList.toggle('sidebar-hidden');
    });
})();

(function () {
    hljs.highlightAll();
})();