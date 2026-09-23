import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = resolve('dist');
const port = Number(process.env.PORT || 4173);
const deploymentHeaders=await readFile(resolve(root,'_headers'),'utf8');
const contentSecurityPolicy=deploymentHeaders.match(/^  Content-Security-Policy: (.+)$/m)?.[1];
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.webp':'image/webp', '.ico':'image/x-icon', '.woff2':'font/woff2', '.woff':'font/woff', '.ttf':'font/ttf', '.xml':'application/xml; charset=utf-8', '.txt':'text/plain; charset=utf-8', '.webmanifest':'application/manifest+json' };
http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if(/^\/en(?:\/|$)/.test(url.pathname)){res.writeHead(301,{Location:(url.pathname.replace(/^\/en(?:\/|$)/,'/')||'/')+url.search});res.end();return;}
    let file = resolve(root, '.' + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    let info;
    try { info = await stat(file); } catch {}
    if (info?.isDirectory()) {
      if (!url.pathname.endsWith('/')) { res.writeHead(308, { Location: url.pathname + '/' + url.search }); res.end(); return; }
      file = resolve(file, 'index.html');
    }
    let data, status = 200;
    try { data = await readFile(file); } catch { data = await readFile(resolve(root, url.pathname.startsWith('/bn/')?'bn/404/index.html':'404.html')); file = '404.html'; status = 404; }
    const headers={ 'Content-Type':types[extname(file)] || 'application/octet-stream', 'X-Content-Type-Options':'nosniff', 'Referrer-Policy':'strict-origin-when-cross-origin', 'Cache-Control':'no-cache', 'Vary':'Accept-Encoding' };
    if(contentSecurityPolicy)headers['Content-Security-Policy']=contentSecurityPolicy;
    if(data.length>1024&&/\b(?:text\/|application\/(?:javascript|json|xml|manifest)|image\/svg)/.test(headers['Content-Type'])&&/\bgzip\b/.test(req.headers['accept-encoding']||'')){data=gzipSync(data);headers['Content-Encoding']='gzip';}
    headers['Content-Length']=data.length;
    res.writeHead(status, headers);
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(400); res.end('Bad request'); }
}).listen(port, '127.0.0.1', () => console.log(`Subromart: http://localhost:${port}`));
