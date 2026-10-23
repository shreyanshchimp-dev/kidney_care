document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.pg-faq-item');
  items.forEach((item) => {
    const button = item.querySelector('button');
    const answer = item.querySelector('.pg-faq-answer');
    const toggle = item.querySelector('.pg-faq-toggle');
    if (!button || !answer || !toggle) return;
    button.addEventListener('click', () => {
      const willOpen = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(willOpen));
      answer.hidden = !willOpen;
      toggle.innerHTML = `<i class="ui-icon" data-lucide="${willOpen ? 'minus' : 'plus'}" aria-hidden="true"></i>`;
      if (window.KidneyCareIcons) window.KidneyCareIcons.render();
    });
  });
});
