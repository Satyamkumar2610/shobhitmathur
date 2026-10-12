import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Search, X } from "lucide-react";
import Fuse from "fuse.js";
import {
  ARTICLES,
  CATEGORIES,
  type Category,
  formatDate,
} from "../data/articles";
import type { Article } from "../data/articles";
import FadeIn from "../components/FadeIn";
import { useSEO } from "../hooks/useSEO";
import "./Writings.css";

const firstYear = Math.min(
  ...ARTICLES.map((a) => new Date(a.date).getFullYear()),
);

export default function Writings() {
  useSEO({
    title: "Writings — Shobhit Mathur",
    description:
      "Essays and opinion pieces by Shobhit Mathur on education reform, public policy, and technology, published in The Hindu, ThePrint, The Economic Times, and other national outlets.",
    path: "/writings",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get("category") ?? "All") as Category;

  const [activeCategory, setActiveCategory] = useState<Category>(
    CATEGORIES.includes(initialCategory) ? initialCategory : "All",
  );
  const [query, setQuery] = useState("");

  // Update URL when category changes
  useEffect(() => {
    if (activeCategory === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", activeCategory);
    }
    setSearchParams(searchParams, { replace: true });
  }, [activeCategory]);

  // Fuse.js instance
  const fuse = useMemo(
    () =>
      new Fuse(ARTICLES, {
        keys: [
          "title",
          "excerpt",
          "category",
          "publication",
          "subcategory",
          "tags",
        ],
        threshold: 0.35,
        minMatchCharLength: 2,
      }),
    [],
  );

  // Filter logic
  const filtered = useMemo<Article[]>(() => {
    let items: Article[];
    if (query.trim().length >= 2) {
      items = fuse.search(query.trim()).map((r) => r.item);
    } else {
      items = [...ARTICLES].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }
    if (activeCategory !== "All") {
      items = items.filter((a) => a.category === activeCategory);
    }
    return items;
  }, [query, activeCategory]);

  function getCategoryShort(cat: string) {
    const map: Record<string, string> = {
      "Education & Pedagogy": "Education",
      "Public Policy & Governance": "Policy",
      "Technology & Innovation": "Technology",
    };
    return map[cat] ?? cat;
  }

  function getPublicationDomain(publication: string) {
    const domains: Record<string, string> = {
      "The Hindu": "thehindu.com",
      ThePrint: "theprint.in",
      "The Economic Times": "economictimes.indiatimes.com",
      "LinkedIn / ThePrint": "linkedin.com",
      "LinkedIn Pulse": "linkedin.com",
      NDTV: "ndtv.com",
      "The Times of India": "timesofindia.indiatimes.com",
      "Financial Express": "financialexpress.com",
      "The Indian Express": "indianexpress.com",
      Livemint: "livemint.com",
      "Hindustan Times": "hindustantimes.com",
      Swarajya: "swarajyamag.com",
      IndiaSpend: "indiaspend.com",
      "The Quint": "thequint.com",
      "International Journal of Public Sector Performance Management":
        "inderscienceonline.com",
      "Internet Journal of Restorative Justice": "rj4allpublications.com",
    };
    return domains[publication] ?? "";
  }

  function getPublicationMark(publication: string) {
    return publication
      .replace(/The |LinkedIn \/ /g, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }

  return (
    <div className="writings-page">
      <header className="page-header">
        <div className="container">
          <div>
            <p className="label label--accent page-header__eyebrow">Archive</p>
            <h1 className="display-lg page-header__title">Writings</h1>
            <p className="body-lg page-header__intro">
              Essays, opinion columns, and research across education reform,
              technology policy, and governance. Published in leading Indian
              and international media since {firstYear}.
            </p>
          </div>
        </div>
      </header>

      <div className="container writings-layout">
        <aside className="writings-sidebar" aria-label="Filter writings">
          <div className="writings-search">
            <Search
              size={16}
              strokeWidth={1.5}
              className="writings-search__icon"
            />
            <input
              type="search"
              id="writings-search"
              placeholder="Search writings…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="writings-search__input"
              aria-label="Search writings"
            />
            {query && (
              <button
                className="writings-search__clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <X size={14} strokeWidth={2} />
              </button>
            )}
          </div>

          <div className="writings-sidebar__group">
            <p className="label writings-sidebar__label">Categories</p>
            <div
              className="writings-cats"
              role="tablist"
              aria-label="Filter by category"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`writings-cat ${activeCategory === cat ? "writings-cat--active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span>{cat === "All" ? "All writings" : getCategoryShort(cat)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="writings-sidebar__group writings-sidebar__profiles">
            <p className="label writings-sidebar__label">Academic Profiles</p>
            <a
              href="https://scholar.google.com/citations?hl=en&user=0_fGaLYAAAAJ"
              target="_blank"
              rel="noreferrer"
              className="writings-profile-link"
            >
              Google Scholar
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
            <a
              href="https://orcid.org/0000-0002-2470-960X"
              target="_blank"
              rel="noreferrer"
              className="writings-profile-link"
            >
              ORCID
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          </div>
        </aside>

        <div className="writings-results">
        <p className="writings-results__meta label" aria-live="polite">
          {activeCategory === "All" ? "All writings" : getCategoryShort(activeCategory)}
          {query.trim().length >= 2 && ` · Results for “${query.trim()}”`}
        </p>
        {filtered.length > 0 ? (
          <ol className="writings-list" aria-label="Writings list">
            {filtered.map((article, idx) => (
              <li key={article.id}>
                <FadeIn delay={Math.min(idx * 40, 300)}>
                  <article className="writings-list-item">
                    <Link
                      to={`/writings/${article.slug}`}
                      className="writings-list-item__inner"
                    >
                      {/* Thumbnail */}
                      <div
                        className="writings-list-item__thumbnail"
                        aria-label={`${article.publication} logo`}
                      >
                        {article.thumbnail ? (
                          <img
                            src={article.thumbnail}
                            alt=""
                            className="writings-list-item__thumbnail-img"
                            loading="lazy"
                          />
                        ) : (
                          <>
                            {getPublicationDomain(article.publication) && (
                              <img
                                src={`https://www.google.com/s2/favicons?domain=${getPublicationDomain(article.publication)}&sz=128`}
                                alt=""
                                className="writings-list-item__publication-icon"
                                loading="lazy"
                              />
                            )}
                            <span className="writings-list-item__thumbnail-label">
                              {getPublicationMark(article.publication)}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="writings-list-item__body">
                        <div className="writings-list-item__meta">
                          <span className="label label--accent">
                            {getCategoryShort(article.category)}
                          </span>
                          {article.subcategory && (
                            <span className="label writings-list-item__sub">
                              {article.subcategory}
                            </span>
                          )}
                          <span className="label writings-list-item__pub">
                            {article.publication}
                          </span>
                          <span className="label">
                            {formatDate(article.date)}
                          </span>
                          {article.readingTime && (
                            <span className="label writings-list-item__rt">
                              {article.readingTime} min read
                            </span>
                          )}
                        </div>

                        <h2 className="writings-list-item__title heading-md">
                          {article.title}
                        </h2>

                        <p className="writings-list-item__excerpt body-sm">
                          {article.excerpt}
                        </p>

                        {article.coAuthors && article.coAuthors.length > 0 && (
                          <p className="writings-list-item__coauthor label">
                            With {article.coAuthors.join(", ")}
                          </p>
                        )}
                      </div>

                      <div className="writings-list-item__arrow-wrap">
                        <ArrowRight
                          size={20}
                          strokeWidth={1.5}
                          className="writings-list-item__arrow"
                        />
                      </div>
                    </Link>
                  </article>
                </FadeIn>
              </li>
            ))}
          </ol>
        ) : (
          <div className="writings-empty">
            <p className="body-lg">No writings found for that search.</p>
            <button
              className="btn btn--ghost"
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
