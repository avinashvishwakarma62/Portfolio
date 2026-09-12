/* ============================================================
   Contact page — form validation + mailto handoff
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const CONTACT_EMAIL = (typeof getSiteData === 'function' ? getSiteData().site.email : null) || 'avinashvishwakarma163@gmail.com';

  const fields = {
    name: form.querySelector('#field-name'),
    email: form.querySelector('#field-email'),
    subject: form.querySelector('#field-subject'),
    message: form.querySelector('#field-message'),
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validateField = (key) => {
    const input = fields[key];
    const wrap = input.closest('.form-field');
    let valid = true;

    if (!input.value.trim()) {
      valid = false;
    } else if (key === 'email' && !isValidEmail(input.value.trim())) {
      valid = false;
    }

    wrap.classList.toggle('is-invalid', !valid);
    return valid;
  };

  Object.keys(fields).forEach(key => {
    fields[key].addEventListener('blur', () => validateField(key));
    fields[key].addEventListener('input', () => {
      const wrap = fields[key].closest('.form-field');
      if (wrap.classList.contains('is-invalid')) validateField(key);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const results = Object.keys(fields).map(validateField);
    const allValid = results.every(Boolean);

    if (!allValid) {
      status.textContent = 'Please fill in every field with a valid email before sending.';
      status.classList.remove('is-success');
      status.classList.add('is-visible');
      return;
    }

    const subjectLine = `${fields.subject.value.trim()} — message from ${fields.name.value.trim()}`;
    const bodyLines = [
      `Name: ${fields.name.value.trim()}`,
      `Email: ${fields.email.value.trim()}`,
      '',
      fields.message.value.trim()
    ].join('\n');

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyLines)}`;

    status.textContent = 'Opening your email app with this message pre-filled — just hit send there.';
    status.classList.remove('is-success');
    status.classList.add('is-visible', 'is-success');

    window.location.href = mailtoUrl;
  });
});
