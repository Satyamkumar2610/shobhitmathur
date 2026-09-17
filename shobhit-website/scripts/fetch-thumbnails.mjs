import { readFileSync, writeFileSync, mkdirSync, createWriteStream, existsSync } from 'fs';
import { get as httpsGet } from 'https';
import { get as httpGet } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, 'public/images/articles');
const ARTICLES_FILE = path.join(ROOT, 'src/data/articles.ts');
mkdirSync(OUTPUT_DIR, { recursive: true });

const src = readFileSync(ARTICLES_FILE, 'utf8');
const ids = [...src.matchAll(/id:\s*"([^"]+)"/g)].map(m => m[1]);
const slugs = [...src.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
const urls = [...src.matchAll(/externalUrl:\s*\n?\s*"([^"]+)"/g)].map(m => m[1]);
const articles = ids.map((id, i) => ({ id, slug: slugs[i], url: urls[i] }));
console.log(`Found ${articles.length} articles`);

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout: ${label}`)), ms))
  ]);
}

function fetchHtml(url, depth = 0) {
  if (depth > 3) return Promise.reject(new Error('Too many redirects'));
  return new Promise((resolve, reject) => {
    try {
      const parsedUrl = new URL(url);
      const getter = parsedUrl.protocol === 'https:' ? httpsGet : httpGet;
      const req = getter(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0 Safari/537.36',
          'Accept': 'text/html',
        },
      }, (res) => {
        if ([301,302,303,307,308].includes(res.statusCode) && res.headers.location) {
          res.resume();
          try { return fetchHtml(new URL(res.headers.location, url).href, depth+1).then(resolve).catch(reject); }
          catch(e) { return reject(e); }
        }
        if (res.statusCode !== 200) { res.resume(); return reject(new Error(`HTTP ${res.statusCode}`)); }
        let body = '';
        res.setEncoding('utf8');
        res.on('data', chunk => { body += chunk; if (body.length > 200000) { req.destroy(); resolve(body); } });
        res.on('end', () => resolve(body));
        res.on('error', reject);
      });
      req.on('error', reject);
    } catch(e) { reject(e); }
  });
}

function extractOgImage(html) {
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
    /property=["']og:image["']\s+content=["']([^"']+)["']/i,
    /content=["']([^"']+)["']\s+property=["']og:image["']/i,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m && m[1]) {
      let img = m[1].replace(/&amp;/g, '&').trim();
      if (img.startsWith('//')) img = 'https:' + img;
      if (img.startsWith('http')) return img;
    }
  }
  return null;
}

function downloadImage(imageUrl, destPath, depth = 0) {
  if (depth > 3) return Promise.reject(new Error('Too many redirects'));
  return new Promise((resolve, reject) => {
    if (existsSync(destPath)) { return resolve('cached'); }
    try {
      const parsedUrl = new URL(imageUrl);
      const getter = parsedUrl.protocol === 'https:' ? httpsGet : httpGet;
      const req = getter(imageUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; OGFetcher/1.0)' },
      }, (res) => {
        if ([301,302,303,307,308].includes(res.statusCode) && res.headers.location) {
          res.resume();
          try { return downloadImage(new URL(res.headers.location, imageUrl).href, destPath, depth+1).then(resolve).catch(reject); }
          catch(e) { return reject(e); }
        }
        if (res.statusCode !== 200) { res.resume(); return reject(new Error(`HTTP ${res.statusCode}`)); }
        const file = createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve('downloaded'); });
        file.on('error', reject);
      });
      req.on('error', reject);
    } catch(e) { reject(e); }
  });
}

function getExt(url) {
  const u = url.split('?')[0].split('#')[0];
  const ext = u.split('.').pop()?.toLowerCase() || '';
  return ['jpg','jpeg','png','webp','gif'].includes(ext) ? (ext === 'jpeg' ? 'jpg' : ext) : 'jpg';
}

const results = {};

for (const article of articles) {
  if (!article.url || !article.slug) continue;
  console.log(`\n[${article.id}] ${article.slug}`);
  try {
    const html = await withTimeout(fetchHtml(article.url), 10000, 'fetch');
    const ogImage = extractOgImage(html);
    if (!ogImage) { console.log(`  ✗ No og:image`); continue; }
    const ext = getExt(ogImage);
    const filename = `${article.slug}.${ext}`;
    const destPath = path.join(OUTPUT_DIR, filename);
    const status = await withTimeout(downloadImage(ogImage, destPath), 15000, 'download');
    results[article.slug] = `/images/articles/${filename}`;
    console.log(`  ✓ ${status}: ${filename}`);
  } catch (err) {
    console.log(`  ✗ ${err.message}`);
  }
}

// Patch articles.ts
let updatedSrc = src;
let patched = 0;
for (const [slug, thumbPath] of Object.entries(results)) {
  const blockStart = updatedSrc.indexOf(`slug: "${slug}"`);
  if (blockStart === -1) continue;
  const blockEnd = updatedSrc.indexOf('\n  },', blockStart);
  if (blockEnd === -1) continue;
  if (updatedSrc.slice(blockStart, blockEnd).includes('thumbnail:')) continue;
  updatedSrc = updatedSrc.slice(0, blockEnd) + `\n    thumbnail: "${thumbPath}",` + updatedSrc.slice(blockEnd);
  patched++;
}
writeFileSync(ARTICLES_FILE, updatedSrc, 'utf8');
console.log(`\n✅ Downloaded: ${Object.keys(results).length}, Patched: ${patched} articles.`);
