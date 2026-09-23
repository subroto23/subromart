import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base=process.env.TEST_URL||'http://localhost:4173';
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},colorScheme:'light',reducedMotion:'reduce'});
const page=await context.newPage();
const report={checks:[],fonts:{},accessibility:[],screenshots:[]};
const pass=label=>{report.checks.push(label);console.log('PASS: '+label);};
async function go(route){await page.goto(base+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);}
async function audit(label){const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();report.accessibility.push({label,violations:result.violations});assert.equal(result.violations.length,0,label+': '+JSON.stringify(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))));pass(label+' accessibility');}
async function actualFonts(){const cdp=await context.newCDPSession(page);try{await cdp.send('DOM.enable');await cdp.send('CSS.enable');const {root}=await cdp.send('DOM.getDocument');const {nodeId}=await cdp.send('DOM.querySelector',{nodeId:root.nodeId,selector:'h1'});return (await cdp.send('CSS.getPlatformFontsForNode',{nodeId})).fonts.map(f=>({family:f.familyName,custom:f.isCustomFont,glyphs:f.glyphCount}));}finally{await cdp.detach();}}
try {
 await go('/');assert.equal(await page.locator('html').getAttribute('lang'),'en');
 assert.equal(await page.locator('link[hreflang="x-default"]').getAttribute('href'),'https://subromart.com/');
 report.fonts.en=await actualFonts();assert(report.fonts.en.some(f=>/^Poppins(?: |$)/.test(f.family)&&f.custom));
 await page.locator('.language-switch').click();assert.equal(new URL(page.url()).pathname,'/bn/');assert.equal(await page.locator('html').getAttribute('lang'),'bn');await page.evaluate(()=>document.fonts.ready);
 report.fonts.bn=await actualFonts();assert(report.fonts.bn.some(f=>f.family.toLowerCase()==='kalpurush'&&f.custom));pass('English default, Bengali switch and actual local Poppins/Kalpurush glyph rendering');
 await go('/solutions/?category=education&q=school');await page.locator('.language-switch').click();assert.equal(new URL(page.url()).pathname,'/bn/solutions/');assert.equal(new URL(page.url()).searchParams.get('category'),'education');assert.equal(new URL(page.url()).searchParams.get('q'),'school');pass('Language switch preserves the selected page and filters');
 const legacy=await context.request.get(base+'/en/solutions/?category=education',{maxRedirects:0});assert.equal(legacy.status(),301);assert.equal(legacy.headers().location,'/solutions/?category=education');
 for(const prefix of ['','/bn']){const response=await context.request.get(base+prefix+'/missing-page-redesign/');assert.equal(response.status(),404);assert((await response.text()).includes(`<html lang="${prefix?'bn':'en'}"`));}pass('Legacy English redirects preserve queries and missing pages return a localized HTTP 404');
 await go('/');for(const [mode,color,label] of [['light','#ffffff','White custom accent'],['light','#1133aa','Dark blue custom accent'],['dark','#d1f36b','English dark mode']]){await page.evaluate(({mode,color})=>window.SubromartTheme.apply({mode,color}),{mode,color});await audit(label);}
 await page.evaluate(()=>window.SubromartTheme.reset());
 await go('/solutions/school-management/');
 assert.equal(await page.locator('.module-detail').count(),6);
 const module=page.locator('.module-detail').first();
 assert(!(await module.locator('p').isVisible()));
 await module.locator('summary').focus();await page.keyboard.press('Enter');
 assert(await module.locator('p').isVisible());await audit('Expanded module details');
 await page.keyboard.press('Enter');assert(!(await module.locator('p').isVisible()));
 const nojs=await browser.newContext({javaScriptEnabled:false});
 const plain=await nojs.newPage();await plain.goto(base+'/bn/solutions/school-management/');
 await plain.locator('.module-detail summary').first().click();assert(await plain.locator('.module-detail p').first().isVisible());
 await plain.locator('.delivery-details summary').click();assert(await plain.locator('.delivery-details ol').isVisible());
 await nojs.close();pass('Feature and setup disclosures work with keyboard and without JavaScript in Bengali');
 for(const [name,route,width,height] of [['home-en-mobile','/',390,844],['home-en-tablet','/',768,1000],['home-bn-mobile','/bn/',390,844],['home-en-desktop','/',1440,1000],['services-desktop','/services/',1440,1000],['product-desktop','/solutions/school-management/',1440,1000],['pricing-desktop','/pricing/',1440,1000],['contact-mobile','/contact/',390,844]]){
  await page.setViewportSize({width,height});await go(route);
  // Load lazy images throughout each page before a full-page capture.
  await page.locator('img[loading="lazy"]').evaluateAll(images=>images.forEach(i=>i.loading='eager'));
  await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
  const imagePath=`reports/redesign-${name}.png`;await page.screenshot({path:imagePath,fullPage:true});report.screenshots.push(imagePath);
  if(['services-desktop','product-desktop','pricing-desktop','contact-mobile'].includes(name))await audit(name);
 }
 pass('Captured eight redesigned views with loaded images across desktop, tablet and mobile');
} finally {
 await fs.writeFile('reports/redesign-results.json',JSON.stringify(report,null,2));await browser.close();
}
