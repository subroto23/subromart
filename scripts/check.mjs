import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { pages } from '../src/data/content.mjs';
import { href } from '../src/ui.mjs';
const root=path.resolve('dist');
assert.equal(href('','en'),'/','English must be the default root language');
assert.equal(href('','bn'),'/bn/','Bengali must use the /bn/ prefix');
let links=0,documents=0;const errors=[];
for(const lang of ['bn','en'])for(const page of pages){
 const route=href(page.slug,lang),file=path.join(root,route,'index.html');
 const html=await fs.readFile(file,'utf8');documents++;
 const check=(yes,message)=>{if(!yes)errors.push(route+': '+message);};
 check((html.match(/<h1(?:\s|>)/g)||[]).length===1,'Expected exactly one h1');
 check(html.includes(`<html lang="${lang}"`),'Incorrect language');
 check(html.includes(`<link rel="canonical" href="https://subromart.com${route}"`),'Incorrect canonical');
 check(html.includes('hreflang="en"')&&html.includes('hreflang="bn-BD"'),'Missing hreflang');
 check(html.includes(`<link rel="alternate" hreflang="x-default" href="https://subromart.com${href(page.slug,'en')}"`),'Default language alternate is not English');
 check(html.includes('og:image')&&html.includes('application/ld+json'),'Missing structured metadata');
 check(html.includes('<link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon-96.png">'),'Missing stable, square PNG search favicon');
 check(html.includes('href="/favicon.ico"'),'Missing root browser favicon');
 check(!/REPLACE_WITH|TODO|lorem ipsum|example\.com/i.test(html),'Placeholder in public HTML');
 const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(x=>x[1]);check(new Set(ids).size===ids.length,'Duplicate IDs');
 for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){
  try{
   const graph=JSON.parse(match[1])['@graph'];
   const founder=graph.find(item=>item['@type']==='Person');
   const organization=graph.find(item=>item['@type']==='Organization');
   check(organization?.founder?.['@id']===founder?.['@id'],'Organization must link its founder');
   check(founder?.worksFor?.['@id']===organization?.['@id'],'Founder must link Subromart');
   check(founder?.sameAs?.includes('https://me.subromart.com'),'Founder must link the original professional profile');
   check(!organization?.sameAs?.includes('https://me.subromart.com'),'A personal profile must not identify the business');
   if(page.kind==='subroto-das'){
    const profile=graph.find(item=>item['@type']==='ProfilePage');
    check(profile?.mainEntity?.['@id']===founder?.['@id'],'ProfilePage must identify Subroto Das');
    check(html.includes('<h1>Subroto Das'),'Founder identity must be visible');
    check(profile?.primaryImageOfPage?.url===founder.image,'Founder profile must use the portrait');
   }
   if(page.kind==='guide'){
    const article=graph.find(item=>item['@type']==='Article');
    check(article?.author?.['@id']===organization?.['@id'],'Guide author must match the visible editorial byline');
   }
   if(['solutions','services'].includes(page.kind)){
    const list=graph.find(item=>item['@type']==='ItemList');
    const entries=pages.filter(item=>item.kind===(page.kind==='solutions'?'product':'service'));
    check(list?.numberOfItems===entries.length,'Catalogue schema must describe every listed service');
    for(const entry of entries)check(list?.itemListElement.some(item=>item.item.url==='https://subromart.com'+href(entry.slug,lang)),'Catalogue schema omits a service URL');
   }
   if(['product','service'].includes(page.kind)){
    const entity=graph.find(item=>item['@type']==='Service');
    const document=graph.find(item=>item['@id']==='https://subromart.com'+route+'#page');
    check(document?.mainEntity?.['@id']===entity?.['@id'],'Page must identify its main service entity');
   }
  }catch{errors.push(route+': Invalid JSON-LD');}
 }
 if(page.kind==='product'){
  check((html.match(/<details class="module-detail"/g)||[]).length===page.item.features.length,'Feature modules missing from server-rendered HTML');
  check(html.includes('class="delivery-details"'),'Setup and support information missing');
 }
 if(page.kind==='client-care')check(html.includes(`/assets/downloads/project-checklist-${lang}.txt`),'Missing localized project checklist');
 for(const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)){
  const url=match[1];if(!url.startsWith('/')||url.startsWith('//'))continue;
  const pathname=url.split(/[?#]/)[0];if(!pathname)continue;
  let target=path.join(root,decodeURIComponent(pathname));
  try{const info=await fs.stat(target);if(info.isDirectory())target=path.join(target,'index.html');await fs.access(target);links++;}catch{errors.push(route+': Missing internal target '+url);}
 }
}
for(const file of ['sitemap.xml','robots.txt','llms.txt','llms-full.txt','site.webmanifest','404.html','favicon.ico'])await fs.access(path.join(root,file));
const sitemap=await fs.readFile(path.join(root,'sitemap.xml'),'utf8');assert(sitemap.includes('xmlns:xhtml='));assert(sitemap.includes('xmlns:image='));
const indexed=pages.filter(p=>!['search','compare'].includes(p.kind));
const locations=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(locations.length,indexed.length*2,'Unexpected sitemap URL count');
for(const page of indexed)for(const lang of ['en','bn'])assert(locations.includes('https://subromart.com'+href(page.slug,lang)),'Missing sitemap language route');
const manifest=JSON.parse(await fs.readFile(path.join(root,'site.webmanifest'),'utf8'));assert.equal(manifest.lang,'en');
assert.equal(errors.length,0,errors.join('\n'));
console.log(`PASS: ${documents} bilingual pages, ${links} internal references, titles, headings, IDs, canonical/hreflang, JSON-LD and SEO assets.`);
