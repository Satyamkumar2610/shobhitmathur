import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { PROFILE } from "../data/profile";
import FadeIn from "../components/FadeIn";
import "./About.css";

function AutoSlider({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;
    let intervalId: ReturnType<typeof setInterval>;

    const scrollNext = () => {
      if (!slider) return;
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft >= maxScrollLeft - 10) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const slideWidth = slider.querySelector(".about-gallery__slide")?.clientWidth || 0;
        slider.scrollBy({ left: slideWidth + 24, behavior: "smooth" });
      }
    };

    intervalId = setInterval(scrollNext, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="about-gallery__slider" ref={scrollRef}>
      {children}
    </div>
  );
}

export default function About() {
  return (
    <div className="about-page">
      {/* ── PAGE HEADER ── */}
      <section className="about-hero" aria-label="About introduction">
        <div className="container about-hero__inner">
          {/* Portrait placeholder */}
          <div className="about-hero__portrait-wrap" aria-hidden="true">
            <div className="about-hero__portrait img-reveal" style={{ "--d": "80ms" } as React.CSSProperties}>
              <img
                src="/images/new-portrait.jpg"
                alt="Shobhit Mathur"
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
            <p className="about-hero__tagline heading-md">{PROFILE.mission}</p>

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

      {/* ── AREAS OF FOCUS ── */}
      <section className="about-focus" aria-labelledby="focus-heading">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <h2 className="section-header__title label" id="focus-heading">
                Areas of Focus
              </h2>
            </div>
          </FadeIn>

          <div className="about-focus__grid">
            {PROFILE.areasOfFocus.map((area, idx) => (
              <FadeIn key={area.area} delay={idx * 100}>
                <div className="about-focus__card">
                  <h3 className="heading-md about-focus__card-title">
                    {area.area}
                  </h3>
                  <p className="body-md">{area.description}</p>
                  <Link
                    to={`/writings?category=${encodeURIComponent(area.area)}`}
                    className="about-focus__card-link label label--accent"
                  >
                    Browse essays →
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── AFFILIATIONS ── */}
      <section
        className="about-affiliations"
        aria-labelledby="affiliations-heading"
      >
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <h2
                className="section-header__title label"
                id="affiliations-heading"
              >
                Roles & Affiliations
              </h2>
            </div>
          </FadeIn>

          <FadeIn>
            <ul className="about-roles" aria-label="Affiliations">
              {PROFILE.affiliations.map((a, i) => {
                const featured = i === 0;
                const body = (
                  <>
                    {featured && (
                      <span className="about-role__badge label">
                        Current role
                      </span>
                    )}
                    <span className="about-role__title label">{a.role}</span>
                    <span
                      className={`about-role__org ${featured ? "display-sm" : "heading-md"}`}
                    >
                      {a.org}
                    </span>
                    {a.url && (
                      <span className="about-role__link body-sm">
                        {a.url.replace(/^https?:\/\//, "")}
                        <ArrowUpRight size={14} strokeWidth={1.5} />
                      </span>
                    )}
                  </>
                );
                return (
                  <li
                    key={a.org}
                    className={`about-role ${featured ? "about-role--featured" : ""}`}
                  >
                    {a.url ? (
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-role__inner"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="about-role__inner">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="about-education" aria-labelledby="education-heading">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <h2
                className="section-header__title label"
                id="education-heading"
              >
                Academic Background
              </h2>
            </div>
          </FadeIn>

          <FadeIn>
            <ul className="about-education__grid" aria-label="Education">
              {PROFILE.education.map((e) => (
                <li key={e.institution} className="about-education__card">
                  <span className="about-education__degree label">
                    {e.degree}
                  </span>
                  <span className="about-education__inst heading-md">
                    {e.institution}
                  </span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="about-gallery" aria-label="Speaking and Engagements">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <h2 className="section-header__title label">In Action</h2>
            </div>
          </FadeIn>
          
          <FadeIn delay={100}>
            <AutoSlider>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <div key={num} className="about-gallery__slide">
                  <img
                    src={`/images/gallery-${num}.jpg`}
                    alt={`Shobhit Mathur gallery image ${num}`}
                    className="about-gallery__img"
                    loading="lazy"
                  />
                </div>
              ))}
            </AutoSlider>
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
