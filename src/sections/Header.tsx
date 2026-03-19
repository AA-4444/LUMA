import { useEffect, useState } from 'react'
import Shuffle from '../components/Shuffle'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOnFooter, setIsOnFooter] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const footer = document.querySelector('.footer')
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnFooter(entry.isIntersecting)
      },
      {
        threshold: 0.08,
      }
    )

    observer.observe(footer)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 220;
          padding: 18px 16px;
          box-sizing: border-box;
          pointer-events: none;
        }

        .site-header__desktop {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: center;
          width: 100%;
        }

        .site-header__mobile {
          display: none;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .site-header__link,
        .site-header__brand,
        .site-header__menu-toggle {
          pointer-events: auto;
          color: rgba(245, 241, 235, 0.95);
          text-decoration: none;
          text-transform: uppercase;
          font-size: 0.72rem;
          line-height: 1;
          letter-spacing: 0.08em;
          font-weight: 500;
          white-space: nowrap;
          transition: color 220ms ease;
        }

        .site-header.is-dark .site-header__link,
        .site-header.is-dark .site-header__brand,
        .site-header.is-dark .site-header__menu-toggle {
          color: rgba(0, 0, 0, 0.92);
        }

        .site-header__link {
          display: inline-block;
        }

        .site-header__menu-toggle {
          appearance: none;
          border: 0;
          background: transparent;
          padding: 0;
          cursor: pointer;
          position: relative;
          min-width: 4.4rem;
          text-align: right;
        }

        .site-header__menu-label {
          display: inline-block;
          transition:
            opacity 260ms ease,
            transform 260ms ease;
        }

        .site-header__menu-label--menu {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .site-header__menu-label--close {
          position: absolute;
          top: 0;
          right: 0;
          opacity: 0;
          transform: translate3d(0, 6px, 0);
        }

        .site-header__menu-toggle.is-open .site-header__menu-label--menu {
          opacity: 0;
          transform: translate3d(0, -6px, 0);
        }

        .site-header__menu-toggle.is-open .site-header__menu-label--close {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .site-header__link:nth-child(1) {
          text-align: left;
          justify-self: start;
        }

        .site-header__link:nth-child(2),
        .site-header__link:nth-child(3) {
          text-align: center;
          justify-self: center;
        }

        .site-header__link:nth-child(4) {
          text-align: right;
          justify-self: end;
        }

        .site-header__shuffle {
          display: inline-block;
        }

        .mobile-top-menu {
          display: none;
        }

        @media (max-width: 768px) {
          .site-header {
            padding: 18px 16px;
          }

          .site-header__desktop {
            display: none;
          }

          .site-header__mobile {
            display: flex;
          }

          .site-header__brand,
          .site-header__menu-toggle {
            font-size: 0.68rem;
            letter-spacing: 0.08em;
          }

          /* Когда меню открыто — текст хедера снова белый */
          .site-header.is-menu-open .site-header__brand,
          .site-header.is-menu-open .site-header__menu-toggle {
            color: rgba(245, 241, 235, 0.95);
          }

          .mobile-top-menu {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 36dvh;
            min-height: 280px;
            max-height: 380px;
            z-index: 180;
            background: #050505;
            color: #f5f1eb;
            transform: translate3d(0, -100%, 0);
            transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
            will-change: transform;
            overflow: hidden;
          }

          .mobile-top-menu.is-open {
            transform: translate3d(0, 0, 0);
          }

          .mobile-top-menu__inner {
            min-height: 100%;
            box-sizing: border-box;
            padding: 68px 16px 18px;
            display: flex;
            flex-direction: column;
          }

          .mobile-top-menu__nav {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            margin-top: 12px;
          }

          .mobile-top-menu__link {
            color: #f5f1eb;
            text-decoration: none;
            text-transform: uppercase;
            font-size: clamp(1.25rem, 6vw, 2rem);
            line-height: 0.95;
            letter-spacing: -0.03em;
            font-weight: 400;
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }

          .mobile-top-menu.is-open .mobile-top-menu__link:nth-child(1) {
            animation: mobileLinkIn 0.56s cubic-bezier(0.16, 1, 0.3, 1) 0.06s forwards;
          }

          .mobile-top-menu.is-open .mobile-top-menu__link:nth-child(2) {
            animation: mobileLinkIn 0.56s cubic-bezier(0.16, 1, 0.3, 1) 0.12s forwards;
          }

          .mobile-top-menu.is-open .mobile-top-menu__link:nth-child(3) {
            animation: mobileLinkIn 0.56s cubic-bezier(0.16, 1, 0.3, 1) 0.18s forwards;
          }

          .mobile-top-menu__bottom {
            margin-top: auto;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            opacity: 0;
            transform: translate3d(0, 16px, 0);
          }

          .mobile-top-menu.is-open .mobile-top-menu__bottom {
            animation: mobileBottomIn 0.68s cubic-bezier(0.22, 1, 0.36, 1) 0.22s forwards;
          }

          .mobile-top-menu__contacts {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .mobile-top-menu__contact {
            color: #f5f1eb;
            text-decoration: underline;
            text-underline-offset: 0.14em;
            text-transform: uppercase;
            font-size: 0.78rem;
            line-height: 1.15;
          }

          .mobile-top-menu__socials {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 12px;
          }

          .mobile-top-menu__social {
            color: #f5f1eb;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 0.62rem;
            line-height: 1;
            letter-spacing: 0.08em;
            font-weight: 500;
          }

          .mobile-top-menu__copyright {
            font-size: 0.72rem;
            line-height: 1;
            color: rgba(245, 241, 235, 0.72);
            text-transform: none;
          }
        }

        @keyframes mobileLinkIn {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes mobileBottomIn {
          from {
            opacity: 0;
            transform: translate3d(0, 16px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>

      <header
        className={[
          'site-header',
          isOnFooter ? 'is-dark' : '',
          isOpen ? 'is-menu-open' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <nav className="site-header__desktop">
          <a className="site-header__link" href="#home">
            <Shuffle
              text="Luma"
              className="site-header__shuffle"
              shuffleDirection="right"
              duration={0.35}
              stagger={0.02}
            />
          </a>

          <a className="site-header__link" href="#projects">
            <Shuffle
              text="Projects"
              className="site-header__shuffle"
              shuffleDirection="right"
              duration={0.35}
              stagger={0.02}
            />
          </a>

          <a className="site-header__link" href="#about">
            <Shuffle
              text="About"
              className="site-header__shuffle"
              shuffleDirection="right"
              duration={0.35}
              stagger={0.02}
            />
          </a>

          <a className="site-header__link" href="#contact">
            <Shuffle
              text="Let's Talk"
              className="site-header__shuffle"
              shuffleDirection="right"
              duration={0.35}
              stagger={0.02}
            />
          </a>
        </nav>

        <div className="site-header__mobile">
          <a className="site-header__brand" href="#home">
            Luma
          </a>

          <button
            className={`site-header__menu-toggle ${isOpen ? 'is-open' : ''}`}
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-top-menu"
            onClick={toggleMenu}
          >
            <span className="site-header__menu-label site-header__menu-label--menu">
              Menu
            </span>
            <span className="site-header__menu-label site-header__menu-label--close">
              Close
            </span>
          </button>
        </div>
      </header>

      <aside
        id="mobile-top-menu"
        className={`mobile-top-menu ${isOpen ? 'is-open' : ''}`}
      >
        <div className="mobile-top-menu__inner">
          <nav className="mobile-top-menu__nav">
            <a className="mobile-top-menu__link" href="#projects" onClick={closeMenu}>
              Projects
            </a>
            <a className="mobile-top-menu__link" href="#about" onClick={closeMenu}>
              About
            </a>
            <a className="mobile-top-menu__link" href="#contact" onClick={closeMenu}>
              Let&apos;s Talk
            </a>
          </nav>

          <div className="mobile-top-menu__bottom">
            <div className="mobile-top-menu__contacts">
              <a className="mobile-top-menu__contact" href="mailto:hello@lumastudio.com">
                hello@lumastudio.com
              </a>
              <a className="mobile-top-menu__contact" href="tel:+11234567890">
                +1 (123) 456-7890
              </a>
            </div>

            <div className="mobile-top-menu__socials">
              <a className="mobile-top-menu__social" href="#twitter">Twitter/X</a>
              <a className="mobile-top-menu__social" href="#instagram">Instagram</a>
              <a className="mobile-top-menu__social" href="#vimeo">Vimeo</a>
            </div>

            <div className="mobile-top-menu__copyright">© Luma 2025</div>
          </div>
        </div>
      </aside>
    </>
  )
}