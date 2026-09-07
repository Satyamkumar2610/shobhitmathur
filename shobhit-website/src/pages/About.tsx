import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { ARTICLES } from '../data/articles';
import { useInView } from '../hooks/useScroll';
import './About.css';

function FadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref as any} className={`fade-in ${inView ? 'fade-in--visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

export default function About() {
  const totalArticles = ARTICLES.length;

  return (
    <div className="about-page">
      {/* ── PAGE HEADER ── */}
      <section className="about-hero" aria-label="About introduction">
        <div className="container about-hero__inner">
          {/* Portrait placeholder */}
          <div className="about-hero__portrait-wrap" aria-hidden="true">
            <div className="about-hero__portrait">
              {/* Add your photo: public/images/about-portrait.jpg */}
              <img
                src="/images/about-portrait.jpg"
                alt="Shobhit Mathur"
                loading="eager"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="about-hero__portrait-initials">SM</div>
            </div>
          </div>

          {/* Bio intro */}
          <div className="about-hero__content">
            <p className="label label--accent" style={{ marginBottom: 'var(--space-4)' }}>About</p>
            <h1 className="display-md about-hero__name">Shobhit Mathur</h1>
            <p className="about-hero__title body-md">{PROFILE.title}</p>
            <p className="about-hero__tagline heading-md">
              {PROFILE.mission}
            </p>

            <p className="body-lg about-hero__intro">
              {PROFILE.intro}
            </p>

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
      <section className="about-bio" aria-labelledby="bio-heading">
        <div className="container--text about-bio__inner">
          {PROFILE.bioSections.map((section) => (
            <FadeIn key={section.heading}>
              <div className="about-bio__section">
                <h2 className="heading-md about-bio__section-heading">{section.heading}</h2>
                {section.body.split('\n\n').map((para, i) => (
                  <p key={i} className="body-lg about-bio__para">{para}</p>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── AREAS OF FOCUS ── */}
      <section className="about-focus" aria-labelledby="focus-heading">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <h2 className="section-header__title label" id="focus-heading">Areas of Focus</h2>
            </div>
          </FadeIn>

          <div className="about-focus__grid">
            {PROFILE.areasOfFocus.map((area) => (
              <FadeIn key={area.area}>
                <div className="about-focus__card">
                  <h3 className="heading-md about-focus__card-title">{area.area}</h3>
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
      <section className="about-affiliations" aria-labelledby="affiliations-heading">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <h2 className="section-header__title label" id="affiliations-heading">Roles & Affiliations</h2>
            </div>
          </FadeIn>

          <FadeIn>
            <ul className="about-affiliations__list" aria-label="Affiliations">
              {PROFILE.affiliations.map((a, i) => (
                <li key={i} className="about-affiliation-item">
                  <div className="about-affiliation-item__role label label--accent">{a.role}</div>
                  <div className="about-affiliation-item__org heading-md">
                    {a.url ? (
                      <a href={a.url} target="_blank" rel="noopener noreferrer" className="about-affiliation-item__link">
                        {a.org} <ArrowUpRight size={16} strokeWidth={1.5} className="about-affiliation-item__ext" />
                      </a>
                    ) : (
                      a.org
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="about-education" aria-labelledby="education-heading">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <h2 className="section-header__title label" id="education-heading">Academic Background</h2>
            </div>
          </FadeIn>

          <FadeIn>
            <ul className="about-education__list" aria-label="Education">
              {PROFILE.education.map((e, i) => (
                <li key={i} className="about-education__item">
                  <span className="about-education__degree body-md">{e.degree}</span>
                  <span className="about-education__inst label">{e.institution}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="about-gallery" aria-label="Speaking and Engagements">
        <div className="container">
          <div className="about-gallery__grid">
            <FadeIn>
              <div className="about-gallery__img-wrap">
                <img
                  src="/images/speaking-1.jpg"
                  alt="Shobhit Mathur speaking to an audience"
                  className="about-gallery__img"
                  loading="lazy"
                />
              </div>
            </FadeIn>
            <FadeIn>
              <div className="about-gallery__img-wrap">
                <img
                  src="/images/speaking-2.jpg"
                  alt="Shobhit Mathur engaging with the audience"
                  className="about-gallery__img"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── WRITINGS CTA ── */}
      <FadeIn>
        <section className="about-writings-cta" aria-label="Explore writings">
          <div className="container--narrow about-writings-cta__inner">
            <p className="label" style={{ marginBottom: 'var(--space-4)' }}>The Work</p>
            <h2 className="heading-xl about-writings-cta__title">
              {totalArticles} published writings across education, policy, and technology.
            </h2>
            <Link to="/writings" className="btn btn--primary btn--lg">
              Explore the archive
            </Link>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
