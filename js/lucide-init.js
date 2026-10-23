/* Lucide UI icon bootstrap — pinned to Lucide 0.468.0 in the HTML pages. */
(function () {
  'use strict';
  const hasPlaceholders = (root) => {
    if (!root) return false;
    if (root.nodeType === Node.ELEMENT_NODE && root.matches('i[data-lucide]')) return true;
    return !!(root.querySelector && root.querySelector('i[data-lucide]'));
  };

  const renderIcons = (root = document) => {
    if (!window.lucide || typeof window.lucide.createIcons !== 'function') return false;
    if (!hasPlaceholders(root)) return true;
    window.lucide.createIcons({
      root,
      attrs: {
        class: ['ui-icon-svg'],
        'stroke-width': 1.8,
        'aria-hidden': 'true',
        focusable: 'false'
      }
    });
    return true;
  };

  const start = () => {
    if (!renderIcons()) {
      console.warn('[Kidney Care Hospital] Lucide did not load. Check network access to the pinned jsDelivr script.');
      return;
    }
    // Observe inserted content only. Watching data-lucide attributes also sees Lucide's own
    // generated SVGs and can create a render loop that freezes the page.
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE && hasPlaceholders(node)) {
            renderIcons(node);
          }
        }
      }
    });
    observer.observe(document.body, { subtree: true, childList: true });
    window.KidneyCareIcons = { render: renderIcons, observer };
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
