# subromart.com প্রকাশের নির্দেশনা

## প্রস্তুত ফাইল

`npm run build` চালিয়ে `dist/` তৈরি করুন। `dist/` হলো deploy করার সম্পূর্ণ static website। source, scripts, tests, node_modules বা package files production-এ প্রয়োজন নেই। ডিফল্ট ইংরেজি homepage `index.html`; বাংলা homepage `bn/index.html`।

## Hosting

**cPanel / Apache:** `dist`-এর ভেতরের ফাইলগুলো `public_html/`-এ আপলোড করুন। hidden `.htaccess`-ও রাখুন। এতে directory index, custom 404 ও text compression-এর নির্দেশনা আছে। server module configuration অনুযায়ী hosting provider-কে তা সক্রিয় করতে হতে পারে।

**Cloudflare Pages / Netlify:** build command `npm run build`, output directory `dist`। Build-এর runtime dependency শুধু Node.js; `_headers` ও `_redirects` output-এ অন্তর্ভুক্ত। Platform-specific domain binding ও DNS configure করুন।

**Vercel:** repo root-এর `vercel.json`-এ build command (`node scripts/build.mjs`), output directory (`dist`), redirects (`/en/*` → `/*`) ও security/CSP header আগে থেকেই সেট করা আছে। শুধু GitHub repo import করলেই এই config auto-detect হবে — dashboard-এ Framework Preset **Other** থাকবে।

`installCommand`-কে ইচ্ছাকৃতভাবে no-op রাখা হয়েছে (`echo`), কারণ `npm run build`-এর কোনো npm dependency লাগে না (শুধু Node built-in module ব্যবহার করে)। ডিফল্ট `npm install` চালালে `devDependencies`-এর `sharp`/`@playwright/test` (native binary/browser download সহ) install করতে গিয়ে Vercel-এ ব্যর্থ হতে পারে বা Node version mismatch error দিতে পারে — এই কারণেই আগে "node version problem" দেখা দিচ্ছিল। `package.json`-এর `engines.node` এখন Vercel-সমর্থিত সুনির্দিষ্ট ভার্সন `20.x` (আগে ছিল `>=20`, যেটা Vercel সবসময় ঠিকভাবে চিনতে পারে না)।

`vercel.json`-এর CSP hash তিনটি (`theme-init.js`, `ga-init.js`, `clarity-init.js`-এর জন্য) `scripts/build.mjs`-এর মতোই ম্যানুয়ালি বসানো। এই তিনটি ফাইলের কোনো একটির content বদলালে নতুন hash `npm run build`-এর পর `dist/_headers`-এ দেখে `vercel.json`-এ কপি করে নিতে হবে, নাহলে সেই ফাইলের inline script Vercel-এ CSP-তে block হয়ে যাবে।

**GitHub Pages:** `.github/workflows/deploy-pages.yml` workflow `main`-এ push হলে `node scripts/build.mjs` চালিয়ে `dist/` build করে GitHub Pages-এ deploy করে (npm install লাগে না)। এক-বারের জন্য:

1. GitHub repo-এর **Settings → Pages**-এ যান। **Source**-এ **GitHub Actions** নির্বাচন করুন (branch/folder পদ্ধতি নয়)।
2. `main`-এ push করলে workflow নিজে থেকে চলবে; **Actions** ট্যাবে progress দেখা যাবে। প্রথম সফল run-এর পর repo-এর *Pages* সেকশনে live URL (`https://<user>.github.io/<repo>/`) দেখাবে।
3. `subromart.com` custom domain হিসেবে ব্যবহার করতে **Settings → Pages → Custom domain**-এ `subromart.com` লিখুন এবং **Enforce HTTPS** চালু করুন। build ইতিমধ্যে `dist/CNAME`-এ `subromart.com` লিখে রাখে, তাই প্রতিটি deploy-এ domain setting টিকে থাকে।
4. DNS-এ apex domain (`subromart.com`)-এর জন্য GitHub Pages-এর ৪টি A record যোগ করুন: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (ঐচ্ছিক IPv6 AAAA: `2606:50c0:8000::153`, `8001::153`, `8002::153`, `8003::153`)। `www` চাইলে সেটির CNAME `<user>.github.io`-তে দিন। বিদ্যমান email MX/TXT record অপরিবর্তিত রাখুন।
5. DNS propagate ও certificate issue হতে কিছু সময় লাগতে পারে; **Settings → Pages**-এ domain-এর পাশে green check না আসা পর্যন্ত Enforce HTTPS off থাকতে পারে।

Repository root-এ static site থাকলে (subpath serving) সব asset ও page absolute path (`/assets/...`, `/solutions/...`) ব্যবহার করে, তাই custom domain ছাড়া `https://<user>.github.io/<repo>/` subpath-এ hosting করলে asset link ভেঙে যাবে। তাই custom domain (ধাপ ৩) ছাড়া GitHub Pages ব্যবহার না করাই ভালো।

**Nginx:** document root হবে dist-এর contents। একটি উদাহরণ:

```nginx
server {
    listen 80;
    server_name subromart.com;
    root /var/www/subromart;
    index index.html;

    rewrite ^/en/?$ / permanent;
    rewrite ^/en/(.*)$ /$1 permanent;

    location / { try_files $uri $uri/ =404; }
    error_page 404 /404.html;
    location = /404.html { internal; }

    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/javascript application/json application/xml image/svg+xml;

    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    add_header X-Frame-Options DENY always;
}
```

আপনার server-এর certificate ব্যবস্থার মাধ্যমে HTTPS চালু করে HTTP → HTTPS redirect দিন। উপরের snippet server provisioning বা certificate installation করে না।

**SPA fallback ব্যবহার করবেন না।** ভুল URL যেন 200 status-এ homepage না দেখায়। `/solutions/healthcare/`-এর মতো directory URL সরাসরি কাজ করবে।

## Domain ও launch checks

- `subromart.com` hosting-এর নির্দেশিত A/AAAA/CNAME-এ যুক্ত করুন। বিদ্যমান email-এর MX/TXT record অপরিবর্তিত রাখুন।
- `www.subromart.com` থাকলে HTTPS-সহ `https://subromart.com`-এ 301/308 redirect দিন।
- https homepage, nested route, Bengali route, 404, favicon, social image ও sitemap খুলে দেখুন।
- mobile navigation, theme, search এবং contact message handoff production origin-এ চালিয়ে দেখুন।
- `_headers` সমর্থন না করলে equivalent security/cache headers server/CDN-এ configure করুন। CSS ও font URL-এ content hash আছে, তাই ফাইল পরিবর্তনে নতুন সংস্করণ লোড হয়। অন্য assets আপডেটের পরে cache purge করুন; দীর্ঘ immutable cache দেবেন না।
- Production account/certificate/DNS access ছাড়া এই source নিজে থেকে domain-এ প্রকাশ হয় না।

## SEO ও search submission

Canonical URL সব জায়গায় `https://subromart.com`। বাংলা ও ইংরেজিতে reciprocal `hreflang` আছে। কোনো API বা JavaScript execute না করেও crawler মূল কন্টেন্ট পড়তে পারে।

1. Google Search Console-এ Domain property যোগ করে account-এর দেওয়া DNS TXT দিয়ে verify করুন।
2. `https://subromart.com/sitemap.xml` submit করুন। URL Inspection দিয়ে homepage ও প্রয়োজনীয় service pages inspect করুন।
3. Bing Webmaster Tools-এ domain ও sitemap যুক্ত করুন।
4. Rich Results Test দিয়ে structured data ও social debugger দিয়ে share image যাচাই করুন।
5. বাস্তব product screenshot, delivery scope, case study ও অনুমতিপ্রাপ্ত client evidence পাওয়া গেলে content source-এ যুক্ত করুন। প্রতিটি পেজের তথ্য নিয়মিত হালনাগাদ রাখুন।

`robots.txt` public crawling অনুমোদন করে। search/compare utility pages `noindex, follow`। sitemap-এ ৭০টি স্থায়ী content URL আছে; search ও compare রাখা হয়নি। Image sitemap-এ social cover আছে। Favicon PNG 96×96, apple icon 180×180, logo 192/512 এবং Open Graph cover 1200×630 দেওয়া আছে।

Search inclusion, ranking, favicon display বা AI answer citation স্বয়ংক্রিয়ভাবে নিশ্চিত করা যায় না। Google-এর নির্দেশনা: [SEO developer guide](https://developers.google.com/search/docs/fundamentals/get-started-developers), [favicon guidelines](https://developers.google.com/search/docs/appearance/favicon-in-search), [structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)।

### Google সার্চের আইকন

সব পেজে একই স্থায়ী `/assets/favicon-96.png` (96×96) এবং `/favicon.ico` ঘোষণা আছে। দুটি ফাইলেই মূল brand mark আছে। Organization schema-তে 512×512 logo এবং WebSite schema-তে Subromart নাম দেওয়া আছে। Googlebot-Image যেন favicon/logo এবং Googlebot যেন homepage পড়তে পারে—hosting firewall/CDN-এ সেগুলো বন্ধ করবেন না।

Deploy করার পর `https://subromart.com/assets/favicon-96.png` ও `https://subromart.com/favicon.ico` সরাসরি খুলে দেখুন। Search Console-এর URL Inspection-এ `https://subromart.com/` দিয়ে Request indexing করুন এবং sitemap জমা দিন। লোকাল preview Google crawl করতে পারে না। Google-এর নির্দেশনা অনুযায়ী পুনরায় crawl/process হতে কয়েক দিন থেকে কয়েক সপ্তাহ লাগতে পারে; আইকন দেখানো Google-এর সিদ্ধান্ত।

### Poppins ও Kalpurush

সব text component একই font stack ব্যবহার করে: ইংরেজি অক্ষরে Poppins, বাংলা অক্ষর/যুক্তাক্ষর/দাঁড়িতে Kalpurush। Font files নিজের hosting থেকেই লোড হয়; Google Fonts connection বা JavaScript প্রয়োজন নেই। Apache-এর `.htaccess`-এ WOFF2 MIME type দেওয়া আছে। অন্য server-এ `.woff2` যেন `font/woff2` হিসেবে পরিবেশিত হয়।

লোকালি `npm run dev` দিয়ে `http://localhost:4173/` খুলুন; `dist/index.html`-এ double-click বা project root থেকে preview করলে `/assets/` URL সঠিক জায়গায় পৌঁছাবে না। Hosting-এর document root হবে `dist`-এর contents। Font ও search-icon পরীক্ষা চালাতে `node tests/fonts-seo.mjs`।

## Contact form

এটি static contact workflow। ফর্মের শেষে visitor review করে নিজে WhatsApp বা email পাঠান। কোনো message broker, email provider বা database যুক্ত নেই। Visitor-এর তথ্য browser storage-এ রাখা হয় না। Direct WhatsApp, telephone ও mailto links JavaScript ছাড়াও কাজ করে।

ভবিষ্যতে server submission চাইলে আলাদা endpoint, delivery provider, input validation ও error handling যোগ করতে হবে এবং privacy content actual behaviour অনুযায়ী আপডেট করতে হবে।

## Maintenance

Contact refresh: `npm run sync:profile`, তারপর `npm run build`। Script public profile-এর পরিচিত কাঠামো থেকে তথ্য পড়ে; remote JavaScript execute করে না। Refresh ব্যর্থ হলে verified snapshot থাকে।

Copy/version backup রেখে নতুন dist deploy করুন। Rollback-এর জন্য আগের complete dist archive সংরক্ষণ করুন। Build output-এর ZIP ready-to-upload deliverable হিসেবে ব্যবহারযোগ্য।

## AI discovery and concise content

Content is rendered as static HTML. Native `details` disclosures keep module descriptions in the original document and let visitors expand them without JavaScript. Catalogue pages provide `CollectionPage` and `ItemList` structured data. Detail pages identify their primary `Service` entity. The founder's `Person` identity is separate from the business `Organization`.

Robots, sitemap, canonical/hreflang links and the existing llms reference files are checked. The llms files are supplementary; crawler use is not guaranteed. Google's [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) points to ordinary SEO, crawlability and structured data matching visitor-accessible content; no special AI markup is required.
