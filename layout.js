/* Shared site behavior. The homepage loads its header and footer from partials;
   tools/build_pages.py assembles the same templates into other static pages. */
function initSharedNavigation() {
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('navlinks');
  if (!menuBtn || !nav || menuBtn.dataset.ready === 'true') return;
  menuBtn.dataset.ready = 'true';
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuBtn.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open navigation');
    menuBtn.textContent = '☰';
  }));
}

async function loadSharedTemplate(slot) {
  const templatePath = slot.dataset.template;
  const target = slot.dataset.templateTarget;
  if (!templatePath || !target) return;

  try {
    const templateUrl = new URL(templatePath, document.baseURI);
    const response = await fetch(templateUrl);
    if (!response.ok) throw new Error(`Could not load ${templatePath} (${response.status})`);
    const markup = (await response.text()).trim();
    if (!markup) throw new Error(`Template is empty: ${templatePath}`);

    // Replace the slot with the shared component itself, avoiding duplicate markup.
    slot.outerHTML = markup;
  } catch (error) {
    console.error(`Unable to render shared ${target} template:`, error);
    slot.setAttribute('data-template-error', 'true');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const templateSlots = [...document.querySelectorAll('[data-template][data-template-target]')];
  await Promise.all(templateSlots.map(loadSharedTemplate));

  const currentPage = location.pathname.endsWith('/about.html') ? 'about' : 'home';
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === currentPage) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  // Bind navigation only after the shared header has been inserted into the page.
  initSharedNavigation();
});
