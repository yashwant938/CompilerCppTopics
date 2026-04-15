import { useEffect, useMemo, useState } from 'react'
import CodeViewer from '../components/CodeViewer'
import { codeExamples } from '../data/codeExamples'

function CodeDemoSection({ onContinue }) {
  const [selectedId, setSelectedId] = useState(codeExamples[0].id)
  const [editorCode, setEditorCode] = useState(codeExamples[0].code)
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState('Ready. Click "Run Code" to compile and execute C++.')
  const [editorVersion, setEditorVersion] = useState(0)

  const selectedExample = useMemo(
    () => codeExamples.find((example) => example.id === selectedId) || codeExamples[0],
    [selectedId]
  )

  useEffect(() => {
    setEditorCode(selectedExample.code)
    setOutput('Ready. Click "Run Code" to compile and execute C++.')
    setEditorVersion((version) => version + 1)
  }, [selectedExample])

  const handleReset = () => {
    setEditorCode(selectedExample.code)
    setOutput('Ready. Click "Run Code" to compile and execute C++.')
    setEditorVersion((version) => version + 1)
  }

  const handleRun = async () => {
    setIsRunning(true)
    setOutput('Compiling and running...')
    try {
      const response = await fetch('https://wandbox.org/api/compile.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: editorCode,
          compiler: 'gcc-head',
          options: 'warning,gnu++17',
          save: false
        })
      })

      if (!response.ok) {
        throw new Error(`Compiler request failed with status ${response.status}`)
      }

      const data = await response.json()
      const compilerOut = `${data.compiler_output || ''}${data.compiler_error || ''}`.trim()
      const programOut = `${data.program_output || ''}${data.program_error || ''}`.trim()

      const formattedOutput = [
        '=== Compiler ===',
        compilerOut || 'No compiler messages.',
        '',
        '=== Program Output ===',
        programOut || 'No runtime output.'
      ].join('\n')

      setOutput(formattedOutput)
    } catch (error) {
      setOutput(`Run failed.\n${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Advanced Code Demo Lab</h2>
        <p className="text-slate-400">
          Explore, edit, and run compiler-oriented STL demos in a professional workspace.
        </p>
        {onContinue && (
          <button type="button" onClick={onContinue} className="btn-secondary mt-4">
            Open Animation Lab
          </button>
        )}
      </div>
      <CodeViewer
        example={selectedExample}
        examples={codeExamples}
        onChangeExample={setSelectedId}
        editorCode={editorCode}
        editorVersion={editorVersion}
        onEditCode={setEditorCode}
        onRun={handleRun}
        onReset={handleReset}
        isRunning={isRunning}
        output={output}
      />
    </section>
  )
}

export default CodeDemoSection
