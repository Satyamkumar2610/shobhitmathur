import { useState, useRef } from "react";
import {
  Mail,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Send,
  CheckCircle,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { PROFILE } from "../data/profile";
import { useInView } from "../hooks/useScroll";
import "./Contact.css";

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref as any}
      className={`fade-in ${inView ? "fade-in--visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">(
    "idle"
  );
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    // Simulate sending — in production, wire up to a backend
    setTimeout(() => {
      setFormState("sent");
      formRef.current?.reset();
      setTimeout(() => setFormState("idle"), 4000);
    }, 1500);
  };

  const institutions = [
    { name: "Rishihood University", role: "Co-Founder & Vice Chancellor" },
    { name: "Rashtram", role: "Initiative" },
    { name: "Vision India Foundation", role: "Co-founder" },
    { name: "Indian School of Business", role: "Alumni" },
    { name: "University of Washington", role: "Alumni" },
    { name: "IIT Bombay", role: "Alumni" },
    { name: "Amazon", role: "Former" },
  ];

  return (
    <div className="contact-page">
      {/* ===== HERO ===== */}
      <section className="contact-hero">
        <div className="container">
          <FadeIn>
            <div className="contact-hero__inner">
              <div className="contact-hero__text">
                <p className="label label--accent contact-hero__eyebrow">
                  Get in Touch
                </p>
                <h1 className="display-2xl contact-hero__title">
                  Let's start a
                  <br />
                  conversation.
                </h1>
                <p className="body-lg contact-hero__intro">
                  For speaking engagements, media inquiries, collaboration on
                  education and policy initiatives, or simply to connect —
                  I&rsquo;d love to hear from you.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== MAIN CONTENT: TWO-COLUMN ===== */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-main__grid">
            {/* LEFT COLUMN — Info & Social */}
            <div className="contact-main__left">
              {/* Direct Contact */}
              <FadeIn>
                <div className="contact-block">
                  <h2 className="label contact-block__heading">
                    Direct Contact
                  </h2>

                  <div className="contact-info-stack">
                    {/* Email */}
                    <a
                      href={`mailto:${PROFILE.social.email}`}
                      className="contact-info-row contact-info-row--link"
                    >
                      <div className="contact-info-row__icon">
                        <Mail size={18} strokeWidth={1.5} />
                      </div>
                      <div className="contact-info-row__body">
                        <span className="contact-info-row__label">Email</span>
                        <span className="contact-info-row__value">
                          {PROFILE.social.email}
                        </span>
                      </div>
                      <ArrowRight
                        className="contact-info-row__arrow"
                        size={16}
                        strokeWidth={1.5}
                      />
                    </a>

                    {/* Location */}
                    <a
                      href="https://maps.app.goo.gl/LworjCYFD5Wei7iW7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-info-row contact-info-row--link"
                    >
                      <div className="contact-info-row__icon">
                        <MapPin size={18} strokeWidth={1.5} />
                      </div>
                      <div className="contact-info-row__body">
                        <span className="contact-info-row__label">
                          Location
                        </span>
                        <span className="contact-info-row__value">
                          Sonipat, Haryana, India
                        </span>
                      </div>
                      <ArrowUpRight
                        className="contact-info-row__arrow"
                        size={16}
                        strokeWidth={1.5}
                      />
                    </a>
                  </div>
                </div>
              </FadeIn>

              {/* Connect Online */}
              <FadeIn delay={100}>
                <div className="contact-block">
                  <h2 className="label contact-block__heading">
                    Connect Online
                  </h2>

                  <div className="contact-social-stack">
                    {/* LinkedIn */}
                    <a
                      href={PROFILE.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-row"
                    >
                      <div className="contact-social-row__icon contact-social-row__icon--linkedin">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </div>
                      <div className="contact-social-row__body">
                        <span className="contact-social-row__name">
                          LinkedIn
                        </span>
                        <span className="contact-social-row__handle">
                          @shobhitmathur
                        </span>
                      </div>
                      <ArrowUpRight
                        className="contact-social-row__arrow"
                        size={16}
                        strokeWidth={1.5}
                      />
                    </a>

                    {/* X (Twitter) */}
                    <a
                      href={PROFILE.social.twitter!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-row"
                    >
                      <div className="contact-social-row__icon contact-social-row__icon--x">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </div>
                      <div className="contact-social-row__body">
                        <span className="contact-social-row__name">
                          X (Twitter)
                        </span>
                        <span className="contact-social-row__handle">
                          {PROFILE.social.twitterHandle}
                        </span>
                      </div>
                      <ArrowUpRight
                        className="contact-social-row__arrow"
                        size={16}
                        strokeWidth={1.5}
                      />
                    </a>

                    {/* Instagram */}
                    <a
                      href={PROFILE.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-row"
                    >
                      <div className="contact-social-row__icon contact-social-row__icon--instagram">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </div>
                      <div className="contact-social-row__body">
                        <span className="contact-social-row__name">
                          Instagram
                        </span>
                        <span className="contact-social-row__handle">
                          @shob.hit.mathur
                        </span>
                      </div>
                      <ArrowUpRight
                        className="contact-social-row__arrow"
                        size={16}
                        strokeWidth={1.5}
                      />
                    </a>
                  </div>
                </div>
              </FadeIn>

              {/* Institutions Ticker */}
              <FadeIn delay={200}>
                <div className="contact-block">
                  <h2 className="label contact-block__heading">
                    Affiliated Institutions
                  </h2>
                  <div className="contact-institutions">
                    {institutions.map((inst) => (
                      <div className="contact-institution" key={inst.name}>
                        <div className="contact-institution__icon">
                          {inst.role.includes("Alumni") ? (
                            <GraduationCap size={14} strokeWidth={1.5} />
                          ) : (
                            <Briefcase size={14} strokeWidth={1.5} />
                          )}
                        </div>
                        <div className="contact-institution__body">
                          <span className="contact-institution__name">
                            {inst.name}
                          </span>
                          <span className="contact-institution__role">
                            {inst.role}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* RIGHT COLUMN — Contact Form */}
            <div className="contact-main__right">
              <FadeIn delay={150}>
                <div className="contact-form-wrapper">
                  <div className="contact-form-header">
                    <h2 className="heading-md contact-form-header__title">
                      Send a message
                    </h2>
                    <p className="body-sm contact-form-header__desc">
                      I'll get back to you as soon as possible. All fields
                      marked with * are required.
                    </p>
                  </div>

                  <form
                    ref={formRef}
                    className="contact-form"
                    onSubmit={handleSubmit}
                  >
                    <div className="contact-form__row contact-form__row--half">
                      <div className="contact-form__field">
                        <label
                          htmlFor="contact-name"
                          className="contact-form__label"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          required
                          className="contact-form__input"
                          placeholder="Your name"
                          autoComplete="name"
                        />
                      </div>
                      <div className="contact-form__field">
                        <label
                          htmlFor="contact-email"
                          className="contact-form__label"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          required
                          className="contact-form__input"
                          placeholder="you@example.com"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className="contact-form__field">
                      <label
                        htmlFor="contact-subject"
                        className="contact-form__label"
                      >
                        Subject *
                      </label>
                      <select
                        id="contact-subject"
                        name="subject"
                        required
                        className="contact-form__input contact-form__select"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select a topic
                        </option>
                        <option value="speaking">Speaking Engagement</option>
                        <option value="media">Media & Press Inquiry</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="education">
                          Education & Policy Discussion
                        </option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>

                    <div className="contact-form__field">
                      <label
                        htmlFor="contact-org"
                        className="contact-form__label"
                      >
                        Organization
                      </label>
                      <input
                        type="text"
                        id="contact-org"
                        name="organization"
                        className="contact-form__input"
                        placeholder="Your organization (optional)"
                        autoComplete="organization"
                      />
                    </div>

                    <div className="contact-form__field">
                      <label
                        htmlFor="contact-message"
                        className="contact-form__label"
                      >
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={6}
                        className="contact-form__input contact-form__textarea"
                        placeholder="Tell me about your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      className={`contact-form__submit btn btn--primary ${formState === "sending" ? "contact-form__submit--sending" : ""} ${formState === "sent" ? "contact-form__submit--sent" : ""}`}
                      disabled={formState !== "idle"}
                    >
                      {formState === "idle" && (
                        <>
                          <Send size={16} strokeWidth={1.5} />
                          Send Message
                        </>
                      )}
                      {formState === "sending" && (
                        <>
                          <span className="contact-form__spinner" />
                          Sending...
                        </>
                      )}
                      {formState === "sent" && (
                        <>
                          <CheckCircle size={16} strokeWidth={1.5} />
                          Message Sent!
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>


      {/* ===== CLOSING STRIP ===== */}
      <section className="contact-closing">
        <div className="container">
          <FadeIn>
            <div className="contact-closing__inner">
              <p className="display-md contact-closing__quote">
                Institutions shape societies. Education shapes the people who
                build those institutions.
              </p>
              <cite className="label contact-closing__attr">
                — Shobhit Mathur
              </cite>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
