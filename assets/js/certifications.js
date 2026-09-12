/* ============================================================
   CERTIFICATIONS — click-to-view modal
   Clicking a certification card opens a modal with the full
   description and, if one was uploaded from the Admin Panel,
   an embedded view of the certificate PDF.
   Rebinds every time content-loader.js (re)renders the grid.
   ============================================================ */

(function () {

  function initCertifications() {
    const cards = Array.from(document.querySelectorAll('.certification-card'));
    const modal = document.querySelector('.cert-modal');
    if (!cards.length || !modal) return;

    const panel = modal.querySelector('.cert-modal-panel');
    const closeBtn = modal.querySelector('.cert-modal-close');
    const titleEl = modal.querySelector('.cert-modal-title');
    const issuerEl = modal.querySelector('.cert-modal-issuer');
    const dateEl = modal.querySelector('.cert-modal-date');
    const descEl = modal.querySelector('.cert-modal-desc');
    const linkEl = modal.querySelector('.cert-modal-link');
    const pdfWrap = modal.querySelector('.cert-modal-pdf');
    const pdfFrame = pdfWrap ? pdfWrap.querySelector('iframe') : null;
    const pdfOpenBtn = modal.querySelector('.cert-modal-pdf-open');
    let lastFocused = null;

    const openModal = (card) => {
      lastFocused = document.activeElement;

      titleEl.textContent = card.dataset.title || '';
      issuerEl.textContent = card.dataset.issuer || '';
      dateEl.textContent = card.dataset.date || '';

      const desc = card.dataset.desc || '';
      if (desc) {
        descEl.textContent = desc;
        descEl.style.display = '';
      } else {
        descEl.textContent = '';
        descEl.style.display = 'none';
      }

      const link = card.dataset.link || '';
      if (link) {
        linkEl.href = link;
        linkEl.style.display = '';
      } else {
        linkEl.style.display = 'none';
      }

      const pdf = card.dataset.pdf || '';
      if (pdf && pdfWrap) {
        pdfWrap.style.display = '';
        if (pdfFrame) pdfFrame.src = pdf;
        if (pdfOpenBtn) pdfOpenBtn.href = pdf;
      } else if (pdfWrap) {
        pdfWrap.style.display = 'none';
        if (pdfFrame) pdfFrame.src = '';
      }

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };

    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (pdfFrame) pdfFrame.src = ''; // stop rendering the PDF while hidden
      if (lastFocused) lastFocused.focus();
    };

    cards.forEach(card => {
      if (card.dataset.certBound) return;
      card.dataset.certBound = '1';
      card.addEventListener('click', () => openModal(card));

      const externalLink = card.querySelector('[data-external-link]');
      if (externalLink) {
        externalLink.addEventListener('click', (e) => {
          e.stopPropagation();
          window.open(externalLink.dataset.externalLink, '_blank', 'noopener');
        });
      }
    });

    if (!modal.dataset.bound) {
      modal.dataset.bound = '1';
      closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initCertifications);
  document.addEventListener('certifications-rendered', initCertifications);

})();
