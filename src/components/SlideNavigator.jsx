import { motion } from 'framer-motion'

function SlideNavigator({ slides, activeIndex, onSelect, title = 'Slides Nav' }) {
  return (
    <aside className="glass-card h-full p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">{title}</h3>
      <div className="max-h-[560px] space-y-1 overflow-y-auto pr-1">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex
          return (
            <motion.button
              key={slide.title}
              type="button"
              onClick={() => onSelect(index)}
              whileHover={{ x: 3 }}
              className={`w-full rounded-lg border px-3 py-2 text-left text-xs transition sm:text-sm ${
                isActive
                  ? 'border-cyan-400/60 bg-cyan-500/15 text-cyan-100'
                  : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-cyan-500/40 hover:text-slate-100'
              }`}
            >
              {slide.title}
            </motion.button>
          )
        })}
      </div>
    </aside>
  )
}

export default SlideNavigator
