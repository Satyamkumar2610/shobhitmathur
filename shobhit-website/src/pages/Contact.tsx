import { Mail, MapPin, Building, ExternalLink, ArrowRight } from "lucide-react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      {/* ===== HERO ===== */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero__inner">
            <div className="contact-hero__text">
              <p className="label label--accent contact-hero__eyebrow">
                Contact
              </p>
              <h1 className="display-2xl contact-hero__title">Get in touch.</h1>
              <p className="body-lg contact-hero__intro">
                For speaking engagements, media inquiries, or conversations
                about education and policy — reach out directly.
              </p>
            </div>
            <div className="contact-hero__divider" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ===== DIRECT CONTACT ===== */}
      <section className="contact-direct">
        <div className="container">
          <div className="contact-direct__inner">
            {/* Left: Label */}
            <div className="contact-direct__label">
              <h2 className="label contact-section-label">Direct Contact</h2>
            </div>

            {/* Right: Cards */}
            <div className="contact-direct__cards">
              {/* Email */}
              <a
                href="mailto:[EMAIL_PLACEHOLDER]"
                className="contact-info-card contact-info-card--link"
              >
                <div className="contact-info-card__icon">
                  <Mail size={20} strokeWidth={1.5} />
                </div>
                <div className="contact-info-card__body">
                  <span className="contact-info-card__label">Email</span>
                  <span className="contact-info-card__value">
                    [EMAIL_PLACEHOLDER]
                  </span>
                </div>
                <ArrowRight
                  className="contact-info-card__arrow"
                  size={18}
                  strokeWidth={1.5}
                />
              </a>

              {/* Office */}
              <div className="contact-info-card">
                <div className="contact-info-card__icon">
                  <Building size={20} strokeWidth={1.5} />
                </div>
                <div className="contact-info-card__body">
                  <span className="contact-info-card__label">Office</span>
                  <span className="contact-info-card__value">
                    Vice Chancellor's Office
                    <br />
                    Rishihood University
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="contact-info-card">
                <div className="contact-info-card__icon">
                  <MapPin size={20} strokeWidth={1.5} />
                </div>
                <div className="contact-info-card__body">
                  <span className="contact-info-card__label">Location</span>
                  <span className="contact-info-card__value">
                    [LOCATION_PLACEHOLDER]
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="container">
        <hr className="contact-rule" />
      </div>

      {/* ===== MEDIA & PRESS ===== */}
      <section className="contact-press-section">
        <div className="container">
          <div className="contact-direct__inner">
            <div className="contact-direct__label">
              <h2 className="label contact-section-label">Media & Press</h2>
            </div>

            <div className="contact-press-block">
              <p className="body-md contact-press-block__desc">
                For press inquiries, interviews, or high-resolution portraits,
                please contact the media team directly.
              </p>
              <div className="contact-press-block__items">
                <div className="contact-press-item">
                  <span className="label">Press Contact</span>
                  <a
                    href="mailto:[PRESS_EMAIL_PLACEHOLDER]"
                    className="contact-press-item__link"
                  >
                    [PRESS_EMAIL_PLACEHOLDER]
                  </a>
                </div>
                <div className="contact-press-item__sep" aria-hidden="true" />
                <div className="contact-press-item">
                  <span className="label">Press Kit</span>
                  <a
                    href="#"
                    className="contact-press-item__link contact-press-item__link--kit"
                  >
                    Download Press Kit
                    <ExternalLink size={14} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="container">
        <hr className="contact-rule" />
      </div>

      {/* ===== CONNECT ONLINE ===== */}
      <section className="contact-social-section">
        <div className="container">
          <div className="contact-direct__inner">
            <div className="contact-direct__label">
              <h2 className="label contact-section-label">Online</h2>
            </div>

            <div className="contact-social-grid">
              <a
                href="https://linkedin.com/in/[LINKEDIN_PLACEHOLDER]"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-card"
              >
                <div className="contact-social-card__icon contact-social-card__icon--linkedin">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div className="contact-social-card__body">
                  <span className="contact-social-card__name">LinkedIn</span>
                  <span className="contact-social-card__handle">
                    @[LINKEDIN_HANDLE_PLACEHOLDER]
                  </span>
                </div>
                <ArrowRight
                  className="contact-social-card__arrow"
                  size={16}
                  strokeWidth={1.5}
                />
              </a>

              <a
                href="[TWITTER_URL_PLACEHOLDER]"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-card"
              >
                <div className="contact-social-card__icon contact-social-card__icon--twitter">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 4l16 16M4 20L20 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path d="M3 4h4l10 12.5L20 4h-3l-7 8.5L5 4H3z" />
                  </svg>
                </div>
                <div className="contact-social-card__body">
                  <span className="contact-social-card__name">X (Twitter)</span>
                  <span className="contact-social-card__handle">
                    @[TWITTER_HANDLE_PLACEHOLDER]
                  </span>
                </div>
                <ArrowRight
                  className="contact-social-card__arrow"
                  size={16}
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CLOSING STRIP ===== */}
      <section className="contact-closing">
        <div className="container">
          <div className="contact-closing__inner">
            <p className="display-md contact-closing__quote">
              "Institutions shape societies. Education shapes the people who
              build those institutions."
            </p>
            <span className="label contact-closing__attr">
              — Shobhit Mathur
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
