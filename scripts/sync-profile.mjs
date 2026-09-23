/** Update the public contact snapshot without evaluating third-party JavaScript. */
import fs from 'node:fs/promises';
const origin='https://me.subromart.com';
const file=new URL('../src/data/profile.json',import.meta.url);
const current=JSON.parse(await fs.readFile(file,'utf8'));
const fetchText=async url=>{const response=await fetch(url,{signal:AbortSignal.timeout(20000)});if(!response.ok)throw Error(`${response.status} fetching ${url}`);return response.text();};
try{
 const html=await fetchText(origin+'/');
 const script=[...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/g)].map(m=>new URL(m[1],origin)).find(u=>u.origin===origin&&/^\/assets\/index-[\w-]+\.js$/.test(u.pathname));
 if(!script)throw Error('The profile asset structure changed. Existing verified data was preserved.');
 const source=await fetchText(script.href);
 const start=source.indexOf('name:"Subroto Das"');
 if(start<0)throw Error('The expected public profile object was not found. Existing data was preserved.');
 const snippet=source.slice(start,start+2000);
 const stringFor=key=>snippet.match(new RegExp('(?:^|[,\\{])'+key+':"([^"\\\\]*)"'))?.[1];
 const email=stringFor('email'),whatsapp=stringFor('whatsapp');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email||'')||!/^https:\/\/wa\.me\/\d{8,15}$/.test(whatsapp||''))throw Error('Contact validation failed. Existing data was preserved.');
 const phoneMatch=snippet.match(/phones:\[((?:"[+\d ()-]+",?)+)\]/);
 const phones=phoneMatch?JSON.parse('['+phoneMatch[1]+']'):current.phones;
 if(!phones.every(p=>/^\+?[\d ()-]{8,25}$/.test(p)))throw Error('Phone validation failed.');
 const next={...current,email,whatsapp,phones,location:stringFor('location')||current.location,fetchedAt:new Date().toISOString().slice(0,10)};
 for(const network of ['linkedin','github','facebook']){const found=snippet.match(new RegExp(network+':"(https://[^"\\\\]+)"'))?.[1];if(found&&new URL(found).protocol==='https:')next.social[network]=found;}
 if(process.argv.includes('--check'))console.log(JSON.stringify({source:origin,email,whatsapp,phones,fetchedAt:next.fetchedAt},null,2));
 else{await fs.writeFile(file,JSON.stringify(next,null,2)+'\n');console.log('Updated the verified public contact snapshot. Run npm run build to publish the updated HTML.');}
}catch(error){console.error(error.message);process.exitCode=1;}
