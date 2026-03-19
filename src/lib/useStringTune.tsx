import { useEffect } from 'react'
import {
  StringTune,
  StringProgress,
  StringSplit,
} from '@fiddle-digital/string-tune'

declare global {
  interface Window {
    StringTuneContext?: ReturnType<typeof StringTune.getInstance>
  }
}

let started = false

export function useStringTune(): void {
  useEffect(() => {
    const engine = StringTune.getInstance()

    window.StringTuneContext = engine
    engine.use(StringSplit)
    engine.use(StringProgress)

    if (!started) {
      engine.start(0)
      started = true
    }
  }, [])
}