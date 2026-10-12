// Post-build: write one HTML file per route with its own <title>, meta
// description, canonical, Open Graph / Twitter tags and JSON-LD, so crawlers
// and link previews (LinkedIn, X, WhatsApp) that don't run JavaScript see
// the right page. Also regenerates sitemap.xml from the article list.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { ARTICLES } from "../src/data/articles";

const SITE = "https://www.shobhitmathur.in";
const DIST = join(import.meta.dirname, "..", "dist");
const DEFAULT_IMAGE = `${SITE}/images/profile.jpg`;
const today = new Date().toISOString().slice(0, 10);

interface Page {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: object;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const latestArticle = ARTICLES.map((a) => a.date).sort().at(-1) ?? today;

const pages: Page[] = [
  { path: "/", title: "Shobhit Mathur | Education Entrepreneur, Institution Builder, Policy Thinker, Writer", description: "Shobhit Mathur is an education entrepreneur, institution builder, policy thinker, and writer. He is Vice Chancellor of Rishihood University and writes on education, technology, governance, and India's future.", lastmod: latestArticle, changefreq: "weekly", priority: "1.0" },
  { path: "/about", title: "About — Shobhit Mathur", description: "Shobhit Mathur's journey from technology at Amazon to social transformation and building Rishihood University as Vice Chancellor and Co-Founder.", lastmod: today, changefreq: "monthly", priority: "0.8" },
  { path: "/writings", title: "Writings — Shobhit Mathur", description: "Essays and opinion pieces by Shobhit Mathur on education reform, public policy, and technology, published in The Hindu, ThePrint, The Economic Times, and other national outlets.", lastmod: latestArticle, changefreq: "weekly", priority: "0.9" },
  { path: "/talks", title: "Talks — Shobhit Mathur", description: "Talks, panels, and podcast appearances by Shobhit Mathur on education, public policy, and building institutions in India.", lastmod: today, changefreq: "monthly", priority: "0.7" },
  { path: "/gallery", title: "Gallery — Shobhit Mathur", description: "Photographs of Shobhit Mathur at lectures, panels, convocations, policy forums, and institutional milestones at Rishihood University and beyond.", lastmod: today, changefreq: "monthly", priority: "0.7" },
  { path: "/contact", title: "Contact — Shobhit Mathur", description: "Get in touch with Shobhit Mathur, Vice Chancellor and Co-Founder of Rishihood University, for speaking engagements, collaborations, or media inquiries.", lastmod: today, changefreq: "yearly", priority: "0.6" },
  ...ARTICLES.map((a): Page => {
    const url = `${SITE}/writings/${a.slug}`;
    const image = a.thumbnail ? `${SITE}${a.thumbnail}` : DEFAULT_IMAGE;
    return {
      path: `/writings/${a.slug}`,
      title: `${a.title} — Shobhit Mathur`,
      description: a.excerpt,
      image,
      type: "article",
      lastmod: a.date,
      changefreq: "yearly",
      priority: a.featured ? "0.8" : "0.7",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: a.title,
        description: a.excerpt,
        datePublished: a.date,
        image,
        url,
        mainEntityOfPage: url,
        sameAs: a.externalUrl,
        author: [
          { "@type": "Person", name: "Shobhit Mathur", url: SITE },
          ...(a.coAuthors ?? []).map((name) => ({ "@type": "Person", name })),
        ],
        publisher: { "@type": "Organization", name: a.publication, ...(a.publicationUrl ? { url: a.publicationUrl } : {}) },
        keywords: a.tags?.join(", "),
      },
    };
  }),
];

const template = readFileSync(join(DIST, "index.html"), "utf8");

function setAttr(html: string, selector: RegExp, value: string) {
  if (!selector.test(html)) throw new Error(`prerender: tag not found ${selector}`);
  return html.replace(selector, (_m, pre, post) => `${pre}${esc(value)}${post}`);
}

function render(p: Page) {
  const url = `${SITE}${p.path === "/" ? "/" : p.path}`;
  const image = p.image ?? DEFAULT_IMAGE;
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(p.title)}</title>`);
  html = setAttr(html, /(<meta\s+name="title"\s+content=")[^"]*(")/, p.title);
  html = setAttr(html, /(<meta\s+name="description"\s+content=")[^"]*(")/, p.description);
  html = setAttr(html, /(<link rel="canonical" href=")[^"]*(")/, url);
  for (const pfx of ["og", "twitter"]) {
    html = setAttr(html, new RegExp(`(<meta\\s+property="${pfx}:title"\\s+content=")[^"]*(")`), p.title);
    html = setAttr(html, new RegExp(`(<meta\\s+property="${pfx}:description"\\s+content=")[^"]*(")`), p.description);
    html = setAttr(html, new RegExp(`(<meta property="${pfx}:url" content=")[^"]*(")`), url);
    html = setAttr(html, new RegExp(`(<meta property="${pfx}:image" content=")[^"]*(")`), image);
  }
  html = setAttr(html, /(<meta property="og:type" content=")[^"]*(")/, p.type ?? "website");
  if (p.jsonLd) {
    const ld = JSON.stringify(p.jsonLd).replace(/</g, "\\u003c");
    html = html.replace("</head>", `    <script type="application/ld+json">${ld}</script>\n  </head>`);
  }
  return html;
}

let count = 0;
for (const p of pages) {
  const html = render(p);
  // "/" stays index.html; others become e.g. dist/writings/slug.html, served at
  // /writings/slug via "cleanUrls" in vercel.json.
  const out = p.path === "/" ? join(DIST, "index.html") : join(DIST, `${p.path.slice(1)}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  count++;
}

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages
    .map((p) => `  <url><loc>${SITE}${p.path}</loc><lastmod>${p.lastmod}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`)
    .join("\n") +
  `\n</urlset>\n`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap);

console.log(`prerender: wrote ${count} pages + sitemap.xml (${pages.length} URLs)`);
