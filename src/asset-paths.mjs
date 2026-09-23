import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const source = new URL('./assets/', import.meta.url);
const revision = data => createHash('sha256').update(data).digest('hex').slice(0, 12);

// Content-based versions refresh old cached fonts/CSS without disabling caching.
// Favicon URLs deliberately stay stable for search crawlers.
export function assetUrl(file) {
  return `/assets/${file}?v=${revision(readFileSync(new URL(file, source)))}`;
}

export const stylesheet = ['styles.css', 'editorial.css']
  .map(file => readFileSync(new URL(file, source), 'utf8'))
  .join('\n')
  .replace(/\/assets\/fonts\/[\w-]+\.woff2/g, url => assetUrl(url.slice('/assets/'.length)));

export const stylesheetUrl = `/assets/styles.css?v=${revision(stylesheet)}`;
