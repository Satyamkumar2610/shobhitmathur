import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Copy,
  Clock,
  Calendar,
} from "lucide-react";
import {
  getArticleBySlug,
  getAdjacentArticles,
  formatDate,
} from "../data/articles";
import ReadingProgress from "../components/ReadingProgress";
import { useSEO } from "../hooks/useSEO";
import "./Article.css";

const SITE_URL = "https://www.shobhitmathur.in";

function getCategoryShort(cat: string) {
  const map: Record<string, string> = {
    "Education & Pedagogy": "Education",
    "Public Policy & Governance": "Policy",
    "Technology & Innovation": "Technology",
  };
  return map[cat] ?? cat;
}

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const { prev, next } = slug
    ? getAdjacentArticles(slug)
    : { prev: null, next: null };

  // 404 if no article found
  if (!article) return <Navigate to="/writings" replace />;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
  };

  useSEO({
    title: `${article.title} — Shobhit Mathur`,
    description: article.excerpt,
    path: `/writings/${article.slug}`,
    image: article.thumbnail ? `${SITE_URL}${article.thumbnail}` : undefined,
  });

  return (
    <>
      <ReadingProgress />

      <div className="article-page">
        {/* ── BACK LINK ── */}
        <div className="container article-page__nav-back">
          <Link to="/writings" className="article-back-link">
            <ArrowLeft size={16} strokeWidth={1.5} />
            <span>All writings</span>
          </Link>
        </div>

        {/* ── ARTICLE HEADER ── */}
        <header className="article-header container--text">
          {/* Category + pub */}
          <div className="article-header__meta">
            <Link
              to={`/writings?category=${encodeURIComponent(article.category)}`}
              className="label label--accent article-header__category"
            >
              {getCategoryShort(article.category)}
            </Link>
            <span className="label article-header__sep" aria-hidden="true">
              ·
            </span>
            <span className="label article-header__pub">
              {article.publication}
            </span>
          </div>

          {/* Title */}
          <h1 className="display-md article-header__title">{article.title}</h1>

          {/* Excerpt / dek */}
          <p className="article-header__dek heading-md">{article.excerpt}</p>

          {/* Info row */}
          <div className="article-header__info">
            <div className="article-header__info-item">
              <Calendar size={14} strokeWidth={1.5} aria-hidden="true" />
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </div>
            {article.readingTime && (
              <div className="article-header__info-item">
                <Clock size={14} strokeWidth={1.5} aria-hidden="true" />
                <span>{article.readingTime} min read</span>
              </div>
            )}
            {article.coAuthors && article.coAuthors.length > 0 && (
              <div className="article-header__info-item">
                <span>With {article.coAuthors.join(", ")}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="article-header__actions">
            <a
              href={article.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              Read full article
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
            <button
              onClick={handleCopyLink}
              className="btn btn--ghost article-copy-btn"
              aria-label="Copy link to this article"
              title="Copy link"
            >
              <Copy size={14} strokeWidth={1.5} />
              Copy link
            </button>
          </div>

          <hr className="article-header__rule" />
        </header>

        {/* ── ARTICLE BODY ── */}
        <main className="article-body container--text" id="article-content">
          <div className="prose">
            {/* Summary card */}
            <div className="article-summary-note">
              <p className="article-summary-note__label label">Summary</p>
              <p>{article.excerpt}</p>
            </div>

            <p>
              This article was originally published in{" "}
              <strong>{article.publication}</strong> on{" "}
              <strong>{formatDate(article.date)}</strong>.
              {article.coAuthors && article.coAuthors.length > 0 && (
                <>
                  {" "}
                  Co-authored with{" "}
                  <strong>{article.coAuthors.join(" and ")}</strong>.
                </>
              )}
            </p>

            <p>
              The piece explores questions of{" "}
              {article.subcategory.toLowerCase()} within the broader context of{" "}
              {article.category.toLowerCase()}. It is part of Shobhit Mathur's
              ongoing writing on how India can build stronger institutions,
              better education systems, and more effective governance.
            </p>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <>
                <h2>Themes explored</h2>
                <ul>
                  {article.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </>
            )}

            <blockquote>
              <p>
                Institutions shape societies. Education shapes the people who
                build those institutions.
              </p>
            </blockquote>

            <p>
              Read the full article on{" "}
              <a
                href={article.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {article.publication}
              </a>{" "}
              to engage with the complete argument.
            </p>
          </div>

          {/* Read full CTA */}
          <div className="article-read-full">
            <a
              href={article.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="article-read-full__link"
            >
              <span>Read full article on {article.publication}</span>
              <ArrowUpRight
                size={20}
                strokeWidth={1.5}
                className="article-read-full__arrow"
              />
            </a>
          </div>
        </main>

        {/* ── PREV / NEXT ── */}
        <nav className="article-adjacent container" aria-label="Other writings">
          <div className="article-adjacent__inner">
            <div className="article-adjacent__item article-adjacent__item--prev">
              {prev && (
                <Link
                  to={`/writings/${prev.slug}`}
                  className="article-adjacent__link"
                >
                  <div className="article-adjacent__dir">
                    <ArrowLeft size={14} strokeWidth={1.5} />
                    <span className="label">Previous</span>
                  </div>
                  <div className="article-adjacent__title heading-md">
                    {prev.title}
                  </div>
                  <div className="label article-adjacent__pub">
                    {prev.publication} · {prev.year}
                  </div>
                </Link>
              )}
            </div>

            <div className="article-adjacent__divider" aria-hidden="true" />

            <div className="article-adjacent__item article-adjacent__item--next">
              {next && (
                <Link
                  to={`/writings/${next.slug}`}
                  className="article-adjacent__link article-adjacent__link--next"
                >
                  <div className="article-adjacent__dir article-adjacent__dir--next">
                    <span className="label">Next</span>
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </div>
                  <div className="article-adjacent__title heading-md">
                    {next.title}
                  </div>
                  <div className="label article-adjacent__pub">
                    {next.publication} · {next.year}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* ── BACK TO WRITINGS ── */}
        <div className="container article-page__back-bottom">
          <Link to="/writings" className="btn btn--ghost">
            <ArrowLeft size={16} strokeWidth={1.5} />
            Back to all writings
          </Link>
        </div>
      </div>
    </>
  );
}
