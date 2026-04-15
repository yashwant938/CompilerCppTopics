import { useState } from 'react'
import { motion } from 'framer-motion'
import SlideNavigator from '../components/SlideNavigator'
import CodePreview from '../components/landing/CodePreview'
import FeatureCard from '../components/landing/FeatureCard'
import HeroSection from '../components/landing/HeroSection'
import { slidesContent } from '../data/slidesContent'

const featureCards = [
  {
    title: 'Quiz Mode',
    description: 'Timed 20-second compiler-focused STL questions with score and progress tracking.',
    icon: 'QZ'
  },
  {
    title: 'Interactive Slides',
    description: 'Reveal.js style presentation flow with keyboard navigation and clean structure.',
    icon: 'SL'
  },
  {
    title: 'Live Code Demo',
    description: 'Monaco-powered code exploration for vector, unordered_map, and graph patterns.',
    icon: 'CD'
  },
  {
    title: 'Compiler Thinking',
    description: 'Learn STL from symbol table, AST, and control-flow use cases used in real compilers.',
    icon: 'CE'
  }
]

function DeveloperSpotlight() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
      className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(2,6,23,0.94))] p-6 shadow-[0_0_60px_rgba(14,165,233,0.12)] sm:p-8"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:34px_34px] opacity-40" />
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="order-2 lg:order-1">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">Developer Spotlight</p>
          <h3 className="mt-3 max-w-xl text-3xl font-black leading-tight text-white sm:text-5xl">
            Built With Real Curiosity, Real Grind, And A Proper Engineer Mindset
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            This project is designed to feel like a premium engineering showcase instead of a plain classroom site.
            The goal is to make STL, compiler design, and code demos feel sharp, memorable, and presentation-ready.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {['Creative Frontend', 'Compiler Focused', 'Interactive Learning', 'Professional Demo'].map((item) => (
              <span
                key={item}
                className="rounded-full border border-cyan-400/25 bg-slate-900/70 px-3 py-1 text-xs font-medium text-cyan-100"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl">
              <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-cyan-200">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                Developer
              </div>

              <div className="relative mx-auto mt-6 h-72 w-72 overflow-hidden rounded-full border-4 border-cyan-400/20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(191,219,254,0.75)_35%,rgba(30,41,59,0.15)_100%)] shadow-[0_0_40px_rgba(34,211,238,0.14)] sm:h-80 sm:w-80">
                {!imageFailed && (
                  <img
                    src={`${import.meta.env.BASE_URL}developer-photo.png`}
                    alt="Project developer portrait"
                    className={`h-full w-full object-cover transition duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageFailed(true)}
                  />
                )}

                {(!imageLoaded || imageFailed) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full border border-slate-400/40 bg-white/60 text-2xl font-black text-slate-800">
                      DEV
                    </div>
                    <p className="max-w-[13rem] text-sm font-semibold text-slate-900">
                      Add `public/developer-photo.png` to show the real spotlight portrait here.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 text-center">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-300">Showcase Identity</p>
                <p className="mt-2 text-xl font-semibold text-white">"Build it so clean that the idea speaks before you do."</p>
                <p className="mt-2 text-sm text-slate-400">A small reminder that good engineering is not only about logic. It is also about clarity, feel, and the confidence your work gives to others.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function LandingPage({ onStart, onExploreSlides }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = slidesContent[activeSlide]

  return (
    <section className="space-y-8">
      <HeroSection onStart={onStart} onExploreSlides={onExploreSlides} />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <SlideNavigator
          slides={slidesContent}
          activeIndex={activeSlide}
          onSelect={setActiveSlide}
          title="Slides Nav Bar"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="glass-card p-6"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-cyan-200 sm:text-2xl">{slide.title}</h2>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              Slide {activeSlide + 1}/{slidesContent.length}
            </span>
          </div>
          <ul className="space-y-2 text-left text-sm leading-relaxed text-slate-200 sm:text-base">
            {slide.lines.map((line) => (
              <li key={line} className="list-disc">
                {line}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <CodePreview />

      <DeveloperSpotlight />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featureCards.map((card) => (
          <FeatureCard key={card.title} title={card.title} description={card.description} icon={card.icon} />
        ))}
      </section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="glass-card p-6 sm:p-8"
      >
        <h3 className="text-2xl font-bold text-cyan-200">STL Visual Flow</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {['Containers', 'Iterators', 'Algorithms'].map((item, index) => (
            <motion.div
              key={item}
              className="rounded-xl border border-cyan-400/30 bg-slate-900/70 p-5 text-center text-lg font-semibold text-slate-100"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              {item}
              {index < 2 && <div className="mt-3 text-cyan-300">-&gt;</div>}
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="glass-card px-6 py-10 text-center sm:px-12">
        <h3 className="text-3xl font-black text-white sm:text-4xl">Think Like a Compiler Engineer</h3>
        <p className="mt-3 text-slate-400">Build intuition with STL concepts designed for real compiler workflows.</p>
        <button type="button" onClick={onStart} className="btn-primary mt-6 shadow-[0_0_35px_rgba(59,130,246,0.3)]">
          Start Quiz
        </button>
      </section>

      <footer className="border-t border-slate-800 pt-6 text-center font-mono text-xs text-slate-500">
        Code with intent. Present with confidence. Leave the work sharper than you found it.
      </footer>
    </section>
  )
}

export default LandingPage
