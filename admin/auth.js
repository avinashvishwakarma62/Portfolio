/* ============================================================
   ADMIN AUTH
   Handles login checks, session state, and password changes.
   Credentials are stored in localStorage (SITE_AUTH_KEY) and
   seeded with a default admin account on first run.
   ============================================================ */

const DEFAULT_ADMIN_CREDENTIALS = { username: 'admin', password: 'Admin@123' };

function getAdminCredentials() {
  try {
    const raw = localStorage.getItem(SITE_AUTH_KEY);
    if (!raw) return { ...DEFAULT_ADMIN_CREDENTIALS };
    const parsed = JSON.parse(raw);
    if (!parsed.username || !parsed.password) return { ...DEFAULT_ADMIN_CREDENTIALS };
    return parsed;
  } catch (e) {
    return { ...DEFAULT_ADMIN_CREDENTIALS };
  }
}

function saveAdminCredentials(creds) {
  localStorage.setItem(SITE_AUTH_KEY, JSON.stringify(creds));
}

function isUsingDefaultCredentials() {
  const current = getAdminCredentials();
  return current.username === DEFAULT_ADMIN_CREDENTIALS.username &&
         current.password === DEFAULT_ADMIN_CREDENTIALS.password;
}

function attemptLogin(username, password) {
  const creds = getAdminCredentials();
  if (username === creds.username && password === creds.password) {
    sessionStorage.setItem(SITE_SESSION_KEY, 'authenticated');
    return true;
  }
  return false;
}

function isLoggedIn() {
  return sessionStorage.getItem(SITE_SESSION_KEY) === 'authenticated';
}

function logout() {
  sessionStorage.removeItem(SITE_SESSION_KEY);
}

function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = 'index.html';
  }
}
