#!/usr/bin/env python3
"""Build static pages using shared header/footer templates.

Edit partials/header.html or partials/footer.html, then run:
    python tools/build_pages.py
The generated HTML remains self-contained and works without runtime includes.
"""
from pathlib import Path
import re
ROOT = Path(__file__).resolve().parents[1]
HEADER = (ROOT / 'partials' / 'header.html').read_text().strip()
FOOTER = (ROOT / 'partials' / 'footer.html').read_text().strip()

for page in ('index.html', 'about.html'):
    path = ROOT / page
    html = path.read_text()
    html = re.sub(r'<!-- site-header:START -->.*?<!-- site-header:END -->',
                  '<!-- site-header:START -->\n' + HEADER + '\n<!-- site-header:END -->',
                  html, count=1, flags=re.S)
    html = re.sub(r'<!-- site-footer:START -->.*?<!-- site-footer:END -->',
                  '<!-- site-footer:START -->\n' + FOOTER + '\n<!-- site-footer:END -->',
                  html, count=1, flags=re.S)
    # Keep the active navigation state explicit in each generated page.
    html = re.sub(r'\s+aria-current="page"', '', html)
    active = 'about' if page == 'about.html' else 'home'
    html = html.replace(f'<a data-nav="{active}"', f'<a data-nav="{active}" aria-current="page"', 1)
    html = html.replace('<script>\n</script>\n<script src="layout.js"></script>', '<script src="layout.js"></script>')
    path.write_text(html)
print('Built index.html and about.html from shared partials.')
