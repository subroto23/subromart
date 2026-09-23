// Rasterise our own HTML dashboard thumbnails once, keeping the gallery DOM small.
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import { dashboard, demoConfig } from '../src/ui.mjs';
const browser=await chromium.launch({channel:'chrome',headless:true});
await fs.mkdir('src/assets/previews',{recursive:true});
try{
 const page=await browser.newPage({viewport:{width:360,height:245},deviceScaleFactor:2,colorScheme:'light'});
 for(const lang of ['bn','en'])for(const type of Object.keys(demoConfig)){
  await page.setContent(`<!doctype html><html lang="${lang}"><head><base href="http://localhost:4173/"><link rel="stylesheet" href="/assets/styles.css"><style>html,body{width:360px;height:245px;margin:0;padding:0;overflow:hidden;scrollbar-gutter:auto}body{background:#fff}.snapshot{height:245px;width:360px}</style></head><body><div class="snapshot">${dashboard(type,lang,'card')}</div></body></html>`,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const png=await page.screenshot();
  await sharp(png).webp({quality:86}).toFile(`src/assets/previews/${type}-${lang}.webp`);
 }
 console.log('Generated 10 local dashboard thumbnails from the website’s own HTML.');
}finally{await browser.close();}
