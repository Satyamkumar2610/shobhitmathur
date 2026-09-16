import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Search, X } from "lucide-react";
import Fuse from "fuse.js";
import {
  ARTICLES,
  CATEGORIES,
  type Category,
  formatDate,
} from "../data/articles";
import type { Article } from "../data/articles";
import { useInView } from "../hooks/useScroll";
import "./Writings.css";

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView(0.05);
  return (
    <div
      ref={ref as any}
      className={`fade-in ${inView ? "fade-in--visible" : ""}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export default function Writings() {
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

  return (
    <div className="writings-page">
      <div className="writings-page__header">
        <div className="container">
          {/* Page title */}
          <div className="writings-page__title-row">
            <div>
              <p
                className="label label--accent"
                style={{ marginBottom: "var(--space-3)" }}
              >
                Archive
              </p>
              <h1 className="display-lg writings-page__title">Writings</h1>
              <p className="body-lg writings-page__intro">
                Essays, opinion columns, and research across education reform,
                technology policy, and governance. Published in leading Indian
                and international media since 2016.
              </p>

              {/* Academic Profiles Section */}
              <div className="writings-page__profiles">
                <p className="label label--accent writings-page__profiles-label">
                  Academic Profiles
                </p>
                <div className="writings-page__profiles-links">
                  <a
                    href="https://scholar.google.com/citations?hl=en&user=0_fGaLYAAAAJ"
                    target="_blank"
                    rel="noreferrer"
                    className="writings-page__profile-link"
                  >
                    Google Scholar
                    <ArrowRight size={14} className="writings-page__profile-icon" />
                  </a>
                  <a
                    href="https://orcid.org/0000-0002-2470-960X"
                    target="_blank"
                    rel="noreferrer"
                    className="writings-page__profile-link"
                  >
                    ORCID
                    <ArrowRight size={14} className="writings-page__profile-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="writings-search">
            <Search
              size={16}
              strokeWidth={1.5}
              className="writings-search__icon"
            />
            <input
              type="search"
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

          {/* Category filters */}
          <div
            className="writings-filters"
            role="tablist"
            aria-label="Filter by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`writings-filter-btn ${activeCategory === cat ? "writings-filter-btn--active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === "All" ? "All" : getCategoryShort(cat)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container">
        {/* Article list */}
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
                      <div
                        className="writings-list-item__number label"
                        aria-hidden="true"
                      >
                        {String(idx + 1).padStart(2, "0")}
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
  );
}
