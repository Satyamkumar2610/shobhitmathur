import { Link } from "react-router-dom";
import { ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";
import { PROFILE } from "../data/profile";
import { CATEGORIES } from "../data/articles";
import "./Footer.css";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Writings", href: "/writings" },
  { label: "Talks", href: "/talks" },
  { label: "Contact", href: "/contact" },
];

const TOPICS = CATEGORIES.filter((c) => c !== "All");

const SOCIAL = [
  {
    label: "LinkedIn",
    href: PROFILE.social.linkedin,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: PROFILE.social.twitter,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: PROFILE.social.instagram,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__cta">
          <div className="footer__cta-text">
            <p className="label footer__eyebrow">
              Speaking · Media · Collaboration
            </p>
            <h2 className="heading-lg footer__cta-title">
              Have an invitation or an idea to discuss?
            </h2>
          </div>
          <Link to="/contact" className="footer__cta-btn">
            Get in touch
            <ArrowRight size={18} strokeWidth={1.5} />
          </Link>
        </div>

        <div className="footer__main">
          <div className="footer__brand">
            <Link to="/" className="footer__name">
              Shobhit Mathur
            </Link>
            <p className="footer__tagline">{PROFILE.title}</p>
            <a
              href="https://rishihood.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__inline-link"
            >
              rishihood.edu.in
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          </div>

          <nav className="footer__col" aria-label="Footer navigation">
            <p className="footer__col-title label">Explore</p>
            <ul className="footer__list">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="footer__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <p className="footer__col-title label">Writing on</p>
            <ul className="footer__list">
              {TOPICS.map((topic) => (
                <li key={topic}>
                  <Link
                    to={`/writings?category=${encodeURIComponent(topic)}`}
                    className="footer__link"
                  >
                    {topic}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__col-title label">Follow</p>
            <div className="footer__social">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-btn"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy label">
            © {year} Shobhit Mathur. All rights reserved.
          </p>
          <button
            type="button"
            className="footer__top-btn label"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top
            <ArrowUp size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </footer>
  );
}
