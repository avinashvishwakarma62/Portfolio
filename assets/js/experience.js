/* ============================================================
   Experience page — render timeline from data, handle filters
   and scroll-reveal animation
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const timelineEl = document.getElementById('experience-timeline');
  const filtersEl = document.getElementById('experience-filters');
  if (!timelineEl) return;

  const data = getExperienceData().filter(item => item && item.title);

  /* ---- Build category list from data ---- */
  const allCategories = Array.from(
    new Set(data.flatMap(item => item.categories && item.categories.length ? item.categories : [item.type]).filter(Boolean))
  );

  let activeFilter = 'All';

  function dotIcon() {
    return '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 4.86L20 7.7l-4 3.9.95 5.5L12 14.6l-4.95 2.5L8 11.6l-4-3.9 5.6-.84L12 2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  }

  function orgIcon() {
    return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-5.2-9.5-9.5C.5 7.5 3 3.5 7 3.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 4 0 6.5 4 4.5 8-2.5 4.3-9.5 9.5-9.5 9.5z" stroke="currentColor" stroke-width="1.5"/></svg>';
  }

  function outcomeIcon() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m5 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function esc(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function renderFilters() {
    if (!filtersEl) return;
    const cats = ['All', ...allCategories];
    filtersEl.innerHTML = cats.map(cat =>
      `<button type="button" class="filter-chip${cat === activeFilter ? ' is-active' : ''}" data-filter="${esc(cat)}">${esc(cat)}</button>`
    ).join('');

    filtersEl.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter;
        filtersEl.querySelectorAll('.filter-chip').forEach(b => b.classList.toggle('is-active', b === btn));
        applyFilter();
      });
    });
  }

  function applyFilter() {
    const items = timelineEl.querySelectorAll('.experience-item');
    items.forEach(item => {
      const cats = (item.dataset.categories || '').split('|');
      const show = activeFilter === 'All' || cats.includes(activeFilter);
      item.classList.toggle('is-hidden', !show);
    });
  }

  function renderTimeline() {
    if (!data.length) {
      timelineEl.innerHTML = '<div class="experience-empty">No experience entries yet. Add one from the Admin Panel.</div>';
      return;
    }

    timelineEl.innerHTML = data.map((item, index) => {
      const cats = item.categories && item.categories.length ? item.categories : [item.type].filter(Boolean);
      const badges = cats.map(c => `<span class="experience-badge">${esc(c)}</span>`).join('');
      const resp = (item.responsibilities || []).map(r => `<li>${esc(r)}</li>`).join('');
      const skills = (item.skills || []).map(s => `<span class="experience-skill">${esc(s)}</span>`).join('');
      const outcome = item.outcome
        ? `<div class="experience-outcome">${outcomeIcon()}<span>${esc(item.outcome)}</span></div>`
        : '';
      const image = item.image
        ? `<div class="experience-image"><img src="${item.image}" alt="${esc(item.title)}"></div>`
        : '';
      const featuredTag = item.featured ? '<span class="experience-featured-tag">Featured</span>' : '';

      return `
        <div class="experience-item reveal" style="--reveal-delay:${Math.min(index, 5) * 120}ms" data-categories="${esc(cats.join('|'))}">
          <span class="experience-dot">${dotIcon()}</span>
          <div class="experience-card${item.featured ? ' is-featured' : ''}">
            ${featuredTag}
            <div class="experience-top">
              <h3>${esc(item.title)}</h3>
              <span class="experience-year">${esc(item.period)}</span>
            </div>
            <div class="experience-meta">${orgIcon()} ${esc(item.organization)}</div>
            <div class="experience-badges">${badges}</div>
            ${item.description ? `<p class="experience-desc">${esc(item.description)}</p>` : ''}
            ${resp ? `<div class="experience-subhead">Key Responsibilities</div><ul class="experience-resp">${resp}</ul>` : ''}
            ${skills ? `<div class="experience-subhead">Skills & Technologies</div><div class="experience-skills">${skills}</div>` : ''}
            ${outcome}
            ${image}
          </div>
        </div>
      `;
    }).join('');
  }

  function setupReveal() {
    const revealEls = timelineEl.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      revealEls.forEach(el => io.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('is-visible'));
    }
  }

  renderTimeline();
  renderFilters();
  setupReveal();
});
