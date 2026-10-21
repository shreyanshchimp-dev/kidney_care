#!/usr/bin/env python3
"""Build static pages from the shared header/footer partials.

Edit partials/header.html or partials/footer.html, then run:
    python tools/build_pages.py
The generated pages contain shared markup and work without runtime fetches.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
HEADER = (ROOT / "partials" / "header.html").read_text().strip()
FOOTER = (ROOT / "partials" / "footer.html").read_text().strip()

for page in ("index.html", "about.html"):
    path = ROOT / page
    html = path.read_text()
    header_pattern = r"<!-- site-header:START -->.*?<!-- site-header:END -->"
    footer_pattern = r"<!-- site-footer:START -->.*?<!-- site-footer:END -->"

    if re.search(header_pattern, html, flags=re.S):
        html = re.sub(header_pattern, lambda _: "<!-- site-header:START -->\n" + HEADER + "\n<!-- site-header:END -->", html, count=1, flags=re.S)
    else:
        slot = '<div data-template="partials/header.html" data-template-target="header"></div>'
        if slot in html:
            html = html.replace(slot, "<!-- site-header:START -->\n" + HEADER + "\n<!-- site-header:END -->", 1)

    if re.search(footer_pattern, html, flags=re.S):
        html = re.sub(footer_pattern, lambda _: "<!-- site-footer:START -->\n" + FOOTER + "\n<!-- site-footer:END -->", html, count=1, flags=re.S)
    else:
        slot = '<div data-template="partials/footer.html" data-template-target="footer"></div>'
        if slot in html:
            html = html.replace(slot, "<!-- site-footer:START -->\n" + FOOTER + "\n<!-- site-footer:END -->", 1)

    html = re.sub(r'\s+aria-current="page"', '', html)
    active = "about" if page == "about.html" else "home"
    html = html.replace(f'<a data-nav="{active}"', f'<a data-nav="{active}" aria-current="page"', 1)
    path.write_text(html)

print("Built index.html and about.html from shared partials.")
