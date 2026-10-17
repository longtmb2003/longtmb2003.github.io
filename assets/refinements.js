/* Progressive enhancement: content and native links work without this file. */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const index = document.querySelector('.mobile-index');
  index.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { index.open = false; }));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && index.open) { index.open = false; index.querySelector('summary').focus(); } });
  document.addEventListener('click', event => { if (index.open && !index.contains(event.target)) index.open = false; });

  document.querySelectorAll('.proj-media').forEach((media, i) => {
    media.dataset.study = String(i + 1).padStart(2, '0');
    const svg = media.querySelector('svg');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', media.closest('article').querySelector('h3').textContent + ' architecture illustration');
  });

  const links = [...document.querySelectorAll('.nav a')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
    links.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
  }

  // SVG SMIL motion is independent of CSS animation preferences.
  function syncSvgMotion() {
    document.querySelectorAll('svg').forEach(svg => {
      if (reduced.matches) svg.pauseAnimations?.();
      else svg.unpauseAnimations?.();
    });
  }
  syncSvgMotion();
  reduced.addEventListener('change', () => {
    syncSvgMotion();
  });
  new MutationObserver(syncSvgMotion).observe(document.getElementById('pVisual'), { childList: true });
})();
