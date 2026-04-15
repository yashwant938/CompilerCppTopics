import { useEffect, useRef } from 'react'
import Reveal from 'reveal.js'
import 'reveal.js/reveal.css'
import 'reveal.js/theme/black.css'

function SlideWrapper({ slides, activeIndex = 0, onSlideChange = () => {} }) {
  const revealRootRef = useRef(null)
  const deckRef = useRef(null)
  const readyRef = useRef(false)

  useEffect(() => {
    if (!revealRootRef.current) return undefined

    deckRef.current = new Reveal(revealRootRef.current, {
      embedded: true,
      controls: true,
      progress: true,
      center: false,
      transition: 'slide',
      backgroundTransition: 'fade',
      slideNumber: true,
      keyboard: true
    })

    deckRef.current.initialize().then(() => {
      readyRef.current = true
      deckRef.current.slide(activeIndex)
    })
    deckRef.current.on('slidechanged', (event) => {
      onSlideChange(event.indexh ?? 0)
    })

    return () => {
      if (deckRef.current) {
        readyRef.current = false
        deckRef.current.destroy()
        deckRef.current = null
      }
    }
  }, [onSlideChange, activeIndex])

  useEffect(() => {
    if (deckRef.current && readyRef.current) {
      deckRef.current.slide(activeIndex)
    }
  }, [activeIndex])

  return (
    <div className="glass-card overflow-hidden border-slate-700/70 p-2 sm:p-3">
      <div ref={revealRootRef} className="reveal stl-reveal h-[560px] w-full rounded-xl bg-slate-950">
        <div className="slides">
          {slides.map((slide) => (
            <section key={slide.title} className="px-8 py-8 sm:px-14 sm:py-10">
              <h2 className="mb-5 text-3xl font-bold">{slide.title}</h2>
              <ul className="space-y-3 text-lg leading-relaxed">
                {slide.lines.map((line) => (
                  <li key={line} className="list-disc">
                    {line}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SlideWrapper
