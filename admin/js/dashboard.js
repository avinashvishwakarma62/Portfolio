/* ============================================================
   ADMIN DASHBOARD LOGIC
   Loads site data into memory, renders every editor panel,
   and saves changes back to the shared data layer (site-data.js)
   so the public pages update instantly.
   ============================================================ */

requireLogin();

let workingData = getSiteData();
const THEME_META = {
  'charcoal-orange': { name: 'Charcoal Orange', desc: 'The default look — dark charcoal, orange & blue.', colors: ['#0E0E12', '#FF7A3D', '#2FB8FF'] },
  'midnight-blue':   { name: 'Midnight Blue',   desc: 'Deep navy base with electric blue & teal accents.', colors: ['#0A0E1A', '#4C7DFF', '#34E0D8'] },
  'slate-purple':    { name: 'Slate Purple',    desc: 'Moody slate with violet & pink highlights.', colors: ['#100E17', '#B084F5', '#FF6FB5'] },
  'emerald-dark':    { name: 'Emerald Dark',    desc: 'Rich near-black with emerald & cyan accents.', colors: ['#0B1210', '#2FD98A', '#3FC7E8'] }
};

document.documentElement.setAttribute('data-theme', workingData.theme || 'charcoal-orange');

/* ---------- Toast ---------- */
let toastTimer;
function showToast(message) {
  const toast = document.getElementById('admin-toast');
  toast.textContent = message || 'Saved — the live site is updated.';
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

function persist(sectionLabel) {
  const ok = saveSiteData(workingData);
  if (ok) {
    showToast(`${sectionLabel} saved — the live site is updated.`);
    renderOverview();
  } else {
    showToast('Could not save — your browser storage may be full.');
  }
}

/* ---------- Sidebar navigation ---------- */
document.querySelectorAll('.admin-nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('is-active'));
    document.querySelectorAll('.admin-panel-section').forEach(s => s.classList.remove('is-active'));
    btn.classList.add('is-active');
    document.getElementById(btn.dataset.target).classList.add('is-active');
    document.getElementById('admin-sidebar').classList.remove('is-open');
  });
});

document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
  document.getElementById('admin-sidebar').classList.toggle('is-open');
});

document.getElementById('logout-btn').addEventListener('click', (e) => {
  e.preventDefault();
  logout();
  window.location.href = 'index.html';
});

/* ---------- Save button wiring ---------- */
document.querySelectorAll('[data-save]').forEach(btn => {
  btn.addEventListener('click', () => {
    const section = btn.dataset.save;
    if (section === 'home') saveHome();
    if (section === 'about') saveAbout();
    if (section === 'services') saveServices();
    if (section === 'achievements') saveAchievements();
    if (section === 'certifications') saveCertifications();
    if (section === 'projects') saveProjects();
    if (section === 'contact') saveContact();
  });
});

/* ============================================================
   OVERVIEW
   ============================================================ */
function renderOverview() {
  const grid = document.getElementById('overview-summary');
  const themeMeta = THEME_META[workingData.theme] || THEME_META['charcoal-orange'];
  grid.innerHTML = `
    <div class="admin-summary-card"><div class="num">${workingData.services.items.length}</div><div class="lbl">Services listed</div></div>
    <div class="admin-summary-card"><div class="num">${workingData.achievements.items.length}</div><div class="lbl">Achievements listed</div></div>
    <div class="admin-summary-card"><div class="num">${(workingData.certifications && workingData.certifications.items.length) || 0}</div><div class="lbl">Certifications listed</div></div>
    <div class="admin-summary-card"><div class="num">${workingData.projects.items.length}</div><div class="lbl">Portfolio projects</div></div>
    <div class="admin-summary-card"><div class="num" style="font-size:1.2rem;">${themeMeta.name}</div><div class="lbl">Active theme</div></div>
  `;
}

/* ============================================================
   HOME PAGE
   ============================================================ */
function populateHome() {
  document.getElementById('home-eyebrow-input').value = workingData.home.eyebrow;
  document.getElementById('home-role-input').value = workingData.home.role;
  document.getElementById('home-tagline-input').value = workingData.home.tagline;

  const statsWrap = document.getElementById('home-stats-editor');
  statsWrap.innerHTML = workingData.home.stats.map((s, i) => `
    <div class="admin-item-card">
      <div class="admin-grid-2">
        <div class="admin-field"><label>Value</label><input type="number" step="0.01" data-stat="${i}" data-field="value" value="${s.value}"></div>
        <div class="admin-field"><label>Decimal places</label><input type="number" min="0" max="2" data-stat="${i}" data-field="decimals" value="${s.decimals}"></div>
        <div class="admin-field"><label>Suffix (e.g. "+", "CGPA")</label><input type="text" data-stat="${i}" data-field="suffix" value="${s.suffix}"></div>
        <div class="admin-field"><label>Label</label><input type="text" data-stat="${i}" data-field="label" value="${s.label}"></div>
      </div>
    </div>
  `).join('');
  statsWrap.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
      const i = Number(input.dataset.stat);
      const field = input.dataset.field;
      workingData.home.stats[i][field] = field === 'value' || field === 'decimals' ? Number(input.value) : input.value;
    });
  });

  const featWrap = document.getElementById('home-featured-editor');
  featWrap.innerHTML = workingData.home.featured.map((p, i) => `
    <div class="admin-item-card">
      <div class="admin-item-head">
        <div class="admin-item-thumb" id="home-feat-thumb-${i}">
          ${p.image ? `<img src="${p.image}" alt="">` : (p.glyph || '')}
        </div>
        <h3>Tile ${i + 1}</h3>
      </div>
      <div class="admin-field"><label>Title</label><input type="text" data-feat="${i}" data-field="title" value="${escAttr(p.title)}"></div>
      <div class="admin-grid-2">
        <div class="admin-field"><label>Tag</label><input type="text" data-feat="${i}" data-field="tag" value="${escAttr(p.tag)}"></div>
        <div class="admin-field"><label>Glyph (2 letters, used if no image)</label><input type="text" maxlength="3" data-feat="${i}" data-field="glyph" value="${escAttr(p.glyph)}"></div>
      </div>
      <input type="file" accept="image/*" class="admin-file-input" data-feat-image="${i}">
      ${p.image ? `<button type="button" class="btn-admin btn-admin-ghost btn-admin-sm" data-feat-remove-image="${i}" style="margin-top:0.6rem;">Remove Image</button>` : ''}
    </div>
  `).join('');

  featWrap.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', () => {
      const i = Number(input.dataset.feat);
      workingData.home.featured[i][input.dataset.field] = input.value;
      if (input.dataset.field === 'glyph') {
        const thumb = document.getElementById(`home-feat-thumb-${i}`);
        if (thumb && !workingData.home.featured[i].image) thumb.textContent = input.value;
      }
    });
  });
  featWrap.querySelectorAll('[data-feat-image]').forEach(input => {
    input.addEventListener('change', async () => {
      const i = Number(input.dataset.featImage);
      const file = input.files[0];
      if (!file) return;
      try {
        const dataUrl = await fileToCompressedDataURL(file, 700, 0.75);
        workingData.home.featured[i].image = dataUrl;
        populateHome();
      } catch (err) {
        showToast(err.message);
      }
    });
  });
  featWrap.querySelectorAll('[data-feat-remove-image]').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.featRemoveImage);
      workingData.home.featured[i].image = '';
      populateHome();
    });
  });
}

function saveHome() {
  workingData.home.eyebrow = document.getElementById('home-eyebrow-input').value;
  workingData.home.role = document.getElementById('home-role-input').value;
  workingData.home.tagline = document.getElementById('home-tagline-input').value;
  persist('Home page');
}

/* ============================================================
   ABOUT PAGE
   ============================================================ */
function populateAbout() {
  document.getElementById('about-eyebrow-input').value = workingData.about.eyebrow;
  document.getElementById('about-heading-input').value = workingData.about.heading;
  document.getElementById('about-intro-input').value = workingData.about.intro;
  document.getElementById('about-p1').value = workingData.about.paragraphs[0] || '';
  document.getElementById('about-p2').value = workingData.about.paragraphs[1] || '';
  document.getElementById('about-highlight').value = workingData.about.highlight || '';
  document.getElementById('about-p3').value = workingData.about.paragraphs[2] || '';
}

function saveAbout() {
  workingData.about.eyebrow = document.getElementById('about-eyebrow-input').value;
  workingData.about.heading = document.getElementById('about-heading-input').value;
  workingData.about.intro = document.getElementById('about-intro-input').value;
  workingData.about.paragraphs = [
    document.getElementById('about-p1').value,
    document.getElementById('about-p2').value,
    document.getElementById('about-p3').value
  ];
  workingData.about.highlight = document.getElementById('about-highlight').value;
  persist('About page');
}

/* ============================================================
   SERVICES
   ============================================================ */
const ICON_OPTIONS = ['web', 'python', 'java', 'dsa', 'ai', 'general'];

function populateServices() {
  document.getElementById('services-eyebrow-input').value = workingData.services.eyebrow;
  document.getElementById('services-heading-input').value = workingData.services.heading;
  document.getElementById('services-intro-input').value = workingData.services.intro;

  const wrap = document.getElementById('services-editor');
  wrap.innerHTML = workingData.services.items.map((s, i) => `
    <div class="admin-item-card">
      <div class="admin-item-head">
        <h3>Service ${i + 1}</h3>
        <button type="button" class="btn-admin btn-admin-danger btn-admin-sm" data-remove-service="${i}">Remove</button>
      </div>
      <div class="admin-field"><label>Title</label><input type="text" data-svc="${i}" data-field="title" value="${escAttr(s.title)}"></div>
      <div class="admin-field"><label>Description</label><textarea data-svc="${i}" data-field="description">${escHtml(s.description)}</textarea></div>
      <div class="admin-grid-2">
        <div class="admin-field"><label>Label (shown if no price)</label><input type="text" data-svc="${i}" data-field="label" value="${escAttr(s.label)}"></div>
        <div class="admin-field"><label>Price (optional)</label><input type="text" placeholder="e.g. Starting at \u20B92000" data-svc="${i}" data-field="price" value="${escAttr(s.price)}"></div>
      </div>
      <div class="admin-field">
        <label>Icon</label>
        <select data-svc="${i}" data-field="icon">
          ${ICON_OPTIONS.map(opt => `<option value="${opt}" ${s.icon === opt ? 'selected' : ''}>${opt}</option>`).join('')}
        </select>
      </div>
    </div>
  `).join('');

  wrap.querySelectorAll('[data-svc]').forEach(input => {
    input.addEventListener('input', () => {
      const i = Number(input.dataset.svc);
      workingData.services.items[i][input.dataset.field] = input.value;
    });
  });
  wrap.querySelectorAll('[data-remove-service]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!confirm('Remove this service?')) return;
      workingData.services.items.splice(Number(btn.dataset.removeService), 1);
      populateServices();
    });
  });
}

document.getElementById('add-service-btn').addEventListener('click', () => {
  workingData.services.items.push({
    id: 'svc-' + Date.now(), title: 'New Service', description: 'Describe this service.',
    label: 'New', price: '', icon: 'general'
  });
  populateServices();
});

function saveServices() {
  workingData.services.eyebrow = document.getElementById('services-eyebrow-input').value;
  workingData.services.heading = document.getElementById('services-heading-input').value;
  workingData.services.intro = document.getElementById('services-intro-input').value;
  persist('Services');
}

/* ============================================================
   ACHIEVEMENTS
   ============================================================ */
function populateAchievements() {
  document.getElementById('achievements-eyebrow-input').value = workingData.achievements.eyebrow;
  document.getElementById('achievements-heading-input').value = workingData.achievements.heading;
  document.getElementById('achievements-intro-input').value = workingData.achievements.intro;

  const wrap = document.getElementById('achievements-editor');
  wrap.innerHTML = workingData.achievements.items.map((a, i) => `
    <div class="admin-item-card">
      <div class="admin-item-head">
        <h3>Achievement ${i + 1}</h3>
        <button type="button" class="btn-admin btn-admin-danger btn-admin-sm" data-remove-ach="${i}">Remove</button>
      </div>
      <div class="admin-field"><label>Title</label><input type="text" data-ach="${i}" data-field="title" value="${escAttr(a.title)}"></div>
      <div class="admin-grid-2">
        <div class="admin-field"><label>Year</label><input type="text" data-ach="${i}" data-field="year" value="${escAttr(a.year)}"></div>
        <div class="admin-field"><label>Given by</label><input type="text" data-ach="${i}" data-field="by" value="${escAttr(a.by)}"></div>
      </div>
      <div class="admin-field"><label>Why it matters</label><textarea data-ach="${i}" data-field="why">${escHtml(a.why)}</textarea></div>
    </div>
  `).join('');

  wrap.querySelectorAll('[data-ach]').forEach(input => {
    input.addEventListener('input', () => {
      const i = Number(input.dataset.ach);
      workingData.achievements.items[i][input.dataset.field] = input.value;
    });
  });
  wrap.querySelectorAll('[data-remove-ach]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!confirm('Remove this achievement?')) return;
      workingData.achievements.items.splice(Number(btn.dataset.removeAch), 1);
      populateAchievements();
    });
  });
}

document.getElementById('add-achievement-btn').addEventListener('click', () => {
  workingData.achievements.items.push({
    id: 'ach-' + Date.now(), title: 'New Achievement', year: String(new Date().getFullYear()),
    by: '', why: ''
  });
  populateAchievements();
});

function saveAchievements() {
  workingData.achievements.eyebrow = document.getElementById('achievements-eyebrow-input').value;
  workingData.achievements.heading = document.getElementById('achievements-heading-input').value;
  workingData.achievements.intro = document.getElementById('achievements-intro-input').value;
  persist('Achievements');
}

/* ============================================================
   CERTIFICATIONS
   ============================================================ */
function populateCertifications() {
  if (!workingData.certifications) {
    workingData.certifications = { eyebrow: 'Certifications', heading: 'Courses & Certifications', intro: '', items: [] };
  }
  document.getElementById('certifications-eyebrow-input').value = workingData.certifications.eyebrow;
  document.getElementById('certifications-heading-input').value = workingData.certifications.heading;
  document.getElementById('certifications-intro-input').value = workingData.certifications.intro;

  const wrap = document.getElementById('certifications-editor');
  wrap.innerHTML = workingData.certifications.items.map((c, i) => `
    <div class="admin-item-card">
      <div class="admin-item-head">
        <h3>Certificate ${i + 1}</h3>
        <button type="button" class="btn-admin btn-admin-danger btn-admin-sm" data-remove-cert="${i}">Remove</button>
      </div>
      <div class="admin-field"><label>Title</label><input type="text" data-cert="${i}" data-field="title" value="${escAttr(c.title)}"></div>
      <div class="admin-grid-2">
        <div class="admin-field"><label>Issued by</label><input type="text" data-cert="${i}" data-field="issuer" value="${escAttr(c.issuer)}"></div>
        <div class="admin-field"><label>Date</label><input type="text" data-cert="${i}" data-field="date" value="${escAttr(c.date)}"></div>
      </div>
      <div class="admin-field"><label>Description (shown when someone clicks the card)</label><textarea data-cert="${i}" data-field="description" rows="3">${escAttr(c.description || '')}</textarea></div>
      <div class="admin-field"><label>Credential link (optional)</label><input type="text" data-cert="${i}" data-field="link" value="${escAttr(c.link)}" placeholder="https://..."></div>
      <div class="admin-field">
        <label>Certificate PDF</label>
        ${c.pdf ? `<p class="admin-file-current">Uploaded: ${escAttr(c.pdfName || 'certificate.pdf')} — <a href="${c.pdf}" target="_blank" rel="noopener">Preview</a></p>` : ''}
        <input type="file" accept="application/pdf" class="admin-file-input" data-cert-pdf="${i}">
        ${c.pdf ? `<button type="button" class="btn-admin btn-admin-ghost btn-admin-sm" data-remove-cert-pdf="${i}" style="margin-top:0.6rem;">Remove PDF</button>` : ''}
      </div>
    </div>
  `).join('');

  wrap.querySelectorAll('[data-cert]').forEach(input => {
    input.addEventListener('input', () => {
      const i = Number(input.dataset.cert);
      workingData.certifications.items[i][input.dataset.field] = input.value;
    });
  });
  wrap.querySelectorAll('[data-remove-cert]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!confirm('Remove this certificate?')) return;
      workingData.certifications.items.splice(Number(btn.dataset.removeCert), 1);
      populateCertifications();
    });
  });
  wrap.querySelectorAll('[data-cert-pdf]').forEach(input => {
    input.addEventListener('change', async () => {
      const i = Number(input.dataset.certPdf);
      const file = input.files[0];
      if (!file) return;
      try {
        const dataUrl = await fileToDataURL(file, 'application/pdf', MAX_CERT_PDF_BYTES);
        workingData.certifications.items[i].pdf = dataUrl;
        workingData.certifications.items[i].pdfName = file.name;
        populateCertifications();
        showToast('Certificate PDF attached — click Save Changes to publish it.');
      } catch (err) {
        showToast(err.message);
      }
    });
  });
  wrap.querySelectorAll('[data-remove-cert-pdf]').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.removeCertPdf);
      workingData.certifications.items[i].pdf = '';
      workingData.certifications.items[i].pdfName = '';
      populateCertifications();
    });
  });
}

document.getElementById('add-certification-btn').addEventListener('click', () => {
  workingData.certifications.items.push({
    id: 'cert-' + Date.now(), title: 'New Certificate', issuer: '', date: String(new Date().getFullYear()), link: '', description: '', pdf: '', pdfName: ''
  });
  populateCertifications();
});

function saveCertifications() {
  workingData.certifications.eyebrow = document.getElementById('certifications-eyebrow-input').value;
  workingData.certifications.heading = document.getElementById('certifications-heading-input').value;
  workingData.certifications.intro = document.getElementById('certifications-intro-input').value;
  persist('Certifications');
}

/* ============================================================
   PROJECTS
   ============================================================ */
function populateProjects() {
  document.getElementById('projects-eyebrow-input').value = workingData.projects.eyebrow;
  document.getElementById('projects-heading-input').value = workingData.projects.heading;
  document.getElementById('projects-intro-input').value = workingData.projects.intro;

  const wrap = document.getElementById('projects-editor');
  wrap.innerHTML = workingData.projects.items.map((p, i) => `
    <div class="admin-item-card">
      <div class="admin-item-head">
        <div class="admin-item-thumb" id="proj-thumb-${i}">
          ${p.image ? `<img src="${p.image}" alt="">` : (p.glyph || '')}
        </div>
        <h3>Project ${i + 1}</h3>
        <button type="button" class="btn-admin btn-admin-danger btn-admin-sm" data-remove-proj="${i}">Remove</button>
      </div>
      <div class="admin-field"><label>Title</label><input type="text" data-proj="${i}" data-field="title" value="${escAttr(p.title)}"></div>
      <div class="admin-field"><label>Description</label><textarea data-proj="${i}" data-field="desc">${escHtml(p.desc)}</textarea></div>
      <div class="admin-grid-2">
        <div class="admin-field">
          <label>Category</label>
          <select data-proj="${i}" data-field="category">
            <option value="web" ${p.category === 'web' ? 'selected' : ''}>Web Development</option>
            <option value="ai" ${p.category === 'ai' ? 'selected' : ''}>AI & Machine Learning</option>
            <option value="other" ${p.category === 'other' ? 'selected' : ''}>Other Projects</option>
          </select>
        </div>
        <div class="admin-field"><label>Glyph (used if no image)</label><input type="text" maxlength="3" data-proj="${i}" data-field="glyph" value="${escAttr(p.glyph)}"></div>
      </div>
      <div class="admin-field"><label>Tags (comma separated)</label><input type="text" data-proj="${i}" data-field="tags" value="${escAttr(p.tags)}"></div>
      <input type="file" accept="image/*" class="admin-file-input" data-proj-image="${i}">
      ${p.image ? `<button type="button" class="btn-admin btn-admin-ghost btn-admin-sm" data-proj-remove-image="${i}" style="margin-top:0.6rem;">Remove Image</button>` : ''}
    </div>
  `).join('');

  wrap.querySelectorAll('select[data-proj], input[data-proj]').forEach(input => {
    input.addEventListener('input', () => {
      const i = Number(input.dataset.proj);
      const field = input.dataset.field;
      workingData.projects.items[i][field] = input.value;
      if (field === 'category') {
        const labelMap = { web: 'Web Development', ai: 'AI & Machine Learning', other: 'Other Projects' };
        workingData.projects.items[i].categoryLabel = labelMap[input.value];
      }
      if (field === 'glyph') {
        const thumb = document.getElementById(`proj-thumb-${i}`);
        if (thumb && !workingData.projects.items[i].image) thumb.textContent = input.value;
      }
    });
  });
  wrap.querySelectorAll('[data-proj-image]').forEach(input => {
    input.addEventListener('change', async () => {
      const i = Number(input.dataset.projImage);
      const file = input.files[0];
      if (!file) return;
      try {
        const dataUrl = await fileToCompressedDataURL(file, 800, 0.75);
        workingData.projects.items[i].image = dataUrl;
        populateProjects();
      } catch (err) {
        showToast(err.message);
      }
    });
  });
  wrap.querySelectorAll('[data-proj-remove-image]').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.projRemoveImage);
      workingData.projects.items[i].image = '';
      populateProjects();
    });
  });
  wrap.querySelectorAll('[data-remove-proj]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!confirm('Remove this project?')) return;
      workingData.projects.items.splice(Number(btn.dataset.removeProj), 1);
      populateProjects();
    });
  });
}

document.getElementById('add-project-btn').addEventListener('click', () => {
  workingData.projects.items.push({
    id: 'proj-' + Date.now(), category: 'web', categoryLabel: 'Web Development', glyph: 'NP',
    title: 'New Project', desc: 'Describe what you built.', tags: '', image: ''
  });
  populateProjects();
});

function saveProjects() {
  workingData.projects.eyebrow = document.getElementById('projects-eyebrow-input').value;
  workingData.projects.heading = document.getElementById('projects-heading-input').value;
  workingData.projects.intro = document.getElementById('projects-intro-input').value;
  persist('Portfolio projects');
}

/* ============================================================
   CONTACT & SOCIALS
   ============================================================ */
function populateContact() {
  document.getElementById('contact-eyebrow-input').value = workingData.contact.eyebrow;
  document.getElementById('contact-heading-input').value = workingData.contact.heading;
  document.getElementById('contact-intro-input').value = workingData.contact.intro;
  document.getElementById('site-email-input').value = workingData.site.email;
  document.getElementById('site-whatsapp-input').value = workingData.site.whatsapp;
  document.getElementById('site-linkedin-input').value = workingData.site.linkedin;
  document.getElementById('site-github-input').value = workingData.site.github;
  document.getElementById('site-leetcode-input').value = workingData.site.leetcode;
}

function saveContact() {
  workingData.contact.eyebrow = document.getElementById('contact-eyebrow-input').value;
  workingData.contact.heading = document.getElementById('contact-heading-input').value;
  workingData.contact.intro = document.getElementById('contact-intro-input').value;
  workingData.site.email = document.getElementById('site-email-input').value.trim();
  workingData.site.whatsapp = document.getElementById('site-whatsapp-input').value.trim();
  workingData.site.linkedin = document.getElementById('site-linkedin-input').value.trim();
  workingData.site.github = document.getElementById('site-github-input').value.trim();
  workingData.site.leetcode = document.getElementById('site-leetcode-input').value.trim();
  persist('Contact & socials');
}

/* ============================================================
   IMAGES — profile photo
   ============================================================ */
function populateImages() {
  const preview = document.getElementById('profile-thumb-preview');
  preview.innerHTML = `<img src="${workingData.images.profile}" alt="">`;
}

document.getElementById('profile-photo-input').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const dataUrl = await fileToCompressedDataURL(file, 900, 0.8);
    workingData.images.profile = dataUrl;
    populateImages();
  } catch (err) {
    showToast(err.message);
  }
});

document.getElementById('save-profile-photo-btn').addEventListener('click', () => {
  persist('Profile photo');
});

/* ============================================================
   THEME
   ============================================================ */
function populateTheme() {
  const grid = document.getElementById('theme-grid');
  grid.innerHTML = Object.keys(THEME_META).map(key => {
    const meta = THEME_META[key];
    const isSelected = workingData.theme === key;
    return `
      <div class="theme-option ${isSelected ? 'is-selected' : ''}" data-theme-option="${key}">
        <div class="theme-swatch">
          <span style="background:${meta.colors[0]};"></span>
          <span style="background:${meta.colors[1]};"></span>
          <span style="background:${meta.colors[2]};"></span>
        </div>
        <h4>${meta.name}</h4>
        <p>${meta.desc}</p>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('[data-theme-option]').forEach(el => {
    el.addEventListener('click', () => {
      const key = el.dataset.themeOption;
      workingData.theme = key;
      document.documentElement.setAttribute('data-theme', key);
      saveSiteData(workingData);
      populateTheme();
      renderOverview();
      showToast(`Theme changed to ${THEME_META[key].name} — updated across the whole live site.`);
    });
  });
}

/* ============================================================
   ACCOUNT & SECURITY
   ============================================================ */
function refreshDefaultCredsWarning() {
  document.getElementById('default-creds-warning').style.display = isUsingDefaultCredentials() ? '' : 'none';
}

document.getElementById('change-credentials-btn').addEventListener('click', () => {
  const currentPassword = document.getElementById('current-password-input').value;
  const newUsername = document.getElementById('new-username-input').value.trim();
  const newPassword = document.getElementById('new-password-input').value;
  const confirmPassword = document.getElementById('confirm-password-input').value;
  const errorBox = document.getElementById('account-error');

  const creds = getAdminCredentials();
  errorBox.style.display = 'none';

  if (currentPassword !== creds.password) {
    errorBox.textContent = 'Current password is incorrect.';
    errorBox.style.display = 'block';
    return;
  }
  if (!newUsername || !newPassword) {
    errorBox.textContent = 'Please fill in a new username and password.';
    errorBox.style.display = 'block';
    return;
  }
  if (newPassword.length < 6) {
    errorBox.textContent = 'New password should be at least 6 characters.';
    errorBox.style.display = 'block';
    return;
  }
  if (newPassword !== confirmPassword) {
    errorBox.textContent = 'New password and confirmation do not match.';
    errorBox.style.display = 'block';
    return;
  }

  saveAdminCredentials({ username: newUsername, password: newPassword });
  document.getElementById('current-password-input').value = '';
  document.getElementById('new-username-input').value = '';
  document.getElementById('new-password-input').value = '';
  document.getElementById('confirm-password-input').value = '';
  refreshDefaultCredsWarning();
  showToast('Login credentials updated. Use your new username and password next time you log in.');
});

document.getElementById('reset-content-btn').addEventListener('click', () => {
  if (!confirm('This will erase every edit made in the Admin Panel and restore the original default content. This cannot be undone. Continue?')) return;
  resetSiteData();
  workingData = getSiteData();
  document.documentElement.setAttribute('data-theme', workingData.theme);
  populateAll();
  showToast('All content reset to defaults.');
});

/* ---------- helpers ---------- */
function escAttr(str) {
  return (str || '').toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escHtml(str) {
  return (str || '').toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ---------- init ---------- */
function populateAll() {
  renderOverview();
  populateHome();
  populateAbout();
  populateServices();
  populateAchievements();
  populateCertifications();
  populateProjects();
  populateContact();
  populateImages();
  populateTheme();
  refreshDefaultCredsWarning();
}

document.addEventListener('DOMContentLoaded', populateAll);
