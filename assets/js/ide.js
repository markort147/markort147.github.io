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
    document.getElementById('contrast-toggle')?.addEventListener('click', () => {
        const high = root.style.getPropertyValue('--bg') === 'oklch(8% 0.02 var(--hue))';
        root.style.setProperty('--bg', high ? 'oklch(12% 0.03 var(--hue))' : 'oklch(8% 0.02 var(--hue))');
        root.style.setProperty('--bg-2', high ? 'oklch(16% 0.03 var(--hue))' : 'oklch(12% 0.02 var(--hue))');
        root.style.setProperty('--bg-3', high ? 'oklch(22% 0.03 var(--hue))' : 'oklch(16% 0.02 var(--hue))');
    });
})();
