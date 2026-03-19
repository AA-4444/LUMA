import { useEffect, useState } from 'react'


export default function FooterShiftSection() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
     timeZone: 'America/Los_Angeles',
    })

    const updateTime = () => {
      setTime(formatter.format(new Date()))
    }

    updateTime()
    const intervalId = window.setInterval(updateTime, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return (
   <section
  className="footer"
  string="progress"
  string-exit-vp="bottom"
  onMouseEnter={() => window.__setSiteCursorMode?.('dark')}
  onMouseLeave={() => window.__setSiteCursorMode?.('default')}
>
      <div className="footer-shell">
        <div className="footer-topline" />

        <div className="footer-grid">
          <div className="footer-cell footer-cell--topbar">
            <div className="footer-topbar -m">
              <div className="footer-top-links">
                <span>WA</span>
                <span>IG</span>
                <span>LI</span>
                <span>EMAIL</span>
              </div>

              <div className="footer-brand-mini">LUMA</div>

              <div className="footer-burger" aria-hidden="true">
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className="footer-cell footer-cell--logo">
            <div className="footer-logo">LUMA</div>
          </div>

          <div className="footer-cell footer-cell--info">
            <div className="footer-info">
              <div className="footer-location">
                We are currently based in
                <br />
                 Los Angeles
              </div>

              <div className="footer-time">{time}</div>

              <div className="footer-timezone">
                <span className="footer-timezone-dot" />
                Timezone (PT)
              </div>
            </div>
          </div>

          <div className="footer-cell footer-cell--nav-main">
            <nav className="footer-nav footer-nav-main -h5 -m-h6">
              <span>Projects</span>
              <span>About</span>
              <span>Let&apos;s Talk</span>
            </nav>
          </div>

          <div className="footer-cell footer-cell--nav-legal">
            <nav className="footer-nav footer-nav-legal -h6 -m-m">
              <span>Privacy Policy</span>
              <span>Terms & Conditions</span>
              <span>Cookies</span>
            </nav>
          </div>

          <div className="footer-cell footer-cell--cta">
            <div className="footer-cta">
              <div className="footer-cta-title">Let&apos;s Talk</div>
              <div className="footer-cta-text -p -m-m">
                We build refined digital experiences, visual systems and modern
                brand worlds with a clear, intentional approach.
              </div>

              <div className="footer-cta-email -h6 -m-m">hello@luma.studio</div>
            </div>
          </div>

          <div className="footer-cell footer-cell--socials">
            <div className="footer-socials">
              <div className="footer-social-item -h6 -m-m">
                <span>Whatsapp</span>
                <span>↗</span>
              </div>
              <div className="footer-social-item -h6 -m-m">
                <span>X</span>
                <span>↗</span>
              </div>
              <div className="footer-social-item -h6 -m-m">
                <span>LinkedIn</span>
                <span>↗</span>
              </div>
              <div className="footer-social-item -h6 -m-m">
                <span>Instagram</span>
                <span>↗</span>
              </div>
              <div className="footer-social-item -h6 -m-m">
                <span>Email</span>
                <span>↗</span>
              </div>
            </div>
          </div>

          <div className="footer-cell footer-cell--bottom-left">
            <div className="footer-bottom-left">
              <div className="footer-status -mm">Online</div>
              <div className="footer-address -m">
                LUMA Studio
                <br />
                Remote Worldwide
              </div>
            </div>
          </div>

          <div className="footer-cell footer-cell--bottom-center">
            <div className="footer-bottom-center -m">
              LUMA is an independent creative studio focused on direction,
              design and digital experiences for modern brands.
            </div>
          </div>

          <div className="footer-cell footer-cell--bottom-right">
            <div className="footer-bottom-right -m">
              © 2026 LUMA — All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}