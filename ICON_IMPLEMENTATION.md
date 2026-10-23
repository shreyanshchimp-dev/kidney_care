# Lucide UI icon implementation

- The site uses the official Lucide vanilla-JavaScript API with the version pinned to `0.468.0` in each HTML page.
- Script URL: `https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js` (version-pinned, no `latest` alias).
- `js/lucide-init.js` renders `data-lucide` placeholders on initial page load and watches DOM changes so menu/FAQ icons and future dynamic UI can be rendered after updates.
- Shared sizing and stroke styling is in `css/styles.css`.
- Shared header/footer partials were updated as well as all complete HTML pages. Intentional medical illustrations, photographs, logos, and large illustrative SVG artwork were retained.

## Delivery / verification note

This build environment could not resolve external package hosts, so the official library could not be downloaded and vendored locally. The project therefore references the official Lucide package through a version-pinned CDN URL. No Subresource Integrity hash is included because the exact asset bytes could not be retrieved here to calculate and verify a hash; no hash has been guessed. The page will need network access to `unpkg.com` for the Lucide icons to render.

Static HTML parsing and JavaScript syntax checks were run on all pages/scripts. Headless browser testing was attempted, but Chromium is blocked from opening the local test server by the environment (`ERR_BLOCKED_BY_ADMINISTRATOR`), so actual rendered icon appearance, browser console output, and click behavior could not be fully browser-verified in this environment.
