/* Shared header/footer loader (frontend-only, no build step).
 *
 * Every page contains two placeholders:
 *   <div data-template="partials/header.html" data-template-target="header"></div>
 *   <div data-template="partials/footer.html" data-template-target="footer"></div>
 * This script fetches those files and swaps each placeholder for the file's markup.
 * Edit partials/header.html or partials/footer.html once -> every page updates.
 * NOTE: fetch() needs http(s); serve the folder (e.g. `python -m http.server`)
 * instead of double-clicking the HTML files. */

const SERVICE_PAGES = [
  'service', 'prostate-care', 'bladder-care', 'urethral-reconstructive-surgery',
  'uro-oncology', 'male-sexual-health', 'female-paediatric-urology',
  'laparoscopic-urological-surgery'
];

function currentPageName() {
  const file = location.pathname.split('/').pop() || 'index.html';
  return file.replace(/\.html$/, '') || 'index';
}

function markActiveNavigation() {
  const page = currentPageName();
  // Header links tagged data-nav="home" / "about" get aria-current on their own page.
  const key = page === 'index' ? 'home' : page === 'about' ? 'about' : page === 'conditions' ? 'conditions' : null;
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === key) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  // Treatment pages highlight the "Treatments" dropdown toggle.
  const toggle = document.querySelector('.nav-dropdown-toggle');
  if (toggle) toggle.classList.toggle('service-nav-active', SERVICE_PAGES.includes(page));
}

function initSharedNavigation() {
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('navlinks');
  if (!menuBtn || !nav || menuBtn.dataset.ready === 'true') return;
  menuBtn.dataset.ready = 'true';
  const setMenu = open => {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuBtn.innerHTML = `<i class="ui-icon" data-lucide="${open ? 'x' : 'menu'}" aria-hidden="true"></i>`;
    if (window.KidneyCareIcons) window.KidneyCareIcons.render();
  };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
}

async function loadSharedTemplate(slot) {
  const path = slot.dataset.template;
  try {
    const response = await fetch(new URL(path, document.baseURI));
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const markup = (await response.text()).trim();
    if (!markup) throw new Error('template is empty');
    slot.outerHTML = markup; // replace the placeholder so the header stays a direct child of <body> (sticky works)
  } catch (error) {
    console.error(`Could not load shared template "${path}":`, error);
    slot.setAttribute('data-template-error', 'true');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const slots = [...document.querySelectorAll('[data-template]')];
  await Promise.all(slots.map(loadSharedTemplate));
  markActiveNavigation();
  initSharedNavigation();
  if (window.KidneyCareIcons) window.KidneyCareIcons.render();
  document.dispatchEvent(new CustomEvent('shared-layout-ready'));
});
