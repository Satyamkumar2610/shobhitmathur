import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { PROFILE } from "../data/profile";
import { GALLERY, FEATURED, thumbSrc } from "../data/gallery";
import FadeIn from "../components/FadeIn";
import JourneyDeck from "../components/JourneyDeck";
import { useSEO } from "../hooks/useSEO";
import "./About.css";

export default function About() {
  useSEO({
    title: "About — Shobhit Mathur",
    description:
      "Shobhit Mathur's journey from technology at Amazon to social transformation and building Rishihood University as Vice Chancellor and Co-Founder.",
    path: "/about",
  });

  return (
    <div className="about-page">
      {/* ── PAGE HEADER ── */}
      <section className="about-hero" aria-label="About introduction">
        <div className="container about-hero__inner">
          {/* Portrait placeholder */}
          <div className="about-hero__portrait-wrap" aria-hidden="true">
            <div className="about-hero__portrait img-reveal" style={{ "--d": "80ms" } as React.CSSProperties}>
              <img
                src="/images/about-portrait-2026.jpg"
                alt="Shobhit Mathur speaking on a panel"
                loading="eager"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>

          {/* Bio intro */}
          <div className="about-hero__content">
            <p
              className="label label--accent"
              style={{ marginBottom: "var(--space-4)" }}
            >
              About
            </p>
            <h1 className="display-md about-hero__name">Shobhit Mathur</h1>
            <p className="about-hero__title body-md">{PROFILE.title}</p>

            <p className="body-lg about-hero__intro">{PROFILE.intro}</p>

            {PROFILE.social.linkedin && (
              <a
                href={PROFILE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary about-hero__linkedin"
              >
                <ExternalLink size={16} strokeWidth={1.5} />
                Connect on LinkedIn
                <ArrowUpRight size={16} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── BIO SECTIONS ── */}
      <section className="about-bio" aria-label="Biography">
        <div className="container">
          {PROFILE.bioSections.map((section) => (
            <FadeIn key={section.heading}>
              <article className="about-chapter">
                <header className="about-chapter__head">
                  <h2 className="heading-lg about-chapter__title">
                    {section.heading}
                  </h2>
                </header>
                <div className="about-chapter__body">
                  {section.body.split("\n\n").map((para, i) => (
                    <p key={i} className="body-lg about-chapter__para">
                      {para}
                    </p>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <JourneyDeck />

      {/* ── COMMITTEES ── */}
      <section
        className="about-committees-section"
        aria-labelledby="committees-heading"
      >
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <h2
                className="section-header__title label"
                id="committees-heading"
              >
                Government & Policy Committees
              </h2>
            </div>
          </FadeIn>

          <FadeIn>
            <ul className="about-committees" aria-label="Committee appointments">
              {PROFILE.committees.map((c) => (
                <li key={c.committee} className="about-committee">
                  <span className="about-committee__role label label--accent">
                    {c.role}
                  </span>
                  <div className="about-committee__body">
                    <h3 className="about-committee__title heading-md">
                      {c.committee}
                    </h3>
                    <p className="about-committee__meta body-sm">
                      {c.body} · {c.date}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* ── GALLERY TEASER ── */}
      <section className="about-gallery" aria-label="Photographs">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <h2 className="section-header__title label">In Action</h2>
              <Link to="/gallery" className="section-header__link body-sm">
                View all {GALLERY.length} photographs{" "}
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="about-gallery__strip">
              {FEATURED.map((img) => (
                <Link
                  key={img.file}
                  to="/gallery"
                  className="about-gallery__tile"
                  aria-label={`Gallery — ${img.caption}`}
                >
                  <img src={thumbSrc(img.file)} alt={img.caption} loading="lazy" />
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CLOSING STRIP (Transferred from Contact) ── */}
      <section className="about-closing">
        <div className="container">
          <FadeIn>
            <div className="about-closing__inner">
              <p className="display-md about-closing__quote">
                {PROFILE.mission}
              </p>
              <cite className="label about-closing__attr">
                — Shobhit Mathur
              </cite>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
