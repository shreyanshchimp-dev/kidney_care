Kidney Care Hospital static website

Pages
- index.html: homepage
- about.html: About Us
- service.html: Kidney Stone Treatment
- prostate-care.html: Prostate Care
- bladder-care.html: Bladder Care
- urethral-reconstructive-surgery.html: Urethral & Reconstructive Surgery
- uro-oncology.html: Uro-Oncology
- male-sexual-health.html: Male Sexual Health & Infertility
- female-paediatric-urology.html: Female & Paediatric Urology
- laparoscopic-urological-surgery.html: Laparoscopic Urological Surgery
- patient-guide.html: Patient Guide (new)

Project folders
- css/: styles.css (global), service.css (ALL 8 treatment pages), about.css, patient-guide.css, contact-us.css
- js/: all external JavaScript files
- assets/: local images and other visual assets
- partials/: shared header.html and footer.html (edit these once; every page picks them up)

Shared header & footer
Every page has two placeholders (<div data-template="partials/header.html" ...> and the footer equivalent). js/layout.js loads partials/header.html and partials/footer.html into them in the browser, marks the active nav item, and wires the mobile menu. To change the header or footer, edit only those two files. No build step. New pages: copy the two placeholder divs and add <script src="js/layout.js"></script> before the Lucide scripts.

Footer map
The footer map is the Google Maps embed iframe in partials/footer.html. To change it, paste a new embed src from Google Maps > Share > Embed a map.

Run locally
Because the shared templates are loaded with fetch(), run the site through a local web server rather than opening files directly (it works on any normal web host). From this folder, for example:
  python -m http.server 8000
Then open http://localhost:8000/.

Patient Guide
The new Patient Guide page follows the supplied design reference with a hero section, preparation cards, a three-step visit flow, expandable FAQ items, and a contact banner. Its FAQ interaction is in js/patient-guide.js and page styles are in css/patient-guide.css.

CONTACT US PAGE
- Open contact-us.html to view the Contact Us page.
- Page-specific styles are in css/contact-us.css and form interaction is in js/contact-us.js.
- The form validates fields in the browser but does not send data to a server/email endpoint; connect a backend before production use.


Service page stylesheet
All treatment pages (service, prostate-care, bladder-care, uro-oncology, urethral-reconstructive-surgery, male-sexual-health, female-paediatric-urology, laparoscopic-urological-surgery) use the single file css/service.css. Part 1 is the shared template; Part 2 holds each page's artwork, scoped by the page class on <main>. Hero height for service pages, Patient Guide and Contact Us comes from one variable, --service-hero-height, defined in css/styles.css.
