'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type CounterItem = {
  label: string
  value: number
  suffix?: string
}

const HEADLINE =
  'We create visual stories with a cinematic eye and a crafted approach to movement, light, and emotion - shaping films that feel intentional, elegant, and alive.'

const SERVICES = [
  'Brand Films',
  'Commercials & Ad Spots',
  'Editorial & Fashion Films',
  'Music Videos',
  'Wedding Films',
  'Creative Direction',
]

const COUNTERS: CounterItem[] = [
  { label: 'Projects Completed', value: 67 },
  { label: 'Clients Served Worldwide', value: 43, suffix: '+' },
  { label: 'Design Awards & Recognitions', value: 12, suffix: '+' },
  { label: 'Campaigns Launched', value: 16, suffix: '+' },
]

const MARQUEE_ITEMS = [
  'Awwwards Honorable Mention',
  'Featured on Behance',
  'Official Selection',
  'Vimeo Staff Pick',
  'Best Editorial Direction',
  'Independent Shortlist',
]

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max)

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export default function StudioStatementSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)

  const words = useMemo(() => HEADLINE.split(' '), [])

  useEffect(() => {
    let rafId = 0

    const update = () => {
      const section = sectionRef.current

      if (section) {
        const rect = section.getBoundingClientRect()
        const vh = window.innerHeight || 1

        /**
         * Прогресс теперь считается по всему проходу секции через экран:
         * 0  -> секция только подходит снизу
         * 1  -> секция почти прошла экран
         */
        const travel = vh + rect.height
        const passed = vh - rect.top
        const raw = passed / travel
        const next = clamp(raw)

        setProgress(prev => (Math.abs(prev - next) > 0.0005 ? next : prev))
      }

      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [])

  const eyebrowP = easeOutCubic(clamp((progress - 0.03) / 0.12))
  const statsTitleP = easeOutCubic(clamp((progress - 0.52) / 0.12))
  const tickerP = easeOutCubic(clamp((progress - 0.68) / 0.12))

  return (
    <>
      <style>{`
        .studio-statement {
          position: relative;
          min-height: 126svh;
          background: #0b0b0d;
          color: #f3efe9;
          z-index: 25;
          overflow: hidden;
        }

        .studio-statement__wrap {
          min-height: 126svh;
          padding: 128px 24px 40px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .studio-statement__top {
          width: 100%;
        }

        .studio-statement__eyebrow {
          margin: 0;
          display: inline-block;
          overflow: hidden;
        }

        .studio-statement__eyebrow-text {
          display: inline-block;
          font-size: 1rem;
          line-height: 1;
          letter-spacing: -0.02em;
          font-weight: 500;
          color: #f3efe9;
          will-change: transform, opacity;
        }

        .studio-statement__headline {
          margin: 26px 0 0;
          max-width: 1540px;
          font-size: clamp(2.7rem, 6vw, 6.3rem);
          line-height: 0.95;
          letter-spacing: -0.055em;
          font-weight: 500;
          color: #f3efe9;
          display: flex;
          flex-wrap: wrap;
          gap: 0.12em 0.16em;
        }

        .studio-statement__word {
          display: inline-flex;
          will-change: transform, opacity;
        }

        .studio-statement__services {
          width: 100%;
          margin-top: 68px;
        }

        .studio-statement__service {
          position: relative;
          padding: 18px 0 22px;
          overflow: hidden;
        }

        .studio-statement__service-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: rgba(243, 239, 233, 0.18);
          transform-origin: left center;
          will-change: transform;
        }

        .studio-statement__service-text {
          display: inline-block;
          font-size: clamp(1.22rem, 2.25vw, 2rem);
          line-height: 1;
          letter-spacing: -0.03em;
          font-weight: 400;
          color: rgba(243, 239, 233, 0.96);
          will-change: transform, opacity;
        }

        .studio-statement__stats {
          margin-top: 72px;
          border-top: 1px solid rgba(243, 239, 233, 0.14);
          padding-top: 22px;
        }

        .studio-statement__stats-title {
          margin: 0 0 28px;
          text-align: center;
          font-size: 0.9rem;
          line-height: 1;
          letter-spacing: -0.02em;
          color: rgba(243, 239, 233, 0.74);
          text-transform: uppercase;
          will-change: transform, opacity;
        }

        .studio-statement__stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-top: 1px solid rgba(243, 239, 233, 0.14);
        }

        .studio-statement__stat {
          position: relative;
          padding: 22px 24px 12px 0;
          min-height: 260px;
        }

        .studio-statement__stat:not(:first-child) {
          padding-left: 28px;
        }

        .studio-statement__stat-divider {
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: calc(100% - 12px);
          background: rgba(243, 239, 233, 0.14);
          transform-origin: top center;
          will-change: transform;
        }

        .studio-statement__stat-label {
          max-width: 220px;
          font-size: 0.95rem;
          line-height: 1.08;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: rgba(243, 239, 233, 0.62);
          will-change: transform, opacity;
        }

        .studio-statement__stat-value {
          margin-top: 42px;
          font-size: clamp(4rem, 7vw, 7rem);
          line-height: 0.9;
          letter-spacing: -0.06em;
          font-weight: 400;
          color: rgba(243, 239, 233, 0.95);
          will-change: transform, opacity;
        }

        .studio-statement__ticker {
          margin-top: 26px;
          border-top: 1px solid rgba(243, 239, 233, 0.12);
          border-bottom: 1px solid rgba(243, 239, 233, 0.12);
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          will-change: transform, opacity;
        }

        .studio-statement__ticker-track {
          display: inline-flex;
          align-items: center;
          gap: 28px;
          padding: 16px 0;
          min-width: max-content;
          animation: studioTicker 24s linear infinite;
        }

        .studio-statement__ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 28px;
          font-size: 0.95rem;
          line-height: 1;
          letter-spacing: -0.01em;
          color: rgba(243, 239, 233, 0.78);
          text-transform: uppercase;
        }

        .studio-statement__ticker-item::after {
          content: '•';
          color: rgba(243, 239, 233, 0.36);
        }

        @keyframes studioTicker {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (max-width: 1200px) {
          .studio-statement__stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .studio-statement__stat {
            min-height: 220px;
          }

          .studio-statement__stat:nth-child(3),
          .studio-statement__stat:nth-child(4) {
            border-top: 1px solid rgba(243, 239, 233, 0.14);
          }
        }

        @media (max-width: 1024px) {
          .studio-statement {
            min-height: 118svh;
          }

          .studio-statement__wrap {
            min-height: 118svh;
            padding: 110px 16px 28px;
          }

          .studio-statement__headline {
            margin-top: 22px;
            font-size: clamp(2.2rem, 9vw, 4.25rem);
            line-height: 0.97;
          }

          .studio-statement__services {
            margin-top: 48px;
          }

          .studio-statement__service {
            padding: 16px 0 18px;
          }

          .studio-statement__service-text {
            font-size: clamp(1rem, 5.4vw, 1.45rem);
          }

          .studio-statement__stats {
            margin-top: 52px;
          }

          .studio-statement__stats-title {
            margin-bottom: 20px;
          }

          .studio-statement__stats-grid {
            grid-template-columns: 1fr;
          }

          .studio-statement__stat {
            min-height: auto;
            padding: 18px 0 20px;
          }

          .studio-statement__stat:not(:first-child) {
            padding-left: 0;
          }

          .studio-statement__stat-divider {
            display: none;
          }

          .studio-statement__stat:not(:first-child) {
            border-top: 1px solid rgba(243, 239, 233, 0.14);
          }

          .studio-statement__stat-value {
            margin-top: 18px;
            font-size: clamp(3.4rem, 16vw, 5rem);
          }

          .studio-statement__ticker-track {
            padding: 14px 0;
          }

          .studio-statement__ticker-item {
            font-size: 0.78rem;
            gap: 18px;
          }
        }
      `}</style>

      <section ref={sectionRef} className="studio-statement">
        <div className="studio-statement__wrap">
          <div className="studio-statement__top">
            <p className="studio-statement__eyebrow">
              <span
                className="studio-statement__eyebrow-text"
                style={{
                  opacity: eyebrowP,
                  transform: `translate3d(0, ${18 - 18 * eyebrowP}px, 0)`,
                }}
              >
                What we do
              </span>
            </p>

            <p className="studio-statement__headline">
              {words.map((word, index) => {
                const local = easeOutCubic(
                  clamp((progress - 0.06 - index * 0.014) / 0.22)
                )

                return (
                  <span
                    key={`${word}-${index}`}
                    className="studio-statement__word"
                    style={{
                      opacity: local,
                      transform: `translate3d(0, ${24 - 24 * local}px, 0)`,
                    }}
                  >
                    {word}
                  </span>
                )
              })}
            </p>
          </div>

          <div className="studio-statement__services">
            {SERVICES.map((service, index) => {
              const lineP = easeOutCubic(
                clamp((progress - 0.22 - index * 0.05) / 0.18)
              )
              const textP = easeOutCubic(
                clamp((progress - 0.24 - index * 0.05) / 0.18)
              )

              return (
                <div className="studio-statement__service" key={service}>
                  <div
                    className="studio-statement__service-line"
                    style={{ transform: `scaleX(${lineP})` }}
                  />
                  <div
                    className="studio-statement__service-text"
                    style={{
                      opacity: textP,
                      transform: `translate3d(0, ${14 - 14 * textP}px, 0)`,
                    }}
                  >
                    {service}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="studio-statement__stats">
            <p
              className="studio-statement__stats-title"
              style={{
                opacity: statsTitleP,
                transform: `translate3d(0, ${12 - 12 * statsTitleP}px, 0)`,
              }}
            >
              Performance Snapshot
            </p>

            <div className="studio-statement__stats-grid">
              {COUNTERS.map((item, index) => {
                const local = easeOutCubic(
                  clamp((progress - 0.52 - index * 0.035) / 0.18)
                )
                const countP = easeOutCubic(
                  clamp((progress - 0.56 - index * 0.035) / 0.18)
                )
                const currentValue = Math.round(item.value * countP)

                return (
                  <div className="studio-statement__stat" key={item.label}>
                    {index !== 0 && (
                      <div
                        className="studio-statement__stat-divider"
                        style={{ transform: `scaleY(${local})` }}
                      />
                    )}

                    <div
                      className="studio-statement__stat-label"
                      style={{
                        opacity: local,
                        transform: `translate3d(0, ${10 - 10 * local}px, 0)`,
                      }}
                    >
                      {item.label}
                    </div>

                    <div
                      className="studio-statement__stat-value"
                      style={{
                        opacity: local,
                        transform: `translate3d(0, ${14 - 14 * local}px, 0)`,
                      }}
                    >
                      {currentValue}
                      {item.suffix ?? ''}
                    </div>
                  </div>
                )
              })}
            </div>

            <div
              className="studio-statement__ticker"
              style={{
                opacity: tickerP,
                transform: `translate3d(0, ${10 - 10 * tickerP}px, 0)`,
              }}
            >
              <div className="studio-statement__ticker-track">
                {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
                  <span
                    className="studio-statement__ticker-item"
                    key={`${item}-${index}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}