import HeroSection from './sections/HeroSection'
import FooterShiftSection from './sections/FooterShiftSection'
import { useStringTune } from './lib/useStringTune'
import Header from './sections/Header'
import ShowcaseSection from './sections/ShowcaseSection'
import StudioStatementSection from './sections/StudioStatementSection'
import GlobalCursor from './components/GlobalCursor'

export default function App() {
  useStringTune()

  return (
    <main>
       <GlobalCursor />
       <Header />
      <HeroSection />
       <ShowcaseSection
        videoSrc="/video1.mp4"
        title="After the Quiet"
        meta="2023 · Short Film"
      />

      <ShowcaseSection
        videoSrc="/video2.mp4"
        title="Silent Bloom"
        meta="2024 · Editorial"
      />
        <ShowcaseSection
        videoSrc="/video3.mp4"
        title="Motion Video"
        meta="2026 · Motion"
      />
      <StudioStatementSection />
      <FooterShiftSection />
    </main>
  )
}