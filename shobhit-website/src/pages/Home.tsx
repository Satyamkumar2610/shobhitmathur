import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getRecentArticles, formatDate } from "../data/articles";
import { PROFILE } from "../data/profile";
import FadeIn from "../components/FadeIn";
import "./Home.css";

export default function Home() {
  const recent = getRecentArticles(6);

  return (
    <div className="home">
      {/* ── HERO ── */}
      <section className="hero" aria-label="Introduction">
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero__eyebrow">
              {PROFILE.descriptors.map((d, i) => (
                <span key={d} className="enter" style={{ "--d": `${80 + i * 70}ms` } as React.CSSProperties}>
                  <span className="label label--accent">{d}</span>
                  {i < PROFILE.descriptors.length - 1 && (
                    <span className="hero__eyebrow-sep" aria-hidden="true">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>

            <span className="hero__rule" aria-hidden="true" />

            <h1 className="hero__headline display-xl">
              <span className="line-mask">
                <span className="line-mask__inner" style={{ "--d": "300ms" } as React.CSSProperties}>
                  Building institutions
                </span>
              </span>
              <span className="line-mask">
                <span className="line-mask__inner" style={{ "--d": "420ms" } as React.CSSProperties}>
                  <em>that expand human</em>
                </span>
              </span>
              <span className="line-mask">
                <span className="line-mask__inner" style={{ "--d": "540ms" } as React.CSSProperties}>
                  potential.
                </span>
              </span>
            </h1>

            <p className="hero__bio body-lg enter" style={{ "--d": "680ms" } as React.CSSProperties}>
              {PROFILE.intro}
            </p>

            <div className="hero__ctas">
              <Link to="/writings" className="btn btn--primary enter" style={{ "--d": "780ms" } as React.CSSProperties}>
                Explore the writings
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <Link to="/about" className="btn btn--ghost enter" style={{ "--d": "850ms" } as React.CSSProperties}>
                About Me
              </Link>
            </div>
          </div>

          {/* Portrait placeholder */}
          <div className="hero__image-wrap" aria-hidden="true">
            <div className="hero__image-placeholder img-reveal" style={{ "--d": "220ms" } as React.CSSProperties}>
              <div className="hero__image-placeholder-inner">
                <img
                  src="/images/hero-speaking.jpg"
                  alt="Shobhit Mathur addressing students"
                  className="hero__portrait"
                  loading="eager"
                  fetchPriority="high"
                  width={1092}
                  height={1365}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED WRITINGS ── */}
      <section
        className="featured-writings"
        aria-labelledby="featured-writings-heading"
      >
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <h2
                className="section-header__title label"
                id="featured-writings-heading"
              >
                Recent Writings
              </h2>
              <Link to="/writings" className="section-header__link body-sm">
                All writings <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </FadeIn>

          <div className="featured-writings__list">
            {/* Hero article — first one */}
            <FadeIn>
              <article className="featured-article featured-article--hero">
                <Link
                  to={`/writings/${recent[0].slug}`}
                  className="featured-article__inner"
                >
                  <div className="featured-article__meta">
                    <span className="label label--accent">
                      {recent[0].category}
                    </span>
                    <span className="label">{recent[0].publication}</span>
                    <span className="label">{formatDate(recent[0].date)}</span>
                  </div>
                  <h3 className="featured-article__title heading-xl">
                    {recent[0].title}
                  </h3>
                  <p className="featured-article__excerpt body-lg">
                    {recent[0].excerpt}
                  </p>
                  <span className="featured-article__cta">
                    Read{" "}
                    <ArrowRight
                      size={16}
                      strokeWidth={2}
                      className="featured-article__arrow"
                    />
                  </span>
                </Link>
              </article>
            </FadeIn>

            {/* Secondary articles */}
            <div className="featured-writings__secondary">
              {recent.slice(1, 4).map((article, idx) => (
                <FadeIn key={article.id} delay={idx * 90}>
                  <article className="writing-item">
                    <Link
                      to={`/writings/${article.slug}`}
                      className="writing-item__inner"
                    >
                      <div className="writing-item__num label">
                        {String(idx + 2).padStart(2, "0")}
                      </div>
                      <div className="writing-item__body">
                        <div className="writing-item__meta">
                          <span className="label label--accent">
                            {article.category.split(" ")[0]}
                          </span>
                          <span className="label">{article.publication}</span>
                          <span className="label">{article.year}</span>
                        </div>
                        <h3 className="writing-item__title heading-md">
                          {article.title}
                        </h3>
                        <p className="writing-item__excerpt body-sm">
                          {article.excerpt.slice(0, 140)}…
                        </p>
                      </div>
                      <ArrowRight
                        size={18}
                        strokeWidth={1.5}
                        className="writing-item__arrow"
                      />
                    </Link>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION QUOTE ── */}
      <FadeIn>
        <section className="mission-strip" aria-label="Personal mission">
          <div className="container--text mission-strip__inner">
            <blockquote className="mission-strip__quote">
              <p className="display-md">
                "Institutions shape societies. Education shapes the people who
                build those institutions."
              </p>
              <footer className="mission-strip__attribution">
                <cite className="label">— Shobhit Mathur</cite>
              </footer>
            </blockquote>
          </div>
        </section>
      </FadeIn>

      {/* ── AREAS OF FOCUS ── */}
      <section className="areas" aria-labelledby="areas-heading">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <h2 className="section-header__title label" id="areas-heading">
                Areas of Focus
              </h2>
            </div>
          </FadeIn>

          <div className="areas__grid">
            {PROFILE.areasOfFocus.map((area, idx) => (
              <FadeIn key={area.area} delay={idx * 100}>
                <div className="area-card">
                  <h3 className="area-card__title heading-md">{area.area}</h3>
                  <p className="area-card__desc body-md">{area.description}</p>
                  <Link
                    to={`/writings?category=${encodeURIComponent(area.area)}`}
                    className="area-card__link label label--accent"
                  >
                    Read essays →
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ──
      <FadeIn>
        <section className="publications-strip" aria-label="Published in">
          <div className="container publications-strip__inner">
            <p className="publications-strip__label label">Published in</p>
            <div
              className="publications-strip__logos"
              aria-label="Publications list"
            >
              {PROFILE.featuredPublications.map((pub) => (
                <span key={pub} className="publications-strip__pub">
                  {pub}
                </span>
              ))}
            </div>
          </div>
        </section>
      </FadeIn> */}

    </div>
  );
}
