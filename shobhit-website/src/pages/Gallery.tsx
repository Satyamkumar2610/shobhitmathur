import { useCallback, useEffect, useState } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { GALLERY, thumbSrc, fullSrc } from "../data/gallery";
import { useInView } from "../hooks/useScroll";
import { useSEO } from "../hooks/useSEO";
import FadeIn from "../components/FadeIn";
import "./Gallery.css";

function Tile({
  index,
  onOpen,
}: {
  index: number;
  onOpen: (i: number) => void;
}) {
  const img = GALLERY[index];
  const { ref, inView } = useInView(0.08);

  return (
    <button
      ref={ref}
      type="button"
      className={`gal__item ${inView ? "gal__item--in" : ""}`}
      style={
        {
          "--ar": img.ratio,
          "--i": index % 5,
        } as React.CSSProperties
      }
      onClick={() => onOpen(index)}
      aria-label={`View image ${index + 1}: ${img.caption}`}
    >
      <span className="gal__media">
        <img
          src={thumbSrc(img.file)}
          alt={img.caption}
          loading={index < 4 ? "eager" : "lazy"}
          decoding="async"
        />
      </span>
      <span className="gal__overlay" aria-hidden="true">
        <span className="gal__num label">{String(index + 1).padStart(2, "0")}</span>
        <span className="gal__caption">{img.caption}</span>
        <span className="gal__rule" />
      </span>
    </button>
  );
}

function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const img = GALLERY[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onStep]);

  // Warm the neighbouring full-size images so stepping feels instant
  useEffect(() => {
    [index - 1, index + 1].forEach((i) => {
      const n = GALLERY[(i + GALLERY.length) % GALLERY.length];
      if (n) new Image().src = fullSrc(n.file);
    });
  }, [index]);

  return (
    <div
      className="lbox"
      role="dialog"
      aria-modal="true"
      aria-label={img.caption}
      onClick={onClose}
    >
      <button className="lbox__close" onClick={onClose} aria-label="Close">
        <X size={20} strokeWidth={1.5} />
      </button>

      <button
        className="lbox__nav lbox__nav--prev"
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
        aria-label="Previous image"
      >
        <ArrowLeft size={20} strokeWidth={1.5} />
      </button>

      <figure className="lbox__figure" onClick={(e) => e.stopPropagation()}>
        <img key={img.file} src={fullSrc(img.file)} alt={img.caption} />
        <figcaption className="lbox__cap">
          <span className="lbox__cap-text">{img.caption}</span>
          <span className="lbox__count label">
            {String(index + 1).padStart(2, "0")} / {GALLERY.length}
          </span>
        </figcaption>
      </figure>

      <button
        className="lbox__nav lbox__nav--next"
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        aria-label="Next image"
      >
        <ArrowRight size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
}

export default function Gallery() {
  useSEO({
    title: "Gallery — Shobhit Mathur",
    description:
      "Photographs of Shobhit Mathur at lectures, panels, convocations, policy forums, and institutional milestones at Rishihood University and beyond.",
    path: "/gallery",
  });

  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback((delta: number) => {
    setOpen((cur) =>
      cur === null ? cur : (cur + delta + GALLERY.length) % GALLERY.length,
    );
  }, []);

  const close = useCallback(() => setOpen(null), []);

  return (
    <div className="gallery-page">
      <section className="page-header">
        <div className="container">
          <FadeIn>
            <p className="label label--accent page-header__eyebrow">Gallery</p>
            <h1 className="display-md page-header__title">In action</h1>
            <p className="body-lg page-header__intro">
              Lectures, panels, convocations, and institutional milestones —
              from the most recent, going back.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="gal" aria-label="Photo gallery">
        <div className="container">
          <div className="gal__grid">
            {GALLERY.map((img, i) => (
              <Tile key={img.file} index={i} onOpen={setOpen} />
            ))}
            {/* Absorbs the last row's slack so trailing images aren't stretched */}
            <i className="gal__filler" aria-hidden="true" />
          </div>
        </div>
      </section>

      {open !== null && (
        <Lightbox index={open} onClose={close} onStep={step} />
      )}
    </div>
  );
}
