import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { queryGemini } from '../data/geminiService';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I am your C++ STL teaching assistant. You can ask me any questions based on the course slides!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, showSettings]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', text: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await queryGemini(newMessages, apiKey);
      setMessages([...newMessages, { role: 'assistant', text: responseText }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', text: `❌ Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] shadow-2xl rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 flex flex-col font-sans"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="font-semibold text-slate-100">STL Assistant</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Settings"
                >
                  ⚙️
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  ✖
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-hidden relative flex flex-col bg-slate-950">
              {showSettings ? (
                <div className="p-4 flex-1 overflow-y-auto">
                  <h4 className="text-sm font-semibold mb-2 text-slate-300">API Key Settings</h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Enter your Gemini API key. This is stored only locally in your browser to respond to queries.
                  </p>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter Gemini API Key..."
                    className="w-full bg-slate-900 text-white rounded-lg p-2 border border-slate-700 outline-none focus:border-indigo-500 transition-colors"
                  />
                  <button
                    onClick={() => setShowSettings(false)}
                    className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg font-medium transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                            msg.role === 'user'
                              ? 'bg-indigo-600 text-white rounded-br-sm'
                              : 'bg-slate-800 text-slate-200 rounded-bl-sm border border-slate-700'
                          }`}
                        >
                          {msg.role === 'user' ? (
                            msg.text
                          ) : (
                            <div 
                              className="prose prose-sm prose-invert max-w-none break-words"
                              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(msg.text)) }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-slate-800 text-slate-400 border border-slate-700 rounded-2xl rounded-bl-sm px-4 py-2 text-sm flex gap-1 items-center">
                          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full"></motion.div>
                          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full"></motion.div>
                          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full"></motion.div>
                        </div>
                      </div>
                    )}
                    <div ref={bottomRef} />
                  </div>

                  <form onSubmit={handleSend} className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about the slides..."
                      className="flex-1 bg-slate-900 text-sm text-white rounded-full px-4 py-2 border border-slate-700 outline-none focus:border-indigo-500 transition-colors"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-md shadow-indigo-900/20"
                    >
                      ➤
                    </button>
                  </form>
                </>
              )}
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
          className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)] flex items-center justify-center text-2xl z-[60] border border-indigo-400/30 transition-shadow"
          aria-label="Open AI Assistant"
        >
          🤖
        </motion.button>
      )}
    </div>
  );
}
