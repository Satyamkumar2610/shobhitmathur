import { useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { JOURNEY } from "../data/journey";
import "./JourneyDeck.css";

const pad = (n: number) => String(n).padStart(2, "0");

export default function JourneyDeck() {
  const [idx, setIdx] = useState(0);
  const startX = useRef<number | null>(null);
  const last = JOURNEY.length - 1;
  const go = (i: number) => setIdx(Math.max(0, Math.min(last, i)));
  const cur = JOURNEY[idx];

  const onPointerDown = (e: PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (dx < -45) go(idx + 1);
    else if (dx > 45) go(idx - 1);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(idx + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(idx - 1);
    }
  };

  return (
    <section
      className="journey"
      aria-labelledby="journey-heading"
      aria-roledescription="carousel"
      onKeyDown={onKeyDown}
    >
      <div className="container journey__head">
        <div className="journey__intro">
          <p className="label label--accent">Journey</p>
          <h2 id="journey-heading" className="journey__title">
            From engineer to institution builder.
          </h2>
          <p className="journey__lede">
            Nine chapters across technology, service and institution building.
          </p>
        </div>
        <div className="journey__controls">
          <p className="journey__count" aria-live="polite">
            <span className="journey__count-n">{pad(idx + 1)}</span>
            <span className="journey__count-of">
              / {pad(JOURNEY.length)} · {cur.part}
            </span>
          </p>
          <div className="journey__arrows">
            <button
              type="button"
              className="journey__arrow"
              aria-label="Previous chapter"
              onClick={() => go(idx - 1)}
              disabled={idx === 0}
            >
              <ChevronLeft size={20} strokeWidth={1.6} />
            </button>
            <button
              type="button"
              className="journey__arrow"
              aria-label="Next chapter"
              onClick={() => go(idx + 1)}
              disabled={idx === last}
            >
              <ChevronRight size={20} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>

      <div
        className="journey__viewport"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (startX.current = null)}
      >
        <div
          className="journey__track"
          style={{ "--idx": idx } as CSSProperties}
        >
          {JOURNEY.map((s, i) => {
            const active = i === idx;
            return (
              <article
                key={s.id}
                className={`journey-card${active ? " is-active" : ""}`}
                aria-roledescription="slide"
                aria-label={`${pad(i + 1)} of ${pad(JOURNEY.length)}: ${s.title}`}
                aria-hidden={!active}
                onClick={active ? undefined : () => go(i)}
              >
                <div className="journey-card__media">
                  <img
                    src={s.image.src}
                    alt={s.image.alt}
                    draggable={false}
                    loading={Math.abs(i - idx) <= 1 ? "eager" : "lazy"}
                    className={s.image.contain ? "is-contain" : undefined}
                    style={s.image.position ? { objectPosition: s.image.position } : undefined}
                  />
                  <span className="journey-card__part">{s.part}</span>
                </div>
                <div className="journey-card__body">
                  <p className="journey-card__meta">
                    <span className="journey-card__n">{pad(i + 1)}</span>
                    {s.years && <span className="journey-card__years">{s.years}</span>}
                  </p>
                  <h3 className="journey-card__title">{s.title}</h3>
                  <p className="journey-card__role">
                    {s.role}
                    {s.place && <span> · {s.place}</span>}
                  </p>
                  <p className="journey-card__text">{s.text}</p>
                  {s.quote && (
                    <blockquote className="journey-card__quote">
                      “{s.quote.text}”
                      {s.quote.source && <cite>{s.quote.source}</cite>}
                    </blockquote>
                  )}
                  {s.facts && <p className="journey-card__facts">{s.facts}</p>}
                  {s.thumbs && s.thumbs.length > 0 && (
                    <div className="journey-card__thumbs">
                      {s.thumbs.map((t) => (
                        <img key={t.src} src={t.src} alt={t.alt} loading="lazy" draggable={false} />
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <nav className="container journey__rail" aria-label="Journey chapters">
        <div className="journey__rail-line" aria-hidden="true">
          <span style={{ width: `${(idx / last) * 100}%` }} />
        </div>
        <ol>
          {JOURNEY.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`${pad(i + 1)}: ${s.title}`}
                aria-current={i === idx ? "step" : undefined}
                className={`journey__stop${i === idx ? " is-active" : ""}${i < idx ? " is-past" : ""}`}
              >
                <span className="journey__dot" />
                <span className="journey__stop-label">{s.short}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
