import { useState } from "react";
import { Play, Calendar } from "lucide-react";
import { VIDEOS, type Video } from "../data/videos";
import { useInView } from "../hooks/useScroll";
import "./Talks.css";

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
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

export default function Talks() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [activeCategory, setActiveCategory] = useState<
    "All" | "Talks & Panels" | "Podcast" | "Short Clips"
  >("All");

  // Format dates: YYYY-MM-DD to Month Year (e.g. 2023-05-12 to May 2023)
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="talks-page">
      {/* ── HEADER ── */}
      <div className="talks-page__header">
        <div className="container">
          <div className="talks-page__title-row">
            <div>
              <p
                className="label label--accent"
                style={{ marginBottom: "var(--space-3)" }}
              >
                Media
              </p>
              <h1 className="display-lg talks-page__title">
                Talks & Interviews
              </h1>
              <p className="body-lg talks-page__intro">
                A selection of keynote addresses, panel discussions, and
                interviews on institutional building, public policy, and
                education reform.
              </p>
            </div>
          </div>

          {/* Category filters */}
          <div
            className="writings-filters"
            role="tablist"
            aria-label="Filter by category"
          >
            {["All", "Talks & Panels", "Podcast", "Short Clips"].map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`writings-filter-btn ${activeCategory === cat ? "writings-filter-btn--active" : ""}`}
                onClick={() => setActiveCategory(cat as any)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── VIDEO PLAYER MODAL ── */}
      {activeVideo && (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveVideo(null)}
        >
          <div className="video-modal__backdrop" />
          <div
            className="video-modal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="video-modal__player-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-modal__iframe"
              ></iframe>
            </div>
            <div className="video-modal__info">
              <h3 className="heading-lg">{activeVideo.title}</h3>
              <button
                className="btn btn--ghost video-modal__close"
                onClick={() => setActiveVideo(null)}
              >
                Close video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── VIDEO GRID ── */}
      <div className="container">
        {(() => {
          const filteredVideos =
            activeCategory === "All"
              ? VIDEOS
              : VIDEOS.filter((v) => v.category === activeCategory);

          return filteredVideos.length > 0 ? (
            <div className="video-grid">
              {filteredVideos.map((video, idx) => (
                <FadeIn key={video.id} delay={Math.min(idx * 40, 300)}>
                  <div
                    className="video-card"
                    onClick={() => setActiveVideo(video)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setActiveVideo(video)
                    }
                  >
                    <div className="video-card__thumb-wrap">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        className="video-card__thumb"
                        onError={(e) => {
                          // Fallback to high quality (hqdefault) if maxresdefault doesn't exist
                          (e.target as HTMLImageElement).src =
                            `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                        }}
                      />
                      <div className="video-card__overlay">
                        <div className="video-card__play-btn">
                          <Play
                            size={24}
                            fill="currentColor"
                            className="video-card__play-icon"
                          />
                        </div>
                      </div>
                      <div className="video-card__duration label">
                        {video.duration}
                      </div>
                    </div>

                    <div className="video-card__content">
                      <div className="video-card__meta">
                        <span className="label label--accent">
                          {video.channel}
                        </span>
                      </div>
                      <h3 className="video-card__title heading-md">
                        {video.title}
                      </h3>

                      <div className="video-card__stats">
                        {video.date && (
                          <div className="video-card__stat">
                            <Calendar size={14} />
                            <span>{formatDate(video.date)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="talks-empty">
              <p className="body-lg">
                No videos found. Run the scraper to populate.
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
