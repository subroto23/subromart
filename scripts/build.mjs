import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { pages, products, services, bi } from '../src/data/content.mjs';
import { renderPage } from '../src/pages.mjs';
import { shell } from '../src/shell.mjs';
import { stylesheet } from '../src/asset-paths.mjs';
import { projectChecklist } from '../src/trust.mjs';
import { dashboard, demoConfig, profile, tr, href, esc } from '../src/ui.mjs';

const out=path.resolve('dist');
const themeHash=createHash('sha256').update(await fs.readFile('src/assets/theme-init.js','utf8')).digest('base64');
const gaHash=createHash('sha256').update(await fs.readFile('src/assets/ga-init.js','utf8')).digest('base64');
const clarityHash=createHash('sha256').update(await fs.readFile('src/assets/clarity-init.js','utf8')).digest('base64');
await fs.rm(out,{recursive:true,force:true});
await fs.mkdir(out,{recursive:true});
await fs.mkdir(path.join(out,'assets'),{recursive:true});
const copyAssets=async(dir,target)=>{await fs.mkdir(target,{recursive:true});for(const entry of await fs.readdir(dir,{withFileTypes:true})){if(entry.isDirectory())await copyAssets(path.join(dir,entry.name),path.join(target,entry.name));else if(!entry.name.endsWith('.ttf')&&!/^(hind-|manrope-|Hind|Manrope)/.test(entry.name)&&!['subroto-das.png','editorial.css'].includes(entry.name))await fs.copyFile(path.join(dir,entry.name),path.join(target,entry.name));}};
await copyAssets('src/assets',path.join(out,'assets'));
await fs.writeFile(path.join(out,'assets/styles.css'),stylesheet);
// A standard root favicon for browsers/crawlers that request /favicon.ico.
// ICO supports PNG payloads; use the same 96px brand artwork as the primary icon.
const favicon=await fs.readFile('src/assets/favicon-96.png');
const ico=Buffer.alloc(22);
ico.writeUInt16LE(1,2);ico.writeUInt16LE(1,4);
ico[6]=96;ico[7]=96;ico.writeUInt16LE(1,10);ico.writeUInt16LE(32,12);
ico.writeUInt32LE(favicon.length,14);ico.writeUInt32LE(22,18);
await fs.writeFile(path.join(out,'favicon.ico'),Buffer.concat([ico,favicon]));
await fs.mkdir(path.join(out,'assets/downloads'),{recursive:true});
for(const lang of ['en','bn'])await fs.writeFile(path.join(out,`assets/downloads/project-checklist-${lang}.txt`),projectChecklist(lang));
const bodies=new Map();
for(const lang of ['bn','en'])for(const page of pages){const body=renderPage(page,lang);bodies.set(lang+':'+page.slug,body);const file=path.join(out,href(page.slug,lang),'index.html');await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,shell(page,lang,body));}
const strip=s=>s.replace(/<[^>]+>/g,' ').replace(/&[^;]+;/g,' ').replace(/\s+/g,' ').trim();
for(const lang of ['bn','en']){
 const data={profile:{email:profile.email,whatsapp:profile.whatsapp},products:products.map(p=>({id:p.id,name:p.name,label:tr(p.label,lang),audience:tr(p.audience,lang),features:p.features.map(f=>tr(f,lang)),integrations:tr(p.integrations,lang)})),previews:Object.fromEntries(Object.entries(demoConfig).map(([key,config])=>[key,{name:config.name,full:dashboard(key,lang),tablet:dashboard(key,lang,'tablet'),mobile:dashboard(key,lang,'mobile')}])),search:pages.filter(p=>!['search','compare'].includes(p.kind)).map(p=>({title:tr(p.title,lang),description:tr(p.description,lang),url:href(p.slug,lang),category:p.kind==='product'?tr(bi('Solution','সলিউশন'),lang):p.kind==='service'?tr(bi('Service','সেবা'),lang):p.kind==='guide'?tr(bi('Guide','গাইড'),lang):'Subromart',search:(strip(bodies.get('bn:'+p.slug))+' '+strip(bodies.get('en:'+p.slug))+' '+p.slug).toLocaleLowerCase()}))};
 await fs.writeFile(path.join(out,`assets/data-${lang}.json`),JSON.stringify(data));
}
const notFound={slug:'404',title:bi('Page not found','পেজ পাওয়া যায়নি'),description:bi('Find your way back to Subromart software solutions and services.','Subromart-এর সফটওয়্যার সলিউশন ও সেবায় ফিরে যান।'),kind:'404'};
await fs.writeFile(path.join(out,'404.html'),shell(notFound,'en',renderPage(notFound,'en')));
await fs.mkdir(path.join(out,'bn/404'),{recursive:true});await fs.writeFile(path.join(out,'bn/404/index.html'),shell(notFound,'bn',renderPage(notFound,'bn')));
const xmlEsc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const pageImage=p=>p.kind==='subroto-das'?'<image:image><image:loc>https://subromart.com/assets/subroto-das.webp</image:loc><image:title>Subroto Das, founder of Subromart</image:title></image:image>':'';
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${pages.filter(p=>p.kind!=='search'&&p.kind!=='compare').flatMap(p=>['bn','en'].map(lang=>`  <url><loc>https://subromart.com${href(p.slug,lang)}</loc>${['bn','en'].map(l=>`<xhtml:link rel="alternate" hreflang="${l==='bn'?'bn-BD':'en'}" href="https://subromart.com${href(p.slug,l)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="https://subromart.com${href(p.slug,'en')}"/>${pageImage(p)}${!p.slug?'<image:image><image:loc>https://subromart.com/assets/og-cover.png</image:loc><image:title>Subromart software development and business solutions</image:title></image:image>':''}</url>`)).join('\n')}\n</urlset>`;
await fs.writeFile(path.join(out,'sitemap.xml'),sitemap);
await fs.writeFile(path.join(out,'robots.txt'),'User-agent: *\nAllow: /\n\nSitemap: https://subromart.com/sitemap.xml\n');
await fs.writeFile(path.join(out,'CNAME'),'subromart.com\n');
await fs.writeFile(path.join(out,'site.webmanifest'),JSON.stringify({id:'/',name:'Subromart — Software & Services',short_name:'Subromart',description:tr(pages[0].description,'en'),start_url:'/',scope:'/',display:'standalone',background_color:'#ffffff',theme_color:'#d1f36b',lang:'en',icons:[{src:'/assets/logo-192.png',sizes:'192x192',type:'image/png',purpose:'any'},{src:'/assets/logo-512.png',sizes:'512x512',type:'image/png',purpose:'any'}]},null,2));
const llms=`# Subromart\n\n> Subromart provides software development, configurable business solutions and ongoing maintenance. Based in Dhaka, Bangladesh, with Bengali and English website content.\n\n## Identity\n\n- Website: https://subromart.com/\n- Founder and CEO: Subroto Das\n- Founder at Subromart: https://subromart.com/subroto-das/\n- Professional portfolio and contact source: https://me.subromart.com/\n- Engineering learning resource: https://systems.subromart.com/\n- Email: ${profile.email}\n- WhatsApp: ${profile.whatsapp}\n\nSubromart (subromart.com) is distinct from other similarly spelled brands. Systems Hub is the founder's personal engineering learning platform; it is not a customer login portal.\n\n## Solutions\n\n${products.map(p=>`- [${p.name}: ${p.label.en}](https://subromart.com/solutions/${p.id}/): ${p.description.en}`).join('\n')}\n\n## Services\n\n${services.map(s=>`- [${s.title.en}](https://subromart.com/services/${s.id}/): ${s.description.en}`).join('\n')}\n\n## Helpful pages\n\n- [Client care and project checklist](https://subromart.com/client-care/)\n- [E-commerce planning guide](https://subromart.com/resources/ecommerce-website-checklist/)\n- [How we work](https://subromart.com/how-we-work/)\n- [Pricing and engagement](https://subromart.com/pricing/)\n- [Frequently asked questions](https://subromart.com/faq/)\n- [Contact](https://subromart.com/contact/)\n- [Project planner](https://subromart.com/project-planner/)\n- [Sitemap](https://subromart.com/sitemap.xml)\n- [Full text](https://subromart.com/llms-full.txt)\n\n## Factual boundaries\n\nSolution dashboards use illustrative sample data, not real customer records. Scope, availability, price, licensing, support coverage and delivery dates are agreed in a written proposal. The work section attributes the founder's professional experience and engineering resources; employer projects are not advertised as Subromart client commissions or products for resale. There is no online checkout. Contact forms prepare a message locally, then let the visitor choose to send through WhatsApp or email.\n\n## Languages\n\nEnglish is the default at / and Bengali is available at /bn/. Both language versions are static HTML with canonical and hreflang links. Feature and setup details use native HTML details elements: visitors can expand them, and the full text is present in the original HTML.\n`;
await fs.writeFile(path.join(out,'llms.txt'),llms);
await fs.writeFile(path.join(out,'llms-full.txt'),llms+'\n\n'+pages.filter(p=>!['search','compare'].includes(p.kind)).map(p=>'## '+p.title.en+'\nURL: https://subromart.com'+href(p.slug,'en')+'\n\n'+strip(bodies.get('en:'+p.slug))).join('\n\n'));
await fs.writeFile(path.join(out,'humans.txt'),`Subromart\nFounder & CEO: ${profile.name}\nContact: ${profile.email}\nLocation: ${profile.location}\nLanguages: Bengali, English\nBuilt with semantic HTML, CSS and vanilla JavaScript.\n`);
await fs.writeFile(path.join(out,'_headers'),`/*\n  Cache-Control: public, max-age=0, must-revalidate\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: default-src 'self'; script-src 'self' 'sha256-${themeHash}' 'sha256-${gaHash}' 'sha256-${clarityHash}' https://www.googletagmanager.com https://www.clarity.ms; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.googletagmanager.com; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'\n/assets/*\n  Cache-Control: public, max-age=3600, must-revalidate\n`);
await fs.writeFile(path.join(out,'.htaccess'),`Options -Indexes\nDirectoryIndex index.html\n<IfModule mod_rewrite.c>\nRewriteEngine On\nRewriteRule ^en/?$ / [R=301,L]\nRewriteRule ^en/(.*)$ /$1 [R=301,L]\n</IfModule>\nErrorDocument 404 /404.html\n<IfModule mod_mime.c>\nAddType font/woff2 .woff2\nAddType image/x-icon .ico\n</IfModule>\n<IfModule mod_headers.c>\n<FilesMatch "\\.html$">\nHeader set Cache-Control "no-cache"\n</FilesMatch>\nHeader always set X-Content-Type-Options "nosniff"\nHeader always set Referrer-Policy "strict-origin-when-cross-origin"\nHeader always set X-Frame-Options "DENY"\n</IfModule>\n<IfModule mod_deflate.c>\nAddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml text/plain application/xml\n</IfModule>\n`);
await fs.writeFile(path.join(out,'_redirects'),'/en/ / 301\n/en/* /:splat 301\n');
console.log(`Built ${pages.length} pages × 2 languages (${pages.length*2} HTML pages), 404 pages, sitemap, metadata and local assets in dist/.`);
