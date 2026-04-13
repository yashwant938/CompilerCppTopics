const navItems = [
  { key: 'landing', label: 'Landing' },
  { key: 'quiz', label: 'Quiz' },
  { key: 'result', label: 'Result' },
  { key: 'slides', label: 'Slides' },
  { key: 'code', label: 'Code Demo' },
  { key: 'animation', label: 'Animation' }
]

function Navbar({ currentStage, onNavigate }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-slate-700/60 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="text-sm font-semibold text-cyan-300 sm:text-base">C++ STL in Compiler Design</div>
        <nav className="flex flex-wrap justify-end gap-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                currentStage === item.key
                  ? 'bg-cyan-400/20 text-cyan-200'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
