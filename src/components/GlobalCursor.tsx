'use client'

import { useEffect, useRef, useState } from 'react'

type CursorMode = 'default' | 'view' | 'dark'

declare global {
  interface Window {
    __setSiteCursorMode?: (mode: 'default' | 'view' | 'dark') => void
  }
}

export default function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)

  const mouseTargetRef = useRef({ x: -200, y: -200 })
  const mouseCurrentRef = useRef({ x: -200, y: -200 })
  const rafRef = useRef<number | null>(null)

  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState<CursorMode>('default')
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')

    const updateDevice = () => {
      setIsDesktop(media.matches)
    }

    updateDevice()

    if (media.addEventListener) {
      media.addEventListener('change', updateDevice)
    } else {
      media.addListener(updateDevice)
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', updateDevice)
      } else {
        media.removeListener(updateDevice)
      }
    }
  }, [])

  useEffect(() => {
    window.__setSiteCursorMode = (nextMode: CursorMode) => {
      setMode(nextMode)
    }

    return () => {
      delete window.__setSiteCursorMode
    }
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const handleMouseMove = (event: MouseEvent) => {
      mouseTargetRef.current = { x: event.clientX, y: event.clientY }

      if (!visible) {
        mouseCurrentRef.current = { x: event.clientX, y: event.clientY }
        setVisible(true)
      }
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    const handleMouseEnter = () => {
      setVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isDesktop, visible])

  useEffect(() => {
    if (!isDesktop) return

    const tick = () => {
      const cursor = cursorRef.current

      mouseCurrentRef.current.x +=
        (mouseTargetRef.current.x - mouseCurrentRef.current.x) * 0.16
      mouseCurrentRef.current.y +=
        (mouseTargetRef.current.y - mouseCurrentRef.current.y) * 0.16

      if (cursor) {
        cursor.style.transform = `translate3d(${mouseCurrentRef.current.x}px, ${mouseCurrentRef.current.y}px, 0) translate(-50%, -50%)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isDesktop])

  useEffect(() => {
    if (!isDesktop) return

    document.documentElement.classList.add('has-custom-cursor')

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <>
      <style>{`
        html.has-custom-cursor,
        html.has-custom-cursor body,
        html.has-custom-cursor a,
        html.has-custom-cursor button,
        html.has-custom-cursor [role="button"],
        html.has-custom-cursor input,
        html.has-custom-cursor textarea,
        html.has-custom-cursor select,
        html.has-custom-cursor label,
        html.has-custom-cursor video {
          cursor: none !important;
        }

        .site-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: #fff;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 9999;
          opacity: 0;
          transform: translate3d(-200px, -200px, 0) translate(-50%, -50%);
          transition:
            width 280ms cubic-bezier(0.22, 1, 0.36, 1),
            height 280ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 180ms ease,
            background-color 220ms ease,
            color 220ms ease,
            box-shadow 220ms ease;
          will-change: transform, width, height, opacity;
          backface-visibility: hidden;
        }

        .site-cursor--visible {
          opacity: 1;
        }

        .site-cursor--default {
          width: 18px;
          height: 18px;
          background: #fff;
          color: #000;
        }

        .site-cursor--dark {
          width: 18px;
          height: 18px;
          background: #000;
          color: #fff;
        }

        .site-cursor--view {
          width: 92px;
          height: 92px;
          background: #fff;
          color: #000;
        }

        .site-cursor__label {
          font-size: 0.82rem;
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 500;
          opacity: 0;
          transform: scale(0.82);
          transition:
            opacity 180ms ease,
            transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
          white-space: nowrap;
          user-select: none;
        }

        .site-cursor--view .site-cursor__label {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>

      <div
        ref={cursorRef}
        className={[
          'site-cursor',
          visible ? 'site-cursor--visible' : '',
          mode === 'view'
            ? 'site-cursor--view'
            : mode === 'dark'
            ? 'site-cursor--dark'
            : 'site-cursor--default',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span className="site-cursor__label">{mode === 'view' ? 'View' : ''}</span>
      </div>
    </>
  )
}