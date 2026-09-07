import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { PROFILE } from '../data/profile';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        {/* Top row */}
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__name">Shobhit Mathur</Link>
            <p className="footer__tagline">{PROFILE.title}</p>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <Link to="/about" className="footer__nav-link">About</Link>
            <Link to="/writings" className="footer__nav-link">Writings</Link>
            {PROFILE.social.linkedin && (
              <a
                href={PROFILE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__nav-link footer__social-link"
                aria-label="LinkedIn Profile"
              >
                <ExternalLink size={14} strokeWidth={1.5} />
                <span>LinkedIn</span>
              </a>
            )}
          </nav>
        </div>

        {/* Divider */}
        <hr className="footer__divider" />

        {/* Bottom row */}
        <div className="footer__bottom">
          <p className="footer__copy label">
            © {year} Shobhit Mathur. All rights reserved.
          </p>
          <p className="footer__site-note label">
            Built with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
