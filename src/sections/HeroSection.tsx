export default function HeroSection() {
  return (
    <>
      <style>{`
        .hero {
          position: relative;
          min-height: 100lvh;
          width: 100%;
          overflow: hidden;
          background: #000;
          color: #f5f1eb;
          z-index: 20;
          isolation: isolate;
        }

        .hero__media {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
        }

        .hero__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(calc(1.12 - 0.12 * var(--progress, 1)));
          transform-origin: center center;
          will-change: transform;
          filter: saturate(0.95) contrast(1.02) brightness(0.8);
        }

        .hero__overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to bottom,
              rgba(8, 10, 16, 0.22) 0%,
              rgba(8, 10, 16, 0.12) 20%,
              rgba(8, 10, 16, 0.12) 55%,
              rgba(8, 10, 16, 0.28) 78%,
              rgba(8, 10, 16, 0.42) 100%
            );
          pointer-events: none;
        }

        .hero__grain {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: 0.05;
          pointer-events: none;
          background-image:
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.9) 0 0.6px, transparent 0.8px),
            radial-gradient(circle at 80% 30%, rgba(255,255,255,0.7) 0 0.6px, transparent 0.8px),
            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.6) 0 0.6px, transparent 0.8px);
          background-size: 18px 18px, 22px 22px, 26px 26px;
          mix-blend-mode: soft-light;
        }

        .hero__center {
          position: relative;
          z-index: 3;
          min-height: 100lvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
.hero__title-wrap {
  overflow: visible;
  padding-right: 0.04em;
}

.hero__title {
  margin: 0;
  text-align: center;
  font-size: clamp(4rem, 15vw, 11rem);
  line-height: 1;
  letter-spacing: -0.02em;
  font-weight: 400;
  color: #f4efe8;
  text-transform: uppercase;
  white-space: nowrap;
  display: inline-block;
  padding-right: 0.02em;
  opacity: 0;
  transform: translate3d(0, 120px, 0) scale(1.04);
  filter: blur(10px);
  animation: heroTitleReveal 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
  will-change: transform, opacity, filter;
}

        .hero__bottom {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 4;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 24px;
          align-items: end;
          padding: 24px;
          font-size: 0.95rem;
          line-height: 1.15;
          color: rgba(245, 241, 235, 0.96);
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          animation: heroFadeUp 1.3s cubic-bezier(0.22, 1, 0.36, 1) 1.05s forwards;
        }

        .hero__meta {
          white-space: nowrap;
        }

        .hero__meta--left {
          justify-self: start;
          text-align: left;
        }

        .hero__meta--center {
          justify-self: center;
          text-align: center;
        }

        .hero__meta--right {
          justify-self: end;
          text-align: right;
        }

        @keyframes heroTitleReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 120px, 0) scale(1.04);
            filter: blur(10px);
          }
          55% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translate3d(0, 18px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @media (max-width: 1024px) {
          .hero__title {
            font-size: clamp(3.4rem, 18vw, 7rem);
          }

          .hero__bottom {
            grid-template-columns: 1fr;
            gap: 10px;
            padding: 16px;
            font-size: 0.88rem;
          }

          .hero__meta--left,
          .hero__meta--center,
          .hero__meta--right {
            justify-self: start;
            text-align: left;
          }
        }
      `}</style>

      <section className="hero" string="progress">
        <div className="hero__media">
          <video
            className="hero__video"
            src="/hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="hero__overlay" />
          <div className="hero__grain" />
        </div>

        <div className="hero__center">
          <div className="hero__title-wrap">
            <h1 className="hero__title">LUMA</h1>
          </div>
        </div>

        <div className="hero__bottom">
          <div className="hero__meta hero__meta--left">Creative Photo Studio</div>
          <div className="hero__meta hero__meta--center">Los Angeles, California</div>
          <div className="hero__meta hero__meta--right">Available for booking</div>
        </div>
      </section>
    </>
  )
}