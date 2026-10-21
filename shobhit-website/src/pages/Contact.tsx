import { useState, useRef } from "react";
import { Send, CheckCircle } from "lucide-react";
import { PROFILE } from "../data/profile";
import FadeIn from "../components/FadeIn";
import { useSEO } from "../hooks/useSEO";
import "./Contact.css";

export default function Contact() {
  useSEO({
    title: "Contact — Shobhit Mathur",
    description:
      "Get in touch with Shobhit Mathur, Vice Chancellor and Co-Founder of Rishihood University, for speaking engagements, collaborations, or media inquiries.",
    path: "/contact",
  });

  const [formState, setFormState] = useState<"idle" | "sending" | "sent">(
    "idle"
  );
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    const formData = new FormData(formRef.current!);
    // Anti-spam Honeypot Check
    if (formData.get("botcheck")) {
      setFormState("idle");
      return; // Silently reject if botcheck field is filled
    }

    // Web3Forms access keys: each key delivers to its own inbox, so the same
    // message is submitted once per key, in parallel.
    const accessKeys: string[] = [
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
        atob("YTkxZTA3MzctNGZmMC00OWFmLWI2OTMtMWIyMzEzMmQyMjVl"),
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY_2 ||
        "da5c2337-5dbe-4430-9ddb-0c3ef448b201",
    ];

    const send = async (key: string) => {
      const body = new FormData();
      formData.forEach((value, name) => body.append(name, value));
      body.set("access_key", key);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body,
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || "Submission failed");
    };

    try {
      const results = await Promise.allSettled(accessKeys.map(send));
      if (results.some((r) => r.status === "fulfilled")) {
        results.forEach((r) => {
          if (r.status === "rejected") console.error("A delivery failed", r.reason);
        });
        setFormState("sent");
        formRef.current?.reset();
        setTimeout(() => setFormState("idle"), 4000);
      } else {
        console.error("Form submission failed", results);
        setFormState("idle");
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setFormState("idle");
      alert("Network error. Please try again later.");
    }
  };

  return (
    <div className="contact-page">
      {/* ===== HERO ===== */}
      <section className="contact-hero">
        <div className="container">
          <FadeIn>
            <div className="contact-hero__inner">
              <h1 className="display-2xl contact-hero__title">
                Get in Touch
              </h1>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== MAIN CONTENT: SINGLE COLUMN ===== */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-main__single">
            <FadeIn>
              <div className="contact-form-wrapper">
                  <div className="contact-form-header">
                    <h2 className="heading-md contact-form-header__title">
                      Send a message
                    </h2>
                    <p className="body-sm contact-form-header__desc">
                      All fields marked with * are required.
                    </p>
                  </div>

                  <form
                    ref={formRef}
                    className="contact-form"
                    onSubmit={handleSubmit}
                  >
                    <div className="contact-form__row contact-form__row--half">
                      {/* Honeypot Spam Protection */}
                      <input
                        type="checkbox"
                        name="botcheck"
                        className="hidden"
                        style={{ display: "none" }}
                      />
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
                        Organization *
                      </label>
                      <input
                        type="text"
                        id="contact-org"
                        name="organization"
                        required
                        className="contact-form__input"
                        placeholder="Your organization"
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

              {/* Thumbnails of Social Icons Below Form */}
              <FadeIn delay={100}>
                <div className="contact-thumbnails">
                  <a
                    href={PROFILE.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-thumbnail"
                    aria-label="LinkedIn"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a
                    href={PROFILE.social.twitter!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-thumbnail"
                    aria-label="X (Twitter)"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href={PROFILE.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-thumbnail"
                    aria-label="Instagram"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </div>
              </FadeIn>
          </div>
        </div>
      </section>

    </div>
  );
}
