# Subromart concise design verification report

Latest font/favicon correction: see [FONT-SEO-REPORT.md](FONT-SEO-REPORT.md). The build now validates 5,274 internal references and includes a root favicon.ico. The Lighthouse and additional-design measurements below describe the preceding concise-design build; the font regression and full browser suite were rerun after the latest correction.

Verified: 2026-09-23. Final local static build served on http://localhost:4173 with gzip and its deployment Content Security Policy. Chrome browser, Node.js 22.17.0.

## Design and content

- Shorter sales copy across home, product, service, pricing, process, about and contact pages. Guides and policy details remain available.
- Homepage hero: “Your software. Our responsibility.” Lighter Poppins typography, Kalpurush Bengali, and three responsive device previews. English remains the default language.
- White, charcoal and one selected accent. User-selected skin, light/dark/automatic mode, mobile bottom tabs, drawer and draggable WhatsApp remain functional.
- Three featured products, a four-service navigation strip, three buying benefits and a compact founder introduction replace repeated sections.
- All 48 individual feature descriptions across eight products remain in native, keyboard-accessible HTML disclosures. Setup and delivery details are also expandable; content is present without JavaScript.
- Local Poppins regular/medium and Kalpurush rendering verified using Chrome's rendered-font API. Open Graph cover updated for the new headline.

### Initial main-content copy reduction

| Route | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| / | 902 | 245 | 73% |
| /bn/ | 792 | 229 | 71% |
| /solutions/school-management/ | 480 | 111 | 77% |
| /services/maintenance/ | 426 | 90 | 79% |
| /about/ | 210 | 70 | 67% |
| /pricing/ | 306 | 150 | 51% |
| /how-we-work/ | 323 | 135 | 58% |
| /contact/ | 328 | 257 | 22% |

Counts use the same whitespace-word method before and after. Navigation, footer, aria-hidden content and the bodies of closed native disclosures are excluded. Contact counts include hidden form-result text; these are comparative copy counts, not reading-time measurements. Detailed content remains available on demand.

## Build, SEO and AI discovery

- Build and static checks passed: 37 distinct pages in two languages, 74 content routes plus 404 views, and 5,200 internal href/src references.
- Every content page has one h1, title/description/canonical, reciprocal language alternatives, English x-default and parseable JSON-LD.
- All 74 routes returned HTTP 200. Missing English and Bengali paths returned localized HTTP 404 responses. Legacy /en/ redirects preserve query parameters.
- Sitemap contains the expected 70 permanent content URLs. Manifest defaults to English; language switches preserve selected filters.
- Solution and service catalogues use CollectionPage and ItemList with matching visible entries. Product/service mainEntity references, AboutPage, ContactPage and primary images are validated.
- Organization and founder identities are kept distinct. Native feature details are server-rendered and visitor-accessible; robots, sitemap, llms.txt and full-text discovery files remain available.
- Search visibility and AI citations depend on external services; the deployment guide links to Google's published guidance. No ranking or indexing guarantee is asserted.
- Current deployable subromart-website.zip contains 116 files (1,282,316 bytes). Archive CRC, root favicon.ico, versioned fonts and Bengali punctuation coverage passed verification after the font correction.

## Functional browser checks

- PASS: Theme preference persists across pages
- PASS: Device auto, custom skin and reset work
- PASS: Category and search filters combine and reset
- PASS: Comparison persists, limits selection, removes items and updates shareable URL
- PASS: Bilingual full-content search and safe empty-result handling
- PASS: Demo changes solution and device, and Escape closes it
- PASS: Contact validation, message review, WhatsApp/email URLs, download and edit
- PASS: Three-step planner validates and includes selected features
- PASS: Demo request has a current minimum date and explicit confirmation wording
- PASS: WhatsApp drag does not open chat; position persists and supports keyboard movement
- PASS: No horizontal overflow across 8 page types at 320, 390, 768, 1024 and 1440px
- PASS: Tablet has an accessible menu between mobile and desktop breakpoints
- PASS: Local founder portrait and product preview assets render correctly
- PASS: Mobile bottom navigation, drawer and focus restoration
- PASS: All 74 language routes serve HTTP 200
- PASS: Core content and navigation work without JavaScript
- PASS: No uncaught JavaScript errors

## Additional design checks

- PASS: English default, Bengali switch and actual local Poppins/Kalpurush glyph rendering
- PASS: Language switch preserves the selected page and filters
- PASS: Legacy English redirects preserve queries and missing pages return a localized HTTP 404
- PASS: White custom accent accessibility
- PASS: Dark blue custom accent accessibility
- PASS: English dark mode accessibility
- PASS: Expanded module details accessibility
- PASS: Feature and setup disclosures work with keyboard and without JavaScript in Bengali
- PASS: services-desktop accessibility
- PASS: product-desktop accessibility
- PASS: pricing-desktop accessibility
- PASS: contact-mobile accessibility
- PASS: Captured eight redesigned views with loaded images across desktop, tablet and mobile

## Responsive and accessibility coverage

Eight page types at 320, 390, 768, 1024 and 1440 CSS pixels: 40 page/viewport combinations with no horizontal page overflow. Mobile tabs and tablet drawer were tested separately. These are browser viewport emulations, not tests on every physical device.

- English homepage / light: 0 automated WCAG A/AA violations.
- Interactive demo dialog: 0 automated WCAG A/AA violations.
- Mobile drawer: 0 automated WCAG A/AA violations.
- Bengali contact form / mobile: 0 automated WCAG A/AA violations.
- Bengali homepage / dark: 0 automated WCAG A/AA violations.
- White custom accent: 0 automated WCAG A/AA violations.
- Dark blue custom accent: 0 automated WCAG A/AA violations.
- English dark mode: 0 automated WCAG A/AA violations.
- Expanded module details: 0 automated WCAG A/AA violations.
- services-desktop: 0 automated WCAG A/AA violations.
- product-desktop: 0 automated WCAG A/AA violations.
- pricing-desktop: 0 automated WCAG A/AA violations.
- contact-mobile: 0 automated WCAG A/AA violations.

All 13 automated accessibility views reported zero violations. Keyboard focus return, Escape-to-close, draggable-control keyboard movement, reduced motion, native disclosure operation and no-JavaScript navigation were checked. Automated checks do not establish universal accessibility conformance.

## Final Lighthouse lab results

| View | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| mobile-en | 97 | 100 | 100 | 100 | 2.3 s | 0 ms | 0.003 |
| mobile-bn | 98 | 100 | 100 | 100 | 2.3 s | 100 ms | 0.003 |
| desktop-en | 100 | 100 | 100 | 100 | 0.5 s | 0 ms | 0.001 |

Lighthouse 12.6.1. Mobile uses simulated mobile conditions; desktop uses its desktop preset. These are local lab measurements, not production guarantees. Remaining opportunities include shared CSS unused by individual pages, responsive image sizing and the DOM used by illustrative device previews.

Reports: [English mobile](lighthouse-mobile-en.html), [Bengali mobile](lighthouse-mobile-bn.html), [Desktop](lighthouse-desktop-en.html). Raw results: browser-results.json, redesign-results.json, content-reduction.json and lighthouse-summary.json. Eight final full-page screenshots are listed in redesign-results.json.

## Dependencies and deployment

- Published dist contains no runtime package dependency or third-party font request.
- Existing same-day project npm audit recorded zero vulnerabilities; dependencies were unchanged in this content/design revision.
- Lighthouse runs as an isolated optional npx CLI, not a project or production dependency.
- Contact forms prepare messages locally for the visitor to send through WhatsApp or email. Tests did not send messages or confirm appointments.
- Production DNS, hosting and search-console submission were not changed. See ../DEPLOYMENT.md.
