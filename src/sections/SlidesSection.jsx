import { useState } from 'react'
import SlideNavigator from '../components/SlideNavigator'
import SlideWrapper from '../components/SlideWrapper'
import { slidesContent } from '../data/slidesContent'

function SlidesSection({ onContinue }) {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Presentation Mode</h2>
          <p className="text-slate-400">Use keyboard arrows for smooth navigation.</p>
        </div>
        <button type="button" className="btn-primary" onClick={onContinue}>
          Continue to Code Demo
        </button>
      </div>
      <div className="grid gap-5 lg:grid-cols-[310px_1fr]">
        <SlideNavigator
          slides={slidesContent}
          activeIndex={activeSlide}
          onSelect={setActiveSlide}
          title="Slides Nav Bar"
        />
        <SlideWrapper slides={slidesContent} activeIndex={activeSlide} onSlideChange={setActiveSlide} />
      </div>
    </section>
  )
}

export default SlidesSection
