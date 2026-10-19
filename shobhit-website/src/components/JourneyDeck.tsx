import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { JOURNEY } from "../data/journey";
import type { JourneyImage } from "../data/journey";
import { useInView } from "../hooks/useScroll";
import "./JourneyDeck.css";

const pad = (n: number) => String(n).padStart(2, "0");
const SWIPE = 60; // px needed to change card
const EDGE_RESISTANCE = 0.3;
const AUTOPLAY_MS = 7000; // time each chapter stays before moving on

export default function JourneyDeck() {
  const [idx, setIdx] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [released, setReleased] = useState(false);
  const [lead, setLead] = useState<Record<number, number>>({});
  const startX = useRef<number | null>(null);
  const moved = useRef(false);
  const { ref, inView } = useInView(0.2);
  const [hovering, setHovering] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const sectionEl = useRef<HTMLElement | null>(null);

  const last = JOURNEY.length - 1;

  const go = (i: number, fromSwipe = false) => {
    setIdx(Math.max(0, Math.min(last, i)));
    setDrag(0);
    setDragging(false);
    setReleased(fromSwipe);
  };

  // Respect reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // Only autoplay while the section is actually on screen
  useEffect(() => {
    const el = sectionEl.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = onScreen && !hovering && !focusWithin && !dragging && !reduced;

  // Advance to the next chapter; loop back to the first after the last
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => {
      setIdx((i) => (i >= last ? 0 : i + 1));
      setReleased(false);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [playing, idx, last]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    startX.current = e.clientX;
    moved.current = false;
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    if (!moved.current && Math.abs(dx) < 6) return;
    if (!moved.current) {
      moved.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    const atEdge = (idx === 0 && dx > 0) || (idx === last && dx < 0);
    setDragging(true);
    setDrag(atEdge ? dx * EDGE_RESISTANCE : dx);
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (!moved.current) return;
    if (dx < -SWIPE) go(idx + 1, true);
    else if (dx > SWIPE) go(idx - 1, true);
    else {
      setDrag(0);
      setDragging(false);
      setReleased(true);
    }
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
      ref={(el) => {
        ref(el);
        sectionEl.current = el;
      }}
      className={`journey${inView ? " journey--in" : ""}${playing ? " is-playing" : ""}`}
      onFocus={(e) => {
        // Pause only for keyboard focus; mouse/touch clicks keep autoplay running
        if ((e.target as HTMLElement).matches(":focus-visible")) setFocusWithin(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusWithin(false);
      }}
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
          <p className="journey__sr" aria-live="polite">
            {JOURNEY[idx].title}
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
        className={`journey__viewport${dragging ? " is-dragging" : ""}${released ? " is-released" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setHovering(true);
        }}
        onPointerLeave={() => setHovering(false)}
      >
        <div
          className="journey__track"
          style={{ "--idx": idx, "--drag": `${drag}px` } as CSSProperties}
        >
          {JOURNEY.map((s, i) => {
            const active = i === idx;
            const photos: JourneyImage[] = [s.image, ...(s.thumbs ?? [])];
            const li = lead[i] ?? 0;
            const L = photos[li] ?? s.image;
            return (
              <article
                key={s.id}
                className={`journey-card${active ? " is-active" : ""}`}
                aria-roledescription="slide"
                aria-label={`${pad(i + 1)} of ${pad(JOURNEY.length)}: ${s.title}`}
                aria-hidden={!active}
                onClick={
                  active
                    ? undefined
                    : () => {
                        if (!moved.current) go(i);
                      }
                }
              >
                <div className="journey-card__media">
                  <img
                    key={L.src}
                    src={L.src}
                    alt={L.alt}
                    draggable={false}
                    loading={Math.abs(i - idx) <= 1 ? "eager" : "lazy"}
                    decoding="async"
                    className={`journey-card__lead${L.contain ? " is-contain" : ""}`}
                    style={L.position ? { objectPosition: L.position } : undefined}
                  />
                </div>
                <div className="journey-card__body">
                  {s.years && <p className="journey-card__years">{s.years}</p>}
                  <h3 className="journey-card__title">{s.title}</h3>
                  <p className="journey-card__role">
                    {s.role}
                  </p>
                  <p className="journey-card__text">{s.text}</p>
                  {s.quote && (
                    <blockquote className="journey-card__quote">
                      “{s.quote.text}”
                      {s.quote.source && <cite>{s.quote.source}</cite>}
                    </blockquote>
                  )}
                  {photos.length > 1 && (
                    <div className="journey-card__thumbs" role="group" aria-label="Photos">
                      {photos.map((p, j) => (
                        <button
                          key={p.src}
                          type="button"
                          className={`journey-card__thumb${j === li ? " is-on" : ""}`}
                          aria-label={`Show photo: ${p.alt}`}
                          aria-pressed={j === li}
                          tabIndex={active ? 0 : -1}
                          onClick={() => setLead((m) => ({ ...m, [i]: j }))}
                        >
                          <img src={p.src} alt="" loading="lazy" draggable={false} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="container journey__timer" aria-hidden="true">
        <span key={idx} />
      </div>

      <nav className="container journey__rail" aria-label="Journey chapters">
        <div className="journey__rail-line" aria-hidden="true">
          <span style={{ transform: `scaleX(${idx / last})` }} />
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
