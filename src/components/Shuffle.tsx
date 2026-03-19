import { useRef, useEffect } from 'react'
import gsap from 'gsap'

type ShuffleProps = {
  text: string
  className?: string
  shuffleDirection?: 'left' | 'right'
  duration?: number
  stagger?: number
  triggerOnHover?: boolean
}

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export default function Shuffle({
  text,
  className = '',
  shuffleDirection = 'right',
  duration = 0.35,
  stagger = 0.03,
  triggerOnHover = true,
}: ShuffleProps) {
  const rootRef = useRef<HTMLSpanElement | null>(null)
  const originalRef = useRef<string>(text)
  const runningRef = useRef(false)

  useEffect(() => {
    originalRef.current = text
    if (rootRef.current) {
      rootRef.current.textContent = text
    }
  }, [text])

  useEffect(() => {
    const el = rootRef.current
    if (!el || !triggerOnHover) return

    const chars = originalRef.current.split('')
    const totalSteps = 8
    const stepDuration = duration / totalSteps

    const randomChar = () =>
      DEFAULT_CHARSET[Math.floor(Math.random() * DEFAULT_CHARSET.length)]

    const handleEnter = () => {
      if (runningRef.current) return
      runningRef.current = true

      const updates: gsap.core.Tween[] = []

      chars.forEach((_, index) => {
        const order =
          shuffleDirection === 'right'
            ? index
            : chars.length - 1 - index

        let frame = 0

        const tween = gsap.to(
          { value: 0 },
          {
            value: totalSteps,
            duration,
            delay: order * stagger,
            ease: 'power3.out',
            onUpdate: function () {
              const current = Math.floor(this.targets()[0].value)

              if (current === frame) return
              frame = current

              const next = chars.map((char, i) => {
                if (i < index && shuffleDirection === 'left') return char
                if (i > index && shuffleDirection === 'right') return char

                if (i === index) {
                  return current >= totalSteps - 1 ? chars[i] : randomChar()
                }

                return chars[i]
              })

              if (rootRef.current) {
                rootRef.current.textContent = next.join('')
              }
            },
          }
        )

        updates.push(tween)
      })

      gsap.delayedCall(duration + chars.length * stagger + stepDuration, () => {
        if (rootRef.current) {
          rootRef.current.textContent = originalRef.current
        }
        runningRef.current = false
      })
    }

    el.addEventListener('mouseenter', handleEnter)

    return () => {
      el.removeEventListener('mouseenter', handleEnter)
    }
  }, [duration, stagger, shuffleDirection, triggerOnHover])

  return (
    <span ref={rootRef} className={className}>
      {text}
    </span>
  )
}