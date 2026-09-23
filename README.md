# Subromart

সফটওয়্যার সলিউশন ও সেবার পূর্ণাঙ্গ বাংলা–ইংরেজি ওয়েবসাইট। **৩৭টি স্বতন্ত্র পেজ, দুই ভাষায় ৭৪টি HTML পেজ**, সঙ্গে 404 পেজ। ওয়েবসাইটে কোনো frontend framework বা runtime package dependency নেই—সরাসরি HTML, CSS ও JavaScript।

## চালু করুন

Node.js 20 বা পরবর্তী সংস্করণে:

```sh
npm run dev
```

ব্রাউজারে `http://localhost:4173` খুলুন। ডিফল্ট ইংরেজি `/`, বাংলা `/bn/`। পুরোনো `/en/` লিংক নতুন ইংরেজি ঠিকানায় redirect হয়। অন্য পোর্ট ব্যবহার করতে `PORT=8080 npm run dev`।

```sh
npm run build   # src থেকে dist তৈরি
npm run start   # আগে তৈরি dist লোকালি চালু
npm run check   # ৭৪ পেজের লিংক, অ্যাসেট, metadata ও HTML পরীক্ষা
```

সাইট বিল্ড/চালাতে `npm install` প্রয়োজন নেই। ব্রাউজার পরীক্ষা ও asset tooling-এর জন্য `npm ci` করতে হবে।

সংক্ষিপ্ত ডিজাইনে হিরোর ছোট শিরোনাম ও তিন ডিভাইসের প্রিভিউ আছে। নিচে সেবার লিংক, তিনটি সলিউশন ও তিনটি মূল সুবিধা। ফিচার ও সেটআপের বিস্তারিত খুলে পড়া যায়, JavaScript ছাড়াও। সাদা, চারকোল ও নির্বাচিত থিম রঙের শেড রাখা হয়েছে।

## কী আছে

- স্কুল, EdTech, healthcare, e-commerce, ERP, CRM, restaurant/POS ও HR/payroll সলিউশন।
- কাস্টম সফটওয়্যার, ওয়েব, মোবাইল, frontend, backend, UI/UX, maintenance, cloud ও integration-এর আলাদা সেবা পেজ।
- কাজের গ্যালারি, পরিচিতি, কাজের প্রক্রিয়া, engagement plans, FAQ, ৩টি বিস্তারিত গাইড।
- মোবাইলে bottom tab bar ও keyboard-accessible drawer।
- light/dark/device-auto mode, ৫টি skin, নিজের রং, reduced-motion এবং preference persistence।
- ল্যাপটপ, ট্যাব ও মোবাইলে dashboard preview; preview pause ও solution/device switching।
- ক্যাটাগরি ও টেক্সট ফিল্টার, বাংলা–ইংরেজি পূর্ণ কন্টেন্ট সার্চ, ৩টি সলিউশন তুলনা ও shareable comparison URL।
- contact/demo form, ৩-ধাপের project planner, validation, বার্তা review/edit/copy/download, WhatsApp ও email handoff।
- draggable WhatsApp, keyboard repositioning, responsive bounds ও reset।
- প্রতিটি ভাষায় static HTML, canonical/hreflang, Organization/Person/Service/Article/FAQ/Breadcrumb JSON-LD, Open Graph image, favicon, manifest, robots.txt, sitemap.xml, llms.txt ও llms-full.txt।

## গুরুত্বপূর্ণ আচরণ

ফর্ম তথ্য **স্বয়ংক্রিয়ভাবে পাঠায় না** এবং কোনো backend inbox নেই। বার্তা ব্রাউজারেই তৈরি হয়; visitor যাচাই করে WhatsApp বা email অ্যাপে নিজে পাঠান। Demo request কোনো confirmed appointment নয়। Checkout বা payment gateway নেই; এই সাইট quotation ও যোগাযোগের জন্য তৈরি।

প্রিভিউগুলো sample data-সহ ধারণামূলক UI। বিক্রির সলিউশনের চূড়ান্ত scope, feature, licence ও মূল্য আলোচনা করে নির্ধারণযোগ্য। Portfolio-তে প্রতিষ্ঠাতার পেশাগত কাজের সঠিক attribution রাখা হয়েছে; অন্য প্রতিষ্ঠানের কাজকে Subromart-এর বিক্রির প্রোডাক্ট বলা হয়নি।

## কন্টেন্ট পরিবর্তন

| ফাইল | কাজ |
| --- | --- |
| `src/data/content.mjs` | সব সলিউশন, সেবা, FAQ, guide, page titles/descriptions |
| `src/data/profile.json` | প্রতিষ্ঠাতার verified contact snapshot |
| `src/pages.mjs` | পেজের HTML layout |
| `src/home.mjs` | সেবা ও সুবিধাভিত্তিক নতুন হোমপেজ |
| `src/data/product-details.mjs` | ৮টি সলিউশনের ৪৮টি নির্দিষ্ট ফিচার বর্ণনা |
| `src/data/short-copy.mjs` | সংক্ষিপ্ত পেজ শিরোনাম, সলিউশন ও সেবার বর্ণনা |
| `src/ui.mjs` | icons, dashboard previews, common components |
| `src/shell.mjs` | navigation, footer, dialogs ও SEO metadata |
| `src/forms.mjs` | contact/demo/project-planner form |
| `src/editorial.mjs` | about, privacy, terms, accessibility content |
| `src/assets/styles.css` | মূল component styles |
| `src/assets/editorial.css` | নতুন সাদা–চারকোল–থিম রঙের responsive design |
| `src/assets/theme-init.js` | প্রথম paint-এর আগে থিম প্রয়োগ |
| `src/assets/app.js` | interaction, search, compare, forms, drag |

`bi('English', 'বাংলা')` দিয়ে bilingual content রাখা হয়েছে। পরিবর্তনের পরে `npm run build` চালান। `dist` generated output; সরাসরি সেখানে পরিবর্তন করলে পরের build-এ প্রতিস্থাপিত হবে।

### প্রোফাইলের তথ্য হালনাগাদ

লোগো, ছবি, email, phone ও social link `https://me.subromart.com` থেকে নেওয়া। `src/data/profile.json`-এ source ও সংগ্রহের তারিখ আছে। যোগাযোগের snapshot আপডেট করতে:

```sh
node scripts/sync-profile.mjs --check
npm run sync:profile
npm run build
```

স্ক্রিপ্ট তৃতীয় পক্ষের JavaScript execute করে না। কাঠামো বদলে গেলে বা validation ব্যর্থ হলে বর্তমান verified তথ্য রেখে দেয়। Live browser থেকে cross-origin profile fetch করা হয় না, তাই CORS বা profile downtime-এ যোগাযোগ নষ্ট হবে না। লোগোর মূল SVG অপরিবর্তিতভাবে `src/assets/logo.svg`-এ আছে; favicon-এ পড়ার সুবিধায় গাঢ় background যোগ হয়েছে।

## subromart.com-এ প্রকাশ

1. `npm run build` চালান।
2. **`dist/`-এর ভেতরের সব ফাইল** hosting-এর document root/public_html-এ আপলোড করুন। শুধু `index.html` নয়।
3. subromart.com-এর DNS নির্বাচিত hosting-এ নির্দেশ করুন ও HTTPS চালু করুন। `www` থাকলে মূল domain-এ permanent redirect দিন।
4. Apache/cPanel-এর জন্য `.htaccess`, Cloudflare Pages/Netlify-এর জন্য `_headers` ও `_redirects` দেওয়া আছে। অন্য সার্ভারে equivalent headers ও custom 404 সেট করুন। SPA catch-all rewrite দেবেন না—এটি সত্যিকারের multi-page site।
5. Google Search Console/Bing Webmaster-এ domain verification শেষে `https://subromart.com/sitemap.xml` submit করুন। Search Console verification token এখানে বানিয়ে দেওয়া হয়নি; আপনার account থেকে নিতে হবে।

Deploy-ready ZIP থাকলে সেটি document root-এ extract করতে পারেন। Local Node server শুধু preview-এর জন্য। এই কাজ DNS বা production hosting পরিবর্তন করেনি।

SEO structure ও crawler-readable content ranking-এর সহায়ক; প্রথম অবস্থান, indexing, favicon display বা AI citation নিশ্চিত করার কোনো উপায় নেই। `llms.txt` একটি অতিরিক্ত তথ্যসূত্র; কোনো crawler সেটি গ্রহণ করবে এমন নিশ্চয়তা নয়। বিস্তারিত checklist: [DEPLOYMENT.md](DEPLOYMENT.md)।

## পরীক্ষা

```sh
npm ci
npm run check
npm test
node tests/smoke.mjs
node tests/redesign.mjs
node scripts/audit.mjs
```

পরীক্ষার আগে `npm run start` চালু রাখুন। Lighthouse audit আলাদা `npx` CLI হিসেবে চলে; প্রথমবার এতে ইন্টারনেট প্রয়োজন হতে পারে। Lighthouse সাইট বা project dependency নয়। Browser tests default-এ installed Chrome ব্যবহার করে। `BROWSER_CHANNEL=chromium npm test` ব্যবহার করলে Playwright Chromium আগে install করতে হবে। Tests কোনো WhatsApp/email message পাঠায় না। Output `reports/`-এ; সংক্ষিপ্ত ফল [reports/TEST-REPORT.md](reports/TEST-REPORT.md)। Lighthouse স্কোর local lab measurement; production hosting, network ও device-এ ফল আলাদা হতে পারে।

## Assets

Poppins (ইংরেজি) ও Kalpurush (বাংলা) fonts স্থানীয় WOFF2 হিসেবে পরিবেশিত। SIL Open Font License-এর কপি `src/assets/fonts/`-এ। Profile image-এর WebP derivative, favicon sizes ও social cover-ও স্থানীয়। কোনো advertising tracker বা external font request নেই।

কার্ড, শিরোনাম, ফর্ম ও বাংলা দাঁড়ি চিহ্নেও একই font stack প্রযোজ্য। CSS/font URL content hash দিয়ে আপডেট হয়, ফলে পুরোনো cached font styling আটকে থাকে না। `dist/index.html` double-click না করে উপরের local server ব্যবহার করুন। `node tests/fonts-seo.mjs` আসল rendered fonts, nested routes, PNG/ICO favicon ও crawler access যাচাই করে।

Gallery preview আবার তৈরি করতে local server চালিয়ে `node scripts/render-previews.mjs`, তারপর `npm run build` চালান। সামাজিক শেয়ার ছবির জন্য `node scripts/render-brand.mjs`। অন্য image derivatives-এর জন্য `node scripts/prepare-assets.mjs`। পরে আবার build করুন।
# subromart
