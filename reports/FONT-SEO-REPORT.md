# Font and search favicon correction

Verified locally on 2026-09-23 with Chrome, served from `http://localhost:4173`.

## Reproduced problem

The font files were present, but component-level `font` shorthands overrode the bilingual stack. Chrome rendered Bengali product headings in the system font **Kohinoor Bangla**, despite Kalpurush loading elsewhere. The Kalpurush Unicode range also excluded the Bengali danda punctuation at U+0964/U+0965; Chrome used **Kohinoor Devanagari** for those glyphs. Existing Poppins English rendering was confirmed.

## Correction

- All text components now use the shared Poppins/Kalpurush stack. English glyphs use local Poppins; Bengali glyphs and punctuation use local Kalpurush.
- Extended the Bengali font's Unicode coverage to include danda and double danda.
- Content-derived CSS/font URL versions prevent old cached styling from surviving a new deployment. Font preload URLs match CSS URLs. HTML revalidates and Apache declares the WOFF2 MIME type.
- Retained the stable 96×96 brand PNG as the primary search favicon and generated a matching root `/favicon.ico`. All 74 pages declare both. Organization logo, WebSite name, canonical links, robots and sitemap remain available.

## Validation

- `npm run build`: 74 bilingual content pages generated.
- `npm run check`: 5,274 internal references plus metadata, favicon declarations, schema and sitemap checks passed.
- `node tests/fonts-seo.mjs`: all five checks passed. Chrome's rendered-font API confirms the actual fonts in hero text, body copy, product cards, feature titles and form labels. No system-font fallback in the tested text. Conjuncts, Bengali numerals, punctuation and English weights 400/500/600 passed.
- All four versioned WOFF2 files return HTTP 200 with `font/woff2`. Native Bengali font loading works on nested mobile pages without JavaScript.
- Locally simulated Googlebot-Image requests returned HTTP 200 for the square PNG, ICO and Organization logo. ICO contents match the PNG; robots permits access.
- `npm test`: all 17 interaction/responsive checks passed, including all 74 routes, 40 page/viewport combinations, and five automated accessibility views with zero violations.
- Reviewed screenshots: `fonts-bn-desktop.png`, `fonts-bn-solutions-mobile.png`.
- Updated deployable ZIP; archive CRC and included font/icon changes verified.

Raw font evidence: [fonts-seo-results.json](fonts-seo-results.json). Full browser results: [browser-results.json](browser-results.json).

## Production search appearance

These checks cover the local build; no production deployment or Search Console request was performed. Publish the updated dist contents, verify the public favicon URL, submit the sitemap, and request indexing of `https://subromart.com/` through Search Console. Google states that processing can take days to weeks and favicon display is not guaranteed. See [Google's favicon guidance](https://developers.google.com/search/docs/appearance/favicon-in-search) and [deployment steps](../DEPLOYMENT.md).
