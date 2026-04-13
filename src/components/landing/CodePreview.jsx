import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const codeSample = `#include <unordered_map>
#include <vector>

std::unordered_map<std::string, std::string> symbolTable;
symbolTable["x"] = "int";

std::vector<std::string> astNodes = {"Expr", "Term", "Factor"};`

function CodePreview() {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      index += 1
      setTyped(codeSample.slice(0, index))
      if (index >= codeSample.length) clearInterval(timer)
    }, 18)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="glass-card overflow-hidden"
    >
      <div className="flex items-center gap-2 border-b border-slate-700/70 bg-slate-900 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-3 font-mono text-xs text-slate-400">compiler_stl_demo.cpp</span>
      </div>
      <pre className="min-h-[220px] overflow-x-auto bg-slate-950 p-4 font-mono text-xs text-cyan-200 sm:text-sm">
        {typed}
        <span className="animate-pulse text-cyan-300">|</span>
      </pre>
    </motion.section>
  )
}

export default CodePreview
