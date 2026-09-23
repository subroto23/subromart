import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import sharp from 'sharp';

const base = process.env.TEST_URL || 'http://localhost:4173';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const page = await context.newPage();
const report = { checks: [], fonts: [], errors: [] };
page.on('pageerror', error => report.errors.push(error.message));
page.on('console', message => {
  if (message.type() === 'error') report.errors.push(message.text());
});
const pass = message => { report.checks.push(message); console.log('PASS: ' + message); };

async function fontsFor(selector) {
  const cdp = await context.newCDPSession(page);
  try {
    await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
    const { root } = await cdp.send('DOM.getDocument');
    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector });
    assert(nodeId, `Missing element: ${selector}`);
    return (await cdp.send('CSS.getPlatformFontsForNode', { nodeId })).fonts;
  } finally { await cdp.detach(); }
}

try {
  for (const [route, selector, expected] of [
    ['/', 'h1', 'Poppins'],
    ['/bn/', 'h1', 'Kalpurush'],
    ['/bn/', '.home-lead', 'Kalpurush'],
    ['/bn/', '.product-info h3', 'Kalpurush'],
    ['/solutions/', '.product-info h3', 'Poppins'],
    ['/bn/solutions/', '.product-info h3', 'Kalpurush'],
    ['/bn/solutions/school-management/', '.module-detail h3', 'Kalpurush'],
    ['/bn/contact/', 'label:has(input[name="name"])', 'Kalpurush'],
  ]) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const fonts = await fontsFor(selector);
    assert(fonts.some(font => font.isCustomFont && font.familyName.startsWith(expected)), `${route} ${selector}: ${JSON.stringify(fonts)}`);
    assert(fonts.every(font => font.isCustomFont && /^(Poppins|Kalpurush)/.test(font.familyName)), `Unexpected system font: ${JSON.stringify(fonts)}`);
    report.fonts.push({ route, selector, fonts });
  }
  pass('Actual hero, body, product cards, module titles and form labels use local Poppins/Kalpurush with no system-font fallback');

  // Exercise punctuation, conjuncts, digits and mixed script in the same font stack.
  await page.evaluate(() => {
    const probe = document.createElement('div');
    probe.id = 'font-regression-probe';
    probe.style.cssText = 'font:400 24px var(--font)';
    probe.textContent = 'ক্ষ জ্ঞ শ্র দায়িত্ব । ॥ ১২৩';
    document.body.append(probe);
  });
  await page.evaluate(() => document.fonts.ready);
  const bengali = await fontsFor('#font-regression-probe');
  assert(bengali.some(font => font.isCustomFont && font.familyName === 'Kalpurush'));
  assert(bengali.every(font => font.isCustomFont), JSON.stringify(bengali));
  report.fonts.push({ selector: 'Bengali punctuation and conjuncts', fonts: bengali });
  for (const weight of [400, 500, 600]) {
    await page.locator('#font-regression-probe').evaluate((element, weight) => {
      element.style.fontWeight = weight;
      element.textContent = 'Poppins Software 0123456789';
    }, weight);
    await page.evaluate(() => document.fonts.ready);
    const fonts = await fontsFor('#font-regression-probe');
    assert(fonts.length && fonts.every(font => font.isCustomFont && font.familyName.startsWith('Poppins')), JSON.stringify(fonts));
    report.fonts.push({ selector: `English weight ${weight}`, fonts });
  }
  await page.locator('#font-regression-probe').evaluate(element => element.remove());
  pass('Kalpurush conjuncts, Bengali digits and danda punctuation render locally; Poppins 400/500/600 render locally');

  const cssHref = await page.locator('link[rel="stylesheet"]').getAttribute('href');
  assert.match(cssHref, /^\/assets\/styles\.css\?v=[a-f0-9]{12}$/);
  const css = await (await context.request.get(base + cssHref)).text();
  const fontUrls = [...new Set([...css.matchAll(/url\(['"]?(\/assets\/fonts\/[^'")]+)/g)].map(match => match[1]))];
  assert.equal(fontUrls.length, 5);
  for (const url of fontUrls) {
    assert.match(url, /\.woff2\?v=[a-f0-9]{12}$/);
    const response = await context.request.get(base + url);
    assert.equal(response.status(), 200);
    assert.match(response.headers()['content-type'], /font\/woff2/);
    assert.equal((await response.body()).subarray(0, 4).toString(), 'wOF2');
  }
  for (const preload of await page.locator('link[as="font"]').evaluateAll(links => links.map(link => link.getAttribute('href')))) {
    assert(fontUrls.includes(preload), 'Preload must reuse the exact versioned CSS font URL');
  }
  pass('CSS and all five WOFF2 files use content-versioned URLs, correct MIME types and matching font preloads');

  const crawler = await browser.newContext({ userAgent: 'Googlebot-Image/1.0' });
  try {
    const png = await crawler.request.get(base + '/assets/favicon-96.png');
    assert.equal(png.status(), 200);
    assert.match(png.headers()['content-type'], /image\/png/);
    const pngBytes = await png.body();
    const metadata = await sharp(pngBytes).metadata();
    assert.equal(metadata.width, 96); assert.equal(metadata.height, 96);
    const ico = await crawler.request.get(base + '/favicon.ico');
    assert.equal(ico.status(), 200);
    assert.match(ico.headers()['content-type'], /image\/x-icon/);
    const icoBytes = await ico.body();
    assert.equal(icoBytes.readUInt16LE(2), 1);
    assert.equal(icoBytes.readUInt16LE(4), 1);
    assert.equal(icoBytes[6], 96); assert.equal(icoBytes[7], 96);
    assert.deepEqual(icoBytes.subarray(icoBytes.readUInt32LE(18)), pngBytes);
    const logo = await crawler.request.get(base + '/assets/logo-512.png');
    assert.equal(logo.status(), 200);
    const robots = await (await crawler.request.get(base + '/robots.txt')).text();
    assert.match(robots, /User-agent: \*\s+Allow: \//);
    assert(!/Disallow:\s*\//.test(robots));
    const home = await (await crawler.request.get(base + '/')).text();
    assert.match(home, /rel="icon" type="image\/png" sizes="96x96" href="\/assets\/favicon-96\.png"/);
    assert(home.includes('https://subromart.com/assets/logo-512.png'));
    assert(home.includes('"@type":"WebSite"'));
  } finally { await crawler.close(); }
  pass('Googlebot-Image can fetch matching square PNG/ICO favicons and Organization logo; homepage declares favicon and WebSite identity');

  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const plain = await nojs.newPage();
    await plain.goto(base + '/bn/solutions/', { waitUntil: 'networkidle' });
    assert(await plain.locator('.product-info h3').first().isVisible());
    assert(await plain.evaluate(async () => {
      await document.fonts.ready;
      return [...document.fonts].some(font => font.family === 'Kalpurush' && font.status === 'loaded');
    }));
  } finally { await nojs.close(); }
  pass('Bengali font loads on nested mobile pages with JavaScript disabled');
  assert.equal(report.errors.length, 0, report.errors.join('\n'));
} finally {
  await fs.writeFile('reports/fonts-seo-results.json', JSON.stringify(report, null, 2));
  await browser.close();
}
