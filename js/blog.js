document.addEventListener('DOMContentLoaded', async () => {
    const postLinks = document.querySelectorAll('.post-link');

    for (const el of postLinks) {
        const mdPath = el.dataset.mdSrc;
        const refPath = el.dataset.mdRef;
        try {
            const res = await fetch(mdPath);
            if (!res.ok) throw new Error(`Failed to fetch ${mdPath}`);
            const text = await res.text();

            const match = text.match(/^---\n([\s\S]+?)\n---/);
            if (!match) continue;
            const meta = jsyaml.load(match[1]);

            const postDiv = document.createElement('div');
            postDiv.className = 'post-entry';

            const a = document.createElement('a');
            a.href = refPath;
            a.textContent = meta.title || mdPath;

            const date = document.createElement('span');
            date.className = 'post-date';
            if (meta.date) {
                const d = new Date(meta.date);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                date.textContent = ' - ' + d.toLocaleDateString('en-GB', options);
            }

            postDiv.appendChild(a);
            postDiv.appendChild(date);

            el.replaceWith(postDiv);
        } catch (err) {
            console.error(`Error loading ${mdPath}:`, err);
            el.innerHTML = `<p><em>Error loading post</em></p>`;
        }
    }
});