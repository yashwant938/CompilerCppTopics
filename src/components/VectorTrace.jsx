import { useState } from 'react'
import { TRACE_SOURCE, parseVectorTrace } from '../data/vectorTrace'

export default function VectorTrace() {
  const [steps, setSteps] = useState([])
  const [index, setIndex] = useState(0)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState('')

  async function runTrace() {
    setRunning(true)
    setSteps([])
    setError('')
    try {
      const response = await fetch('https://wandbox.org/api/compile.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: TRACE_SOURCE, compiler: 'gcc-head', options: 'warning,gnu++17', save: false }),
        signal: AbortSignal.timeout(30000),
      })
      if (!response.ok) throw new Error(`Compiler request failed (${response.status}).`)
      const result = await response.json()
      if (result.status !== '0' && result.status !== 0) throw new Error('The program did not complete successfully.')
      setSteps(parseVectorTrace(result.program_output || ''))
      setIndex(0)
    } catch (err) {
      setError(`${err.message} Please try again when Wandbox is available.`)
    } finally {
      setRunning(false)
    }
  }

  const step = steps[index]
  return (
    <section aria-labelledby="trace-title" className="rounded-2xl border border-cyan-400/25 bg-slate-900/70 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Actual program output</p>
          <h3 id="trace-title" className="mt-2 text-xl font-semibold text-white">Trace a vector in C++</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">Run a small instrumented program and step through the vector values, size and capacity it prints. Capacity depends on the compiler and library.</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">The example code is sent to Wandbox for compilation; this is program output, not a debugger or memory-address trace.</p>
        </div>
        <button type="button" onClick={runTrace} disabled={running} className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:opacity-60">
          {running ? 'Running…' : steps.length ? 'Run again' : 'Run live trace'}
        </button>
      </div>
      {error && <p role="alert" className="mt-4 text-sm text-rose-300">{error}</p>}
      {step && (
        <div className="mt-5 rounded-xl border border-slate-700 bg-slate-950 p-4" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-sm text-cyan-200">{step.operation}</p>
            <p className="text-xs text-slate-400">Step {index + 1} of {steps.length} · size {step.size} · capacity {step.capacity}</p>
          </div>
          <div className="mt-4 flex min-h-12 flex-wrap items-center gap-2">
            {step.values.length ? step.values.map((value, i) => <span key={i} className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 font-mono text-cyan-100">{value}</span>) : <span className="text-sm text-slate-500">Empty vector</span>}
          </div>
          <div className="mt-4 flex gap-2">
            <button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)} className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm disabled:opacity-40">Previous</button>
            <button type="button" disabled={index === steps.length - 1} onClick={() => setIndex(index + 1)} className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm disabled:opacity-40">Next</button>
          </div>
        </div>
      )}
      <details className="mt-4 text-sm text-slate-300">
        <summary className="cursor-pointer text-cyan-200">View the C++ source</summary>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs leading-5"><code>{TRACE_SOURCE}</code></pre>
      </details>
    </section>
  )
}
