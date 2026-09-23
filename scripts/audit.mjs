// Lighthouse is an optional, isolated CLI audit, not a project or production dependency.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
const exec=promisify(execFile);
await fs.mkdir('reports',{recursive:true});
const summary=[];
const env={...process.env};
if(!env.CHROME_PATH){try{await fs.access('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');env.CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';}catch{}}
for(const [name,url,desktop]of [['mobile-en','http://localhost:4173/',false],['mobile-bn','http://localhost:4173/bn/',false],['desktop-en','http://localhost:4173/',true]]){
 const prefix=`reports/lighthouse-${name}`;
 await exec(process.platform==='win32'?'npx.cmd':'npx',['--yes','lighthouse@12.6.1',url,'--chrome-flags=--headless --no-sandbox','--only-categories=performance,accessibility,best-practices,seo','--output=html','--output=json',`--output-path=${prefix}`,'--quiet',...(desktop?['--preset=desktop']:[])],{env,maxBuffer:8*1024*1024});
 for(const ext of ['html','json'])await fs.rename(`${prefix}.report.${ext}`,`${prefix}.${ext}`);
 const lhr=JSON.parse(await fs.readFile(`${prefix}.json`,'utf8'));
 const audit={name,url,lighthouseVersion:lhr.lighthouseVersion,scores:Object.fromEntries(Object.entries(lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),metrics:Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index'].map(k=>[k,lhr.audits[k].displayValue])),issues:Object.values(lhr.audits).filter(a=>a.score!==null&&a.score<.9&&a.details).map(a=>({id:a.id,title:a.title,value:a.displayValue}))};
 summary.push(audit);console.log(JSON.stringify(audit,null,2));
}
await fs.writeFile('reports/lighthouse-summary.json',JSON.stringify(summary,null,2));
