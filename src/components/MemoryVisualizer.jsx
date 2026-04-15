import { motion, AnimatePresence } from 'framer-motion';

export default function MemoryVisualizer({ state }) {
  if (state.kind === 'system-memory') {
     const regions = [
       { id: 'high', label: 'High Address (0xFFFFFFFF)', type: 'meta', height: 'h-6' },
       { id: 'stack', label: 'Stack (grows ↓)', type: 'dynamic', height: 'h-16', color: 'bg-rose-900 border-rose-500 text-rose-200 shadow-[0_0_15px_rgba(225,29,72,0.3)]' },
       { id: 'free', label: '↓ Free Space (Heap Gap) ↑', type: 'gap', height: 'h-12' },
       { id: 'heap', label: 'Heap (grows ↑)', type: 'dynamic', height: 'h-16', color: 'bg-emerald-900 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]' },
       { id: 'bss', label: 'BSS Segment (Uninit)', type: 'static', height: 'h-10', color: 'bg-amber-900 border-amber-500 text-amber-200' },
       { id: 'data', label: 'Data Segment (Init)', type: 'static', height: 'h-10', color: 'bg-blue-900 border-blue-500 text-blue-200' },
       { id: 'code', label: 'Code Segment (Read-Only)', type: 'static', height: 'h-14', color: 'bg-violet-900 border-violet-500 text-violet-200' },
       { id: 'low', label: 'Low Address (0x00000000)', type: 'meta', height: 'h-6' }
     ];

     return (
        <div className="flex justify-center items-center h-full w-full py-4">
           <div className="w-[85%] max-w-sm flex flex-col items-stretch space-y-1">
             {regions.map((region) => {
                const isLoaded = state.layout?.includes(region.id);
                const isHighlighted = state.highlight === region.id;
                
                if (region.type === 'meta') {
                   return <div key={region.id} className={`${region.height} flex items-center justify-center font-mono text-xs text-slate-500 font-bold uppercase tracking-widest border-y border-dashed border-slate-700/50`}>{region.label}</div>;
                }
                
                if (region.type === 'gap') {
                   return <div key={region.id} className={`${region.height} flex items-center justify-center font-mono text-xs text-slate-600 bg-slate-900/50 border border-slate-800 rounded`}>{region.label}</div>;
                }
                
                return (
                   <div key={region.id} className="relative group">
                     <div className={`w-full ${region.height} bg-slate-800/80 border border-slate-700 border-l-[6px] border-l-slate-900 rounded-sm shadow-xl flex flex-col justify-center overflow-hidden transition-all duration-300 ${isHighlighted ? 'scale-[1.02] z-10 block ring-2 ring-white/20' : ''}`}>
                       <AnimatePresence>
                         {!isLoaded && (
                            <motion.div 
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-slate-900/90 flex items-center justify-center z-10"
                            >
                               <span className="font-mono text-xs text-slate-600 tracking-widest italic">{region.id.toUpperCase()} (Empty)</span>
                            </motion.div>
                         )}
                       </AnimatePresence>

                       {/* Background Shell and Watermark Label */}
                       <div className={`absolute inset-0 shadow-inner transition-colors duration-300 border-2 border-transparent ${isLoaded ? region.color : 'bg-transparent text-transparent'} ${isHighlighted ? 'brightness-125 border-white/50' : ''}`}></div>
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.15]">
                          <span className="font-mono text-sm font-bold tracking-wider text-white mix-blend-overlay">{region.label}</span>
                       </div>

                       {/* Inner Physical Blocks */}
                       <div className={`absolute inset-0 flex flex-col p-2 z-20 ${region.id === 'stack' ? 'justify-start' : region.id === 'heap' ? 'justify-end' : 'justify-center'} items-center gap-1`}>
                         <AnimatePresence>
                           {state.blocks?.filter(b => b.region === region.id).map(b => (
                              <motion.div 
                                key={b.name}
                                initial={{ opacity: 0, scale: 0.5, y: region.id === 'stack' ? -20 : region.id === 'heap' ? 20 : 0 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ type: 'spring', bounce: 0.5 }}
                                className={`bg-[#0d0d0d] border border-slate-500 rounded px-3 py-1 flex justify-between items-center w-full max-w-[180px] shadow-[0_5px_15px_rgba(0,0,0,0.5)]`}
                              >
                                <span className="text-[11px] text-slate-400 font-mono pr-2 truncate">{b.name}</span>
                                <span className="text-xs text-[#00c8e5] font-bold font-mono">{b.val}</span>
                              </motion.div>
                           ))}
                         </AnimatePresence>
                       </div>
                     </div>
                   </div>
                );
             })}
           </div>
        </div>
     );
  }

  if (state.kind === 'memory-vector') {
    return (
       <div className="flex h-full flex-col justify-center items-center w-full min-h-[300px]">
          <AnimatePresence mode="popLayout">
            <motion.div 
               key={state.capacity}
               initial={{ opacity: 0, y: state.reallocating ? -50 : 0, scale: 0.8 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
               transition={{ type: "spring", bounce: 0.4 }}
               className="flex bg-slate-800 p-3 rounded-xl border-b-4 border-r-4 border-slate-900 shadow-[20px_20px_40px_rgba(0,0,0,0.5)]"
            >
               {state.capacity === 0 && <div className="text-slate-500 italic px-8 py-4">Null Pointer (Heap Empty)</div>}
               {Array.from({length: state.capacity}).map((_, i) => (
                  <div key={i} className="w-16 h-16 bg-[#1a1a1a] border-2 border-slate-600 m-1 flex items-center justify-center rounded shadow-inner text-xl font-bold font-mono text-[#00c8e5]">
                     {state.blocks[i] !== undefined ? state.blocks[i] : ''}
                  </div>
               ))}
            </motion.div>
          </AnimatePresence>
          {state.reallocating && (
             <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="mt-8 text-yellow-400 font-bold tracking-widest text-sm uppercase">
               ⚠️ Reallocation Triggered
             </motion.div>
          )}
       </div>
    );
  }

  if (state.kind === 'memory-list') {
     return (
        <div className="flex h-full items-center justify-center overflow-x-auto p-12">
           {state.nodes.length === 0 && <div className="text-slate-500 italic">No nodes allocated</div>}
           {state.nodes.map((val, i) => (
              <div key={val} className="flex items-center">
                 {/* Prev/Next Arrows */}
                 {i > 0 && (
                   <motion.div 
                     initial={{ width: 0, opacity: 0 }} 
                     animate={{ width: 40, opacity: 1 }} 
                     className="text-indigo-400 font-bold mx-2 flex items-center justify-center font-mono text-xl"
                   >
                     ↔
                   </motion.div>
                 )}
                 
                 {/* Node Block */}
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.5, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="flex flex-col rounded-lg bg-slate-800 border-2 border-indigo-500 shadow-[10px_10px_25px_rgba(99,102,241,0.2)] overflow-hidden"
                 >
                    <div className="bg-indigo-900 text-[10px] text-indigo-300 font-mono text-center p-1 border-b border-indigo-500 uppercase font-bold tracking-widest">
                      Addr: 0x{(Math.random()*10000|0).toString(16)}
                    </div>
                    <div className="flex h-14">
                       <div className="w-8 border-r border-slate-700 bg-slate-900 flex items-center justify-center text-[10px] text-slate-500 hover:text-indigo-400 font-bold cursor-help" title="Prev Pointer">•</div>
                       <div className="w-16 px-4 flex items-center justify-center font-bold text-white text-xl">{val}</div>
                       <div className="w-8 border-l border-slate-700 bg-slate-900 flex items-center justify-center text-[10px] text-slate-500 hover:text-indigo-400 font-bold" title="Next Pointer">•</div>
                    </div>
                 </motion.div>
              </div>
           ))}
        </div>
     );
  }

  if (state.kind === 'memory-deque') {
     return (
        <div className="flex h-full flex-col justify-center items-center gap-12 w-full p-8">
           {state.chunks.length === 0 && <div className="text-slate-500 italic">No Maps Allocated</div>}
           
           <div className="flex w-full items-center justify-center gap-8">
             {/* Map Array (Array of Pointers) */}
             {state.chunks.length > 0 && (
                <div className="flex flex-col bg-slate-800 rounded p-2 border-2 border-slate-600 shadow-[10px_10px_20px_rgba(0,0,0,0.5)]">
                   <div className="text-[10px] uppercase font-bold text-slate-400 text-center mb-2 tracking-widest">Map Array</div>
                   <div className="flex flex-col gap-1">
                      {state.chunks.map((_, i) => (
                         <div key={`ptr-${i}`} className="w-12 h-6 bg-slate-700 border border-slate-500 flex items-center justify-center relative">
                            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                            <div className="absolute right-[-2.5rem] w-8 h-[2px] bg-pink-500/50"></div>
                         </div>
                      ))}
                   </div>
                </div>
             )}

             {/* Contiguous Chunks Component */}
             <div className="flex flex-col gap-4">
               {state.chunks.map((chunk, cidx) => (
                  <motion.div 
                     initial={{ opacity: 0, x: 50 }}
                     animate={{ opacity: 1, x: 0 }}
                     key={cidx} 
                     className="flex gap-1 bg-slate-900 border-2 border-pink-500 p-2 rounded shadow-[15px_15px_30px_rgba(236,72,153,0.15)] relative"
                  >
                     <div className="absolute -left-[3px] top-1/2 w-[6px] h-[6px] bg-pink-500 rounded-full transform -translate-y-1/2 -translate-x-1/2"></div>
                     {/* Capacity 3 blocks per chunk */}
                     {Array.from({length: 3}).map((_, i) => (
                        <div key={i} className={`w-12 h-12 border rounded flex items-center justify-center text-lg font-bold font-mono ${chunk[i] !== undefined ? 'bg-[#1a1a1a] border-slate-700 text-[#00c8e5]' : 'bg-transparent border-slate-800 text-slate-600'}`}>
                           {chunk[i] !== undefined ? chunk[i] : '∅'}
                        </div>
                     ))}
                  </motion.div>
               ))}
             </div>
           </div>
        </div>
     );
  }

  return null;
}
