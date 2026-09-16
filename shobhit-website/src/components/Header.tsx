import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useScrolled } from "../hooks/useScroll";
import { PROFILE } from "../data/profile";
import "./Header.css";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Writings", href: "/writings" },
  { label: "Talks", href: "/talks" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const scrolled = useScrolled(40);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <header
        className={`header ${scrolled ? "header--scrolled" : ""}`}
        role="banner"
      >
        <div className="header__inner">
          {/* Logo / Name */}
          <Link
            to="/"
            className="header__name"
            aria-label="Shobhit Mathur — Home"
          >
            <span className="header__name-text">Shobhit Mathur</span>
            <span className="header__name-sub">Vice Chancellor · Writer</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="header__nav" aria-label="Main navigation">
            <ul className="header__nav-list" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.label} className="header__nav-item">
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="header__nav-link"
                    >
                      {link.label}
                      <span className="header__nav-link-line" />
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className={`header__nav-link ${isActive(link.href) ? "header__nav-link--active" : ""}`}
                    >
                      {link.label}
                      <span className="header__nav-link-line" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="header__menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            {menuOpen ? (
              <X size={20} strokeWidth={1.5} />
            ) : (
              <Menu size={20} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <div
        className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div
          className="mobile-nav__backdrop"
          onClick={() => setMenuOpen(false)}
        />
        <nav className="mobile-nav__panel" aria-label="Mobile navigation">
          <div className="mobile-nav__header">
            <span className="header__name-text">Shobhit Mathur</span>
            <button
              className="mobile-nav__close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
          <ul className="mobile-nav__list" role="list">
            <li>
              <Link
                to="/"
                className={`mobile-nav__link ${location.pathname === "/" ? "mobile-nav__link--active" : ""}`}
              >
                Home
              </Link>
            </li>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-nav__link"
                  >
                    {link.label} ↗
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className={`mobile-nav__link ${isActive(link.href) ? "mobile-nav__link--active" : ""}`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mobile-nav__footer">
            <p className="label">Vice Chancellor, Rishihood University</p>
          </div>
        </nav>
      </div>
    </>
  );
}
