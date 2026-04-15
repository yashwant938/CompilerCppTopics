import { motion } from 'framer-motion'

function FeatureCard({ title, description, icon }) {
  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="glass-card h-full border-slate-700/70 p-5"
    >
      <div className="mb-3 inline-flex rounded-lg border border-cyan-400/40 bg-cyan-500/10 p-2 text-xl text-cyan-200">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </motion.article>
  )
}

export default FeatureCard
