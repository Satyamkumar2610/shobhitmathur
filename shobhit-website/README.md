# Shobhit Mathur — Personal Website

A premium, editorial personal website for **Shobhit Mathur** — Vice Chancellor of Rishihood University, writer, and policy thinker.

---

## How to Run

```bash
# Navigate into the website folder
cd shobhit-website

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## Pages

| Route             | Description                                                           |
| ----------------- | --------------------------------------------------------------------- |
| `/`               | Homepage — hero, featured writings, areas of focus                    |
| `/about`          | About — biography, affiliations, education                            |
| `/writings`       | Full writing archive (32 articles) — with search and category filters |
| `/writings/:slug` | Individual article page — metadata, excerpt, link to original         |

---

## Where to Add Images

Place your photos in the `/public/images/` folder:

| File path                          | Where it appears       |
| ---------------------------------- | ---------------------- |
| `public/images/profile.jpg`        | Homepage hero portrait |
| `public/images/about-portrait.jpg` | About page portrait    |

**How to replace:** Simply drop your photo file into `public/images/` using the exact filename above. The site will automatically pick it up. The site displays gracefully (with initials) if the image file is not yet present.

**Recommended dimensions:**

- `profile.jpg` — 680×840px (portrait orientation, top-aligned)
- `about-portrait.jpg` — 560×680px (portrait orientation)

---

## How to Add a New Article

Open **`src/data/articles.ts`** and add a new entry to the `ARTICLES` array:

```typescript
{
  id: 'SM-033',          // Unique ID, increment from last
  slug: 'my-article-slug', // URL-friendly slug: /writings/my-article-slug
  title: 'My Article Title',
  excerpt: 'A short 1-2 sentence summary of the piece.',
  date: '2026-09-15',   // YYYY-MM-DD
  year: 2026,
  publication: 'The Hindu',
  publicationUrl: 'https://www.thehindu.com',
  category: 'Education & Pedagogy', // One of the three main categories
  subcategory: 'Higher Education',
  coAuthors: ['Name Here'],  // Or empty array []
  externalUrl: 'https://full-article-url.com',
  featured: false,       // Set to true to show on homepage
  readingTime: 5,        // Estimated minutes
  tags: ['Tag1', 'Tag2'],
},
```

That's all — the article will immediately appear in the Writings archive and be searchable.

---

## How to Change Biographical Info

Edit **`src/data/profile.ts`** — this file contains:

- Name, title, tagline, mission statement
- Full biography sections (used on the About page)
- Areas of focus
- Affiliations and education
- Social/contact links

---

## Content Architecture

```
src/
├── data/
│   ├── articles.ts      ← All 32 articles + helper functions
│   └── profile.ts       ← Bio, affiliations, education, social links
├── components/
│   ├── Header.tsx/css   ← Sticky header + mobile nav
│   ├── Footer.tsx/css   ← Minimal footer
│   └── ReadingProgress.tsx/css  ← Reading progress bar
├── pages/
│   ├── Home.tsx/css     ← Homepage
│   ├── About.tsx/css    ← About page
│   ├── Writings.tsx/css ← Writing archive + search
│   └── Article.tsx/css  ← Individual article
├── styles/
│   ├── tokens.css       ← CSS design tokens (colors, fonts, spacing)
│   ├── base.css         ← CSS reset and global styles
│   └── typography.css   ← All typography classes
└── hooks/
    └── useScroll.ts     ← Scroll-related hooks

public/
└── images/
    ├── profile.jpg          ← [ADD] Homepage portrait
    └── about-portrait.jpg   ← [ADD] About page portrait
```

---

## Remaining Placeholders

| What                 | Where                                  | Status                          |
| -------------------- | -------------------------------------- | ------------------------------- |
| Profile photograph   | `public/images/profile.jpg`            | ⬜ Upload your photo            |
| About page photo     | `public/images/about-portrait.jpg`     | ⬜ Upload your photo            |
| Email address        | `src/data/profile.ts → social.email`   | ⬜ Add your email               |
| PhD institution name | `src/data/profile.ts → education[0]`   | ⬜ Confirm exact institution    |
| Custom domain        | `index.html → canonical URL`           | ⬜ Update to your actual domain |
| Twitter/X handle     | `src/data/profile.ts → social.twitter` | ⬜ Add if desired               |

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (fast local dev, optimized builds)
- **React Router v6** (clean URL routing)
- **Fuse.js** (client-side fuzzy search)
- **Lucide React** (icons)
- **Google Fonts** — Cormorant Garamond + Inter
- **Vanilla CSS** with CSS custom properties (design tokens)

No backend. No database. Fully static.

---

## Build for Production

```bash
npm run build
```

Output in `dist/` — can be deployed to Netlify, Vercel, or any static host.
