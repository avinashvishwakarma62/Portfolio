/* ============================================================
   Portfolio page — filter tabs, staggered reveal, lightbox
   Rebinds every time content-loader.js (re)renders the grid.
   ============================================================ */

(function () {

  function initProjectsPage() {
    const cards = Array.from(document.querySelectorAll('.project-card'));
    const tabs = Array.from(document.querySelectorAll('.filter-tab'));
    if (!cards.length) return;

    /* ---------- Staggered reveal on scroll ---------- */
    cards.forEach(c => { c.classList.add('reveal'); delete c.dataset.revealBound; });
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const card = entry.target;
            const visibleSiblings = cards.filter(c => !c.classList.contains('is-hidden'));
            const position = visibleSiblings.indexOf(card);
            card.style.setProperty('--stagger', `${Math.max(position, 0) % 6 * 90}ms`);
            card.classList.add('is-visible');
            card.dataset.revealBound = '1';
            io.unobserve(card);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      cards.forEach(card => io.observe(card));
    } else {
      cards.forEach(card => card.classList.add('is-visible'));
    }

    /* ---------- Filter tabs ---------- */
    const applyFilter = (category) => {
      let visibleIndex = 0;
      cards.forEach(card => {
        const matches = category === 'all' || card.dataset.category === category;
        if (matches) {
          card.classList.remove('is-hidden');
          card.classList.remove('is-visible');
          card.style.setProperty('--stagger', `${visibleIndex * 70}ms`);
          requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('is-visible')));
          visibleIndex++;
        } else {
          card.classList.add('is-hidden');
          card.classList.remove('is-visible');
        }
      });
    };

    tabs.forEach(tab => {
      if (tab.dataset.bound) return;
      tab.dataset.bound = '1';
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        applyFilter(tab.dataset.filter);
      });
    });

    /* ---------- Lightbox ---------- */
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;
    const lbGlyph = lightbox.querySelector('.lightbox-media .glyph');
    const lbMedia = lightbox.querySelector('.lightbox-media');
    const lbCategory = lightbox.querySelector('.lightbox-content .project-category');
    const lbTitle = lightbox.querySelector('.lightbox-content h3');
    const lbDesc = lightbox.querySelector('.lightbox-content p');
    const lbTags = lightbox.querySelector('.lightbox-tags');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    let lastFocused = null;

    const openLightbox = (card) => {
      lastFocused = document.activeElement;
      lbGlyph.textContent = card.dataset.glyph || '';
      const thumb = card.querySelector('.project-thumb');
      lbMedia.style.background = thumb ? thumb.style.background : '';
      const thumbImg = thumb ? thumb.querySelector('img') : null;
      let existingImg = lbMedia.querySelector('img');
      if (thumbImg) {
        if (!existingImg) {
          existingImg = document.createElement('img');
          existingImg.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;';
          lbMedia.appendChild(existingImg);
        }
        existingImg.src = thumbImg.src;
        existingImg.style.display = '';
      } else if (existingImg) {
        existingImg.style.display = 'none';
      }
      lbCategory.textContent = card.dataset.categoryLabel || '';
      lbTitle.textContent = card.dataset.title || '';
      lbDesc.textContent = card.dataset.desc || '';
      lbTags.innerHTML = '';
      (card.dataset.tags || '').split(',').filter(Boolean).forEach(tag => {
        const span = document.createElement('span');
        span.textContent = tag.trim();
        lbTags.appendChild(span);
      });
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    };

    cards.forEach(card => {
      card.addEventListener('click', () => openLightbox(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(card);
        }
      });
    });

    if (!closeBtn.dataset.bound) {
      closeBtn.dataset.bound = '1';
      closeBtn.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initProjectsPage);
  document.addEventListener('projects-rendered', initProjectsPage);

})();
