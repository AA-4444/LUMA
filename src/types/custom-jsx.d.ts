import 'react'

declare module 'react' {
  interface HTMLAttributes<T> {
    string?: string
    'string-exit-vp'?: string
    'string-enter-vp'?: string
    'string-progress'?: string
  }
}