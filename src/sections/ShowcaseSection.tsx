import { useEffect } from 'react'

type ShowcaseSectionProps = {
  videoSrc: string
  title: string
  meta: string
}

declare global {
  interface Window {
    __setSiteCursorMode?: (mode: 'default' | 'view' | 'dark') => void
  }
}

export default function ShowcaseSection({
  videoSrc,
  title,
  meta,
}: ShowcaseSectionProps) {
  useEffect(() => {
    return () => {
      window.__setSiteCursorMode?.('default')
    }
  }, [])

  const handleEnter = () => {
    window.__setSiteCursorMode?.('view')
  }

  const handleLeave = () => {
    window.__setSiteCursorMode?.('default')
  }

  return (
    <>
      <style>{`
        .showcase {
          position: relative;
          min-height: 100svh;
          background: #000;
          color: #f5f1eb;
          overflow: hidden;
          z-index: 20;
          isolation: isolate;
        }

        .showcase__panel {
          position: relative;
          width: 100%;
          height: 138svh;
          overflow: hidden;
          background: #000;
          transform: translate3d(0, calc(-38svh + 38svh * var(--progress, 0)), 0);
          will-change: transform;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        .showcase__media {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 1;
        }

        .showcase__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(calc(1.12 - 0.12 * var(--progress, 0))) translateZ(0);
          transform-origin: center center;
          will-change: transform;
          filter: brightness(0.72) contrast(1.02) saturate(0.96);
          backface-visibility: hidden;
        }

        .showcase__overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background:
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.16) 0%,
              rgba(0, 0, 0, 0.08) 30%,
              rgba(0, 0, 0, 0.16) 66%,
              rgba(0, 0, 0, 0.3) 100%
            );
          pointer-events: none;
        }

        .showcase__mask {
          position: absolute;
          inset: 0;
          z-index: 3;
          background: #000;
          opacity: calc(1 - var(--progress, 0));
          pointer-events: none;
          will-change: opacity;
        }

        .showcase__inner {
          position: absolute;
          inset: 0;
          z-index: 4;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          text-align: center;
        }

        .showcase__content {
          transform: translate3d(0, calc(44px - 44px * var(--progress, 0)), 0);
          opacity: var(--progress, 0);
          will-change: transform, opacity;
          pointer-events: none;
        }

        .showcase__title {
          margin: 0;
          font-size: clamp(2.8rem, 8vw, 6.4rem);
          line-height: 0.92;
          letter-spacing: -0.05em;
          font-weight: 500;
          text-transform: uppercase;
          color: #f5f1eb;
        }

        .showcase__meta {
          margin-top: 10px;
          font-size: 1rem;
          line-height: 1.15;
          color: rgba(245, 241, 235, 0.92);
        }

        @media (max-width: 768px) {
          .showcase__panel {
            height: 130svh;
            transform: translate3d(0, calc(-30svh + 30svh * var(--progress, 0)), 0);
          }

          .showcase__inner {
            padding: 16px;
          }

          .showcase__title {
            font-size: clamp(2rem, 10vw, 4rem);
          }

          .showcase__meta {
            margin-top: 8px;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <section
        className="showcase"
        string="progress"
        string-exit-vp="bottom"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className="showcase__panel">
          <div className="showcase__media">
            <video
              className="showcase__video"
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="showcase__overlay" />
            <div className="showcase__mask" />
          </div>

          <div className="showcase__inner">
            <div className="showcase__content">
              <h2 className="showcase__title">{title}</h2>
              <div className="showcase__meta">{meta}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}