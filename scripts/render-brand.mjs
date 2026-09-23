// Render the social card with the same local Poppins font and brand mark as the site.
import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1,colorScheme:'light'});
 await page.setContent(`<!doctype html><html lang="en"><head><base href="http://localhost:4173/"><link rel="stylesheet" href="/assets/styles.css"><style>
 html,body{width:1200px;height:630px;margin:0;padding:0;overflow:hidden;background:#fff;color:#202020;font-family:Poppins,sans-serif}
 .cover{padding:54px 65px}.cover-brand{display:flex;align-items:center;gap:12px;font-size:29px;font-weight:600;letter-spacing:-1px}.cover-mark{display:grid;place-items:center;width:46px;height:46px;border-radius:5px;background:#d1f36b}.cover-mark img{width:40px;filter:brightness(0)}
 .cover-kicker{margin:52px 0 22px;font-size:12px;letter-spacing:2px;color:#626262}.cover h1{font-size:62px;font-weight:400;line-height:1.2;letter-spacing:-2px;margin:0 0 34px}.cover h1 span{color:#62713b;font-weight:500}
 .cover-bottom{border-top:1px solid #ddd;padding-top:22px;display:flex;align-items:center;justify-content:space-between}.cover-bottom p{font-size:14px;color:#626262;margin:0}.cover-bottom span{font-size:13px}.cover-services{position:absolute;right:65px;top:210px;width:260px}.cover-services p{font-size:16px;border-top:1px solid #ddd;padding:18px 0;margin:0}.cover-services small{font-size:10px;color:#626262;margin-right:17px}
 </style></head><body><main class="cover"><div class="cover-brand"><span class="cover-mark"><img src="/assets/logo.svg" alt=""></span>subromart.</div><p class="cover-kicker">SOFTWARE DEVELOPMENT & ONGOING CARE</p><h1>Your software.<br>Our<br><span>responsibility.</span></h1><div class="cover-services"><p><small>01</small>Business software</p><p><small>02</small>Websites & platforms</p><p><small>03</small>Mobile applications</p><p><small>04</small>Maintenance & support</p></div><div class="cover-bottom"><p>Business software. Websites. Apps. Ongoing care.</p><span>subromart.com ↗</span></div></main></body></html>`,{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 await fs.mkdir('src/assets',{recursive:true});
 await page.screenshot({path:'src/assets/og-cover.png'});
 console.log('Rendered 1200 × 630 social image with local Poppins and the original brand mark.');
} finally { await browser.close(); }
