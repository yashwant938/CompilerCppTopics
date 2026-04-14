import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';

const LANGUAGES = {
  cpp: {
    name: 'C++',
    compiler: 'gcc-head',
    monacoLang: 'cpp',
    boilerplate: `#include <iostream>\n\nint main() {\n    std::cout << "Hello C++!\\n";\n    return 0;\n}\n`
  },
  c: {
    name: 'C',
    compiler: 'gcc-head-c',
    monacoLang: 'c',
    boilerplate: `#include <stdio.h>\n\nint main() {\n    printf("Hello C!\\n");\n    return 0;\n}\n`
  },
  java: {
    name: 'Java',
    compiler: 'openjdk-head',
    monacoLang: 'java',
    boilerplate: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello Java!");\n    }\n}\n`
  },
  python: {
    name: 'Python',
    compiler: 'cpython-head',
    monacoLang: 'python',
    boilerplate: `print("Hello Python!")\n`
  }
};

export default function FloatingIDE() {
  const [isOpen, setIsOpen] = useState(false);
  const [langKey, setLangKey] = useState('cpp');
  const [code, setCode] = useState(LANGUAGES.cpp.boilerplate);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [stdin, setStdin] = useState('');

  // When language changes, update boilerplate
  const handleLangChange = (key) => {
    setLangKey(key);
    setCode(LANGUAGES[key].boilerplate);
    setOutput('');
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Compiling and running...');
    try {
      const response = await fetch('https://wandbox.org/api/compile.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: code,
          compiler: LANGUAGES[langKey].compiler,
          options: langKey === 'cpp' ? 'warning,gnu++17' : 'warning',
          stdin: stdin,
          save: false
        })
      });

      if (!response.ok) {
        throw new Error(`Compiler request failed with status ${response.status}`);
      }

      const data = await response.json();
      const programOut = `${data.program_output || ''}${data.program_error || ''}`.trim();
      const compilerOut = `${data.compiler_error || ''}`.trim();

      const outFinal = compilerOut ? `[Compiler Message]\n${compilerOut}\n\n[Output]\n${programOut}` : programOut || 'No output.';
      setOutput(outFinal);
    } catch (error) {
      setOutput(`Run failed.\n${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="fixed bottom-[110px] right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[500px] shadow-2xl rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 flex flex-col font-sans"
            style={{ height: '600px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <h3 className="font-semibold text-slate-100 flex items-center gap-2">
                  <span className="text-accent">&lt;/&gt;</span> Mini IDE
                </h3>
                <select 
                  value={langKey} 
                  onChange={(e) => handleLangChange(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-sm rounded px-2 py-1 outline-none focus:border-indigo-500"
                >
                  {Object.entries(LANGUAGES).map(([k, v]) => (
                    <option key={k} value={k}>{v.name}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                ✖
              </button>
            </div>

            {/* Code Editor */}
            <div className="flex-1 relative bg-[#1e1e1e]">
              <Editor
                height="100%"
                language={LANGUAGES[langKey].monacoLang}
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  wordWrap: 'on'
                }}
              />
            </div>
            
            {/* Run Bar */}
            <div className="bg-slate-800 p-2 border-t border-b border-slate-700 flex justify-end">
               <button 
                  onClick={handleRun}
                  disabled={isRunning}
                  className="bg-accent hover:bg-cyan-400 text-slate-950 font-bold px-4 py-1.5 rounded disabled:opacity-50 transition-colors flex items-center gap-2"
               >
                 {isRunning ? 'Running...' : '▶ Run Code'}
               </button>
            </div>

            {/* Output & Input Split */}
            <div className="flex h-48 bg-slate-950">
              <div className="flex-[0.8] flex flex-col border-r border-slate-700">
                <div className="text-slate-500 px-3 py-2 text-xs uppercase font-bold bg-slate-900 border-b border-slate-800">STDIN</div>
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  placeholder="Enter standard input..."
                  className="flex-1 bg-transparent text-slate-300 p-3 text-sm font-mono outline-none resize-none"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="text-slate-500 px-3 py-2 text-xs uppercase font-bold bg-slate-900 border-b border-slate-800">Output</div>
                <div className="flex-1 p-3 overflow-y-auto font-mono text-sm">
                   <pre className="text-slate-300 whitespace-pre-wrap">{output}</pre>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 bg-slate-800 hover:bg-slate-700 text-accent rounded-full shadow-lg flex items-center justify-center text-xl z-[60] border border-slate-600 transition-colors"
          aria-label="Open Code IDE"
        >
          &lt;/&gt;
        </motion.button>
      )}
    </div>
  );
}
