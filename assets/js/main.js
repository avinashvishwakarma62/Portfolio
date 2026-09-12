/* ============================================================
   Shared behaviour — nav state, mobile menu, scroll reveal
   ============================================================ */

(function () {

  const setupNav = () => {
    const nav = document.querySelector('.site-nav');
    const onScroll = () => {
      if (!nav) return;
      nav.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (toggle && links && !toggle.dataset.bound) {
      toggle.dataset.bound = '1';
      toggle.addEventListener('click', () => {
        links.classList.toggle('is-open');
        toggle.classList.toggle('is-active');
      });
      links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => links.classList.remove('is-open'));
      });
    }
  };

  let revealIO = null;
  const observeReveals = () => {
    const revealEls = document.querySelectorAll('.reveal:not([data-reveal-bound])');
    if (!revealEls.length) return;

    if ('IntersectionObserver' in window) {
      if (!revealIO) {
        revealIO = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealIO.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
      }
      revealEls.forEach(el => {
        el.dataset.revealBound = '1';
        revealIO.observe(el);
      });
    } else {
      revealEls.forEach(el => {
        el.dataset.revealBound = '1';
        el.classList.add('is-visible');
      });
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    setupNav();
    observeReveals();

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

  /* Re-scan for newly injected .reveal elements after content-loader.js
     replaces a section's markup with data-driven content. */
  document.addEventListener('content-loaded', observeReveals);
  document.addEventListener('projects-rendered', observeReveals);

})();
