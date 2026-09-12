/* ============================================================
   Skills page — render categorized skill cards, handle filter
   tabs, currently-learning section, and scroll-reveal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const gridEl = document.getElementById('skills-container');
  const filtersEl = document.getElementById('skills-filters');
  const learningEl = document.getElementById('learning-chips');
  if (!gridEl) return;

  let activeFilter = 'All';

  function esc(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  const ICONS = {
    code: '<path d="M9 8L4 12l5 4M15 8l5 4-5 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    braces: '<path d="M8 4c-2 0-3 1-3 3v3c0 1-1 2-2 2 1 0 2 1 2 2v3c0 2 1 3 3 3M16 4c2 0 3 1 3 3v3c0 1 1 2 2 2-1 0-2 1-2 2v3c0 2-1 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    terminal: '<path d="M4 6h16v12H4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 10l3 2-3 2M13 14h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    layout: '<path d="M4 5h16v14H4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M4 9.5h16M9 9.5V19" stroke="currentColor" stroke-width="1.5"/>',
    script: '<path d="M6 4h9l5 5v11H6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9.5 13.5c0 1 .8 1.5 1.7 1.5 1 0 1.8-.5 1.8-1.4 0-2.2-3.5-1.5-3.5-3.7 0-.9.8-1.4 1.8-1.4.9 0 1.7.5 1.7 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    globe: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M4 12h16M12 4c2.5 2.2 2.5 13.8 0 16M12 4c-2.5 2.2-2.5 13.8 0 16" stroke="currentColor" stroke-width="1.4"/>',
    nodes: '<circle cx="6" cy="6" r="2.2" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="6" r="2.2" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="18" r="2.2" stroke="currentColor" stroke-width="1.5"/><path d="M8 6.8l6.5 9.5M16 6.8l-6.5 9.5M8.2 6h7.6" stroke="currentColor" stroke-width="1.3"/>',
    cube: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 3v9m0 9v-9m0 0L4 7.5M12 12l8-4.5" stroke="currentColor" stroke-width="1.3"/>',
    spark: '<path d="M12 3l1.8 5.6L19 10l-5.2 1.4L12 17l-1.8-5.6L5 10l5.2-1.4L12 3z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M20 20H4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    branch: '<circle cx="6" cy="6" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="18" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="9" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M6 8v8M6 8c0 4 4 4 4 4h6M18 11v0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    editor: '<path d="M4 5h16v14H4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 10l-2 2 2 2M16 10l2 2-2 2M13 9l-2 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
    cloud: '<path d="M7 18a4 4 0 0 1-.5-7.97A5 5 0 0 1 16 8.5 3.5 3.5 0 0 1 17.5 18H7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    flask: '<path d="M10 3h4M10 3v6l-4.5 8a2 2 0 0 0 1.7 3h9.6a2 2 0 0 0 1.7-3L14 9V3" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8.5 15h7" stroke="currentColor" stroke-width="1.3"/>',
    terminal2: '<path d="M4 6h16v12H4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 9l3 3-3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    target: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="0.8" fill="currentColor"/>'
  };

  function iconSvg(name) {
    const path = ICONS[name] || ICONS.code;
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">${path}</svg>`;
  }

  function renderFilters() {
    const cats = ['All', ...SKILL_CATEGORIES.map(c => c.filter)];
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
    document.querySelectorAll('.skills-category').forEach(group => {
      const groupFilter = group.dataset.filter;
      const groupMatches = activeFilter === 'All' || activeFilter === groupFilter;
      group.classList.toggle('is-hidden', !groupMatches);
      if (groupMatches) group.style.display = '';
      else group.style.display = 'none';
    });
  }

  function renderGrid() {
    gridEl.innerHTML = SKILL_CATEGORIES.map((cat, catIndex) => {
      const skillsInCat = SKILLS.filter(s => s.category === cat.id);
      if (!skillsInCat.length) return '';

      const cards = skillsInCat.map((skill, i) => `
        <div class="skill-card reveal" style="--reveal-delay:${(i % 6) * 90}ms">
          <div class="skill-card-top">
            <span class="skill-icon">${iconSvg(skill.icon)}</span>
            <span class="skill-level level-${skill.level.toLowerCase()}">${esc(skill.level)}</span>
          </div>
          <h4>${esc(skill.name)}</h4>
          <p>${esc(skill.description)}</p>
        </div>
      `).join('');

      return `
        <div class="skills-category reveal" data-filter="${esc(cat.filter)}" style="--reveal-delay:${catIndex * 60}ms">
          <div class="skills-category-head">
            <h3>${esc(cat.label)}</h3>
            <span class="skills-category-count">${skillsInCat.length} skill${skillsInCat.length > 1 ? 's' : ''}</span>
          </div>
          <div class="skills-grid">${cards}</div>
        </div>
      `;
    }).join('');
  }

  function renderLearning() {
    if (!learningEl) return;
    learningEl.innerHTML = CURRENTLY_LEARNING.map(name =>
      `<span class="learning-chip"><span class="pulse-dot"></span>${esc(name)}</span>`
    ).join('');
  }

  function setupReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
      revealEls.forEach(el => io.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('is-visible'));
    }
  }

  renderGrid();
  renderFilters();
  renderLearning();
  setupReveal();
});
