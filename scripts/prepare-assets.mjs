// Optional image regeneration. Build uses the committed optimised assets directly.
import fs from 'node:fs/promises';
import sharp from 'sharp';
const dir='src/assets/';
const logo=await fs.readFile(dir+'logo.svg','utf8');
const favicon=logo.replace('viewBox="0 0 64 64">','viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#17201c"/>');
await fs.writeFile(dir+'favicon.svg',favicon);
for(const [size,name]of [[96,'favicon-96'],[180,'apple-touch-icon'],[192,'logo-192'],[512,'logo-512']])await sharp(Buffer.from(favicon)).resize(size,size).png().toFile(dir+name+'.png');
await sharp(dir+'subroto-das.png').resize({width:128,withoutEnlargement:true}).webp({quality:85}).toFile(dir+'subroto-avatar.webp');
await sharp(dir+'subroto-das.png').resize({width:640,withoutEnlargement:true}).webp({quality:85}).toFile(dir+'subroto-das.webp');
console.log('Regenerated optimised portrait and favicon sizes. Use render-brand.mjs for the social image.');
