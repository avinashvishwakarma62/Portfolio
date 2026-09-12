/* ============================================================
   CONTENT LOADER
   Runs on every public page. Reads the shared site data
   (site-data.js) and applies it to the page: theme, text,
   images, and dynamically-generated lists (services,
   achievements, projects, home stats/featured work).

   IMPORTANT LOAD ORDER: this script must be included AFTER
   site-data.js and BEFORE main.js / page-specific scripts, so
   that dynamic content already exists in the DOM by the time
   those scripts wire up counters, filters, and reveal effects.
   ============================================================ */

(function () {
  const ICONS = {
    web: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M3 9h18" stroke="currentColor" stroke-width="1.7"/></svg>',
    python: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 4a4 4 0 0 0-4 4v1a3 3 0 0 1-3 3 3 3 0 0 1 3 3v1a4 4 0 0 0 4 4M15 4a4 4 0 0 1 4 4v1a3 3 0 0 0 3 3 3 3 0 0 0-3 3v1a4 4 0 0 1-4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    java: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M8 4h8l-1 4h2l-6 12 1.5-7H9L8 4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    dsa: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="6" r="2.3" stroke="currentColor" stroke-width="1.6"/><circle cx="19" cy="6" r="2.3" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="18" r="2.3" stroke="currentColor" stroke-width="1.6"/><path d="M7 7l3 8M17 7l-3 8" stroke="currentColor" stroke-width="1.6"/></svg>',
    ai: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.7"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    general: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  const GRADIENTS = [
    'linear-gradient(135deg, #22222b, #17171d)',
    'linear-gradient(135deg, #241d18, #17171d)',
    'linear-gradient(135deg, #182024, #17171d)',
    'linear-gradient(135deg, #221820, #17171d)',
    'linear-gradient(135deg, #1c2018, #17171d)',
    'linear-gradient(135deg, #1a1c24, #17171d)'
  ];

  const esc = (str) => (str || '').toString()
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  function applyTheme(data) {
    document.documentElement.setAttribute('data-theme', data.theme || 'charcoal-orange');
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined && value !== null) el.textContent = value;
  }

  function applySiteWide(data) {
    const email = data.site.email;
    const whatsapp = (data.site.whatsapp || '').replace(/[^\d+]/g, '');

    document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
      a.href = `mailto:${email}`;
      if (a.querySelector('span') === null && a.textContent.includes('@')) a.textContent = email;
    });
    document.querySelectorAll('a[aria-label="GitHub"]').forEach(a => a.href = data.site.github);
    document.querySelectorAll('a[aria-label="LinkedIn"]').forEach(a => a.href = data.site.linkedin);
    document.querySelectorAll('a[aria-label="LeetCode"]').forEach(a => a.href = data.site.leetcode);
    document.querySelectorAll('a.js-github-link').forEach(a => a.href = data.site.github);
    document.querySelectorAll('a.js-linkedin-link').forEach(a => a.href = data.site.linkedin);
    document.querySelectorAll('a.js-leetcode-link').forEach(a => a.href = data.site.leetcode);

    document.querySelectorAll('a[aria-label="WhatsApp"], a.js-whatsapp-link').forEach(a => {
      if (whatsapp) {
        a.href = `https://wa.me/${whatsapp.replace('+', '')}`;
        a.style.display = '';
      } else {
        a.style.display = 'none';
      }
    });
    document.querySelectorAll('.js-whatsapp-card').forEach(card => {
      card.style.display = whatsapp ? '' : 'none';
      const span = card.querySelector('span');
      if (span && whatsapp) span.textContent = data.site.whatsapp;
    });

    const profileImg = document.getElementById('profile-photo');
    if (profileImg && data.images.profile) profileImg.src = data.images.profile;
  }

  function applyHome(data) {
    if (!document.body.classList.contains('page-home')) return;
    const h = data.home;
    setText('home-eyebrow', h.eyebrow);
    setText('home-role', h.role);
    setText('home-tagline', h.tagline);

    const statsGrid = document.getElementById('home-stats-grid');
    if (statsGrid && Array.isArray(h.stats)) {
      statsGrid.innerHTML = h.stats.map(s => `
        <div class="stat-item">
          <div class="stat-number" data-target="${s.value}" data-decimals="${s.decimals || 0}"><span>0</span><span class="suffix">${esc(s.suffix)}</span></div>
          <p class="stat-label">${esc(s.label)}</p>
        </div>
      `).join('');
    }

    const featuredGrid = document.getElementById('home-featured-grid');
    if (featuredGrid && Array.isArray(h.featured)) {
      featuredGrid.innerHTML = h.featured.map((p, i) => `
        <a class="work-card" href="projects.html">
          <div class="work-thumb" style="${p.image ? '' : `background: ${GRADIENTS[i % GRADIENTS.length]};`}">
            ${p.image ? `<img src="${p.image}" alt="${esc(p.title)}" style="width:100%;height:100%;object-fit:cover;">` : `<span class="glyph">${esc(p.glyph || '')}</span>`}
          </div>
          <div class="work-overlay">
            <span class="work-tag">${esc(p.tag)}</span>
            <h3>${esc(p.title)}</h3>
          </div>
        </a>
      `).join('');
    }
  }

  function applySectionHead(prefix, section) {
    setText(`${prefix}-eyebrow`, section.eyebrow);
    setText(`${prefix}-heading`, section.heading);
    setText(`${prefix}-intro`, section.intro);
  }

  function applyAbout(data) {
    if (!document.body.classList.contains('page-about')) return;
    applySectionHead('about', data.about);
    const container = document.getElementById('about-story-paragraphs');
    if (container && Array.isArray(data.about.paragraphs)) {
      const [first, ...rest] = data.about.paragraphs;
      let html = first ? `<p>${esc(first)}</p>` : '';
      if (rest.length) html += `<p>${esc(rest[0])}</p>`;
      html += `<p class="story-highlight">${esc(data.about.highlight)}</p>`;
      rest.slice(1).forEach(p => { html += `<p>${esc(p)}</p>`; });
      container.innerHTML = html;
    }
  }

  function applyServices(data) {
    if (!document.body.classList.contains('page-services')) return;
    applySectionHead('services', data.services);
    const grid = document.getElementById('services-grid');
    if (grid && Array.isArray(data.services.items)) {
      grid.innerHTML = data.services.items.map((s, i) => `
        <div class="service-card reveal">
          <div class="service-top">
            <div class="service-icon">${ICONS[s.icon] || ICONS.general}</div>
            <span class="service-label">${esc(s.price ? s.price : s.label)}</span>
          </div>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.description)}</p>
          <span class="service-index">${String(i + 1).padStart(2, '0')}</span>
        </div>
      `).join('');
    }
  }

  function applyAchievements(data) {
    if (!document.body.classList.contains('page-achievements')) return;
    applySectionHead('achievements', data.achievements);
    const list = document.getElementById('achievements-list');
    if (list && Array.isArray(data.achievements.items)) {
      list.innerHTML = data.achievements.items.map(a => `
        <div class="achievement-item reveal">
          <span class="achievement-dot">
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 4.86L20 7.7l-4 3.9.95 5.5L12 14.6l-4.95 2.5L8 11.6l-4-3.9 5.6-.84L12 2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
          </span>
          <div class="achievement-card">
            <div class="achievement-top">
              <h3>${esc(a.title)}</h3>
              <span class="achievement-year">${esc(a.year)}</span>
            </div>
            <div class="achievement-meta">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-5.2-9.5-9.5C.5 7.5 3 3.5 7 3.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 4 0 6.5 4 4.5 8-2.5 4.3-9.5 9.5-9.5 9.5z" stroke="currentColor" stroke-width="1.5"/></svg>
              ${esc(a.by)}
            </div>
            <p class="achievement-why">${esc(a.why)}</p>
          </div>
        </div>
      `).join('');
    }
  }

  function applyCertifications(data) {
    if (!document.body.classList.contains('page-achievements')) return;
    if (!data.certifications) return;
    applySectionHead('certifications', data.certifications);
    const grid = document.getElementById('certifications-grid');
    if (grid && Array.isArray(data.certifications.items)) {
      grid.innerHTML = data.certifications.items.map(c => `
        <button type="button" class="certification-card reveal"
          data-title="${esc(c.title)}" data-issuer="${esc(c.issuer)}" data-date="${esc(c.date)}"
          data-desc="${esc(c.description || '')}" data-pdf="${esc(c.pdf || '')}" data-pdf-name="${esc(c.pdfName || '')}"
          data-link="${esc(c.link || '')}">
          <div class="certification-top">
            <div class="certification-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 4.86L20 7.7l-4 3.9.95 5.5L12 14.6l-4.95 2.5L8 11.6l-4-3.9 5.6-.84L12 2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
            </div>
            <span class="certification-date">${esc(c.date)}</span>
          </div>
          <h3>${esc(c.title)}</h3>
          <p class="certification-issuer">${esc(c.issuer)}</p>
          ${c.pdf ? `<span class="certification-pdf-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M6 2h9l5 5v15H6V2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M15 2v5h5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
            View Certificate
          </span>` : ''}
          ${c.link ? `
          <span class="certification-link" data-external-link="${esc(c.link)}">
            View Credential
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>` : ''}
        </button>
      `).join('');
      document.dispatchEvent(new CustomEvent('certifications-rendered'));
    }
  }

  function applyProjects(data) {
    if (!document.body.classList.contains('page-projects')) return;
    applySectionHead('projects', data.projects);
    const grid = document.getElementById('projects-grid');
    if (grid && Array.isArray(data.projects.items)) {
      grid.innerHTML = data.projects.items.map((p, i) => `
        <button class="project-card"
          data-category="${esc(p.category)}" data-category-label="${esc(p.categoryLabel)}" data-glyph="${esc(p.glyph)}"
          data-title="${esc(p.title)}" data-desc="${esc(p.desc)}" data-tags="${esc(p.tags)}">
          <div class="project-thumb" style="${p.image ? '' : `background: ${GRADIENTS[i % GRADIENTS.length]};`}">
            ${p.image ? `<img src="${p.image}" alt="${esc(p.title)}" style="width:100%;height:100%;object-fit:cover;">` : `<span class="glyph">${esc(p.glyph)}</span>`}
          </div>
          <div class="project-body">
            <span class="project-category">${esc(p.categoryLabel)}</span>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.desc)}</p>
          </div>
        </button>
      `).join('');
    }
  }

  function applyContact(data) {
    if (!document.body.classList.contains('page-contact')) return;
    applySectionHead('contact', data.contact);
    const emailCard = document.getElementById('contact-email-text');
    if (emailCard) emailCard.textContent = data.site.email;
  }

  function init() {
    const data = getSiteData();
    applyTheme(data);
    applySiteWide(data);
    applyHome(data);
    applyAbout(data);
    applyServices(data);
    applyAchievements(data);
    applyCertifications(data);
    applyProjects(data);
    applyContact(data);
  }

  /* Apply theme immediately (before DOMContentLoaded) to avoid a flash of default colors */
  try { document.documentElement.setAttribute('data-theme', getSiteData().theme || 'charcoal-orange'); } catch (e) {}

  document.addEventListener('DOMContentLoaded', init);
})();
