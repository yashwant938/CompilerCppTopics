import Editor from '@monaco-editor/react'

function CodeViewer({
  example,
  examples,
  onChangeExample,
  editorCode,
  editorVersion,
  onEditCode,
  onRun,
  onReset,
  isRunning,
  output
}) {
  return (
    <div className="glass-card border-slate-700/70 p-5 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-cyan-300 sm:text-xl">Compiler Workbench</h3>
          <p className="text-sm text-slate-400">{example.description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {example.tags?.map((tag) => (
              <span key={tag} className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-100">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <select
          value={example.id}
          onChange={(event) => onChangeExample(event.target.value)}
          className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-cyan-400 focus:outline-none"
        >
          {examples.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        <button type="button" onClick={onRun} className="btn-primary" disabled={isRunning}>
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
        <button type="button" onClick={onReset} className="btn-secondary">
          Reset Example
        </button>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(editorCode)}
          className="btn-secondary"
        >
          Copy Code
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-700 shadow-[0_0_25px_rgba(59,130,246,0.14)]">
        <Editor
          key={`${example.id}-${editorVersion}`}
          height="480px"
          language="cpp"
          theme="vs-dark"
          value={editorCode}
          onChange={(value) => onEditCode(value ?? '')}
          options={{
            minimap: { enabled: false },
            fontSize: 15,
            scrollBeyondLastLine: false,
            wordWrap: 'on'
          }}
        />
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-700/80 bg-slate-950">
        <div className="border-b border-slate-700/70 px-4 py-2 font-mono text-xs text-slate-400">Output Terminal</div>
        <pre className="min-h-[140px] whitespace-pre-wrap p-4 font-mono text-xs text-emerald-200 sm:text-sm">{output}</pre>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Online compile is powered by Wandbox API. Internet connection is required.
      </p>
    </div>
  )
}

export default CodeViewer
