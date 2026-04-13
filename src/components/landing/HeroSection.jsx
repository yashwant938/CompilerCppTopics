import { motion } from 'framer-motion'

const floatingLabels = ['vector<int>', 'unordered_map', 'AST', 'CFG', 'token stream', 'iterator']

function HeroSection({ onStart, onExploreSlides }) {
  return (
    <section className="relative min-h-[85vh] overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-950/80 px-6 py-14 sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:36px_36px]" />
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-6xl"
        >
          Master C++ in Compiler Design
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 max-w-2xl text-base text-slate-300 sm:text-xl"
        >
          Interactive learning with quizzes, visual slides, and live code demos.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <button type="button" onClick={onStart} className="btn-primary shadow-[0_0_30px_rgba(34,211,238,0.28)]">
            Start Experience
          </button>
          <button type="button" onClick={onExploreSlides} className="btn-secondary border-cyan-400/40">
            Explore Slides
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-2 sm:grid-cols-3"
        >
          {floatingLabels.map((label) => (
            <div
              key={label}
              className="rounded-lg border border-cyan-400/20 bg-slate-900/60 px-3 py-2 text-center font-mono text-xs text-cyan-200/90"
            >
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
