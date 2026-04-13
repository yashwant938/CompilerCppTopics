import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const PlayIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M8 5v14l11-7z" /></svg>;
const PauseIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>;
const PrevIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>;
const NextIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>;
const MaximizeIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>;

const demos = [
  {
    id: 'vector-member-lab',
    title: 'Vector Member Functions',
    subtitle: 'Step through reserve, push_back, front, back, at, insert, erase, pop_back, clear, and resizing.',
    codeLines: [
      'std::vector<int> values;',
      'values.reserve(5);',
      'values.push_back(10);',
      'values.push_back(20);',
      'values.push_back(30);',
      'values.front();',
      'values.back();',
      'values.at(1);',
      'values.insert(values.begin() + 1, 15);',
      'values.erase(values.begin() + 2);',
      'values.pop_back();',
      'for (int x : values) std::cout << x << " ";',
      'values.clear();',
      'values.resize(7, 100);',
      'values.shrink_to_fit();'
    ],
    steps: [
      { highlightLine: 0, note: 'We start with an empty vector. No elements are stored yet.', state: { kind: 'vector', values: [], pointer: null, capacity: 0, label: 'Empty vector created' } },
      { highlightLine: 1, note: 'reserve(5) prepares capacity for five elements. Size is still zero.', state: { kind: 'vector', values: [], pointer: null, capacity: 5, label: 'Capacity reserved to 5' } },
      { highlightLine: 2, note: 'push_back(10) appends the first element at the end.', state: { kind: 'vector', values: [10], pointer: 0, capacity: 5, label: '10 inserted' } },
      { highlightLine: 3, note: 'push_back(20) extends the sequence.', state: { kind: 'vector', values: [10, 20], pointer: 1, capacity: 5, label: '20 appended' } },
      { highlightLine: 4, note: 'push_back(30) appends one more element at the back.', state: { kind: 'vector', values: [10, 20, 30], pointer: 2, capacity: 5, label: '30 appended' } },
      { highlightLine: 5, note: 'front() reads the first element, which is 10.', state: { kind: 'vector', values: [10, 20, 30], pointer: 0, capacity: 5, label: 'front() -> 10' } },
      { highlightLine: 6, note: 'back() reads the last element, which is 30.', state: { kind: 'vector', values: [10, 20, 30], pointer: 2, capacity: 5, label: 'back() -> 30' } },
      { highlightLine: 7, note: 'at(1) safely accesses index 1 => 20.', state: { kind: 'vector', values: [10, 20, 30], pointer: 1, capacity: 5, label: 'at(1) -> 20' } },
      { highlightLine: 8, note: 'insert(begin() + 1, 15) shifts elements and inserts 15.', state: { kind: 'vector', values: [10, 15, 20, 30], pointer: 1, capacity: 5, label: '15 inserted' } },
      { highlightLine: 9, note: 'erase(begin() + 2) removes index 2 => 20.', state: { kind: 'vector', values: [10, 15, 30], pointer: 2, capacity: 5, label: '20 removed' } },
      { highlightLine: 10, note: 'pop_back() removes the last element => 30.', state: { kind: 'vector', values: [10, 15], pointer: 1, capacity: 5, label: '30 removed' } },
      { highlightLine: 11, note: 'Traversal walks left to right through the remaining values.', state: { kind: 'vector', values: [10, 15], pointer: 0, capacity: 5, label: 'Traversing' } },
      { highlightLine: 12, note: 'clear() removes all elements.', state: { kind: 'vector', values: [], pointer: null, capacity: 5, label: 'Cleared' } },
      { highlightLine: 13, note: 'resize(7, 100) expands size to 7, filling new elements with 100.', state: { kind: 'vector', values: [100, 100, 100, 100, 100, 100, 100], pointer: null, capacity: 7, label: 'Resized to 7' } },
      { highlightLine: 14, note: 'shrink_to_fit() adjusts capacity to match current size.', state: { kind: 'vector', values: [100, 100, 100, 100, 100, 100, 100], pointer: null, capacity: 7, label: 'Capacity shrunk' } }
    ]
  },
  {
    id: 'stack-push-pop',
    title: 'Stack push() / pop()',
    subtitle: 'LIFO means the last value pushed is the first value removed.',
    codeLines: [
      'std::stack<int> st;',
      'st.push(10);',
      'st.push(20);',
      'st.push(30);',
      'st.pop();',
      'std::cout << st.top();'
    ],
    steps: [
      { highlightLine: 0, note: 'The stack starts empty.', state: { kind: 'stack', values: [], top: null } },
      { highlightLine: 1, note: '10 becomes the top element.', state: { kind: 'stack', values: [10], top: 0 } },
      { highlightLine: 2, note: '20 is pushed above 10.', state: { kind: 'stack', values: [10, 20], top: 1 } },
      { highlightLine: 3, note: '30 is now on top.', state: { kind: 'stack', values: [10, 20, 30], top: 2 } },
      { highlightLine: 4, note: 'pop() removes the top element, so 30 leaves.', state: { kind: 'stack', values: [10, 20], top: 1 } },
      { highlightLine: 5, note: 'top() now reads 20.', state: { kind: 'stack', values: [10, 20], top: 1 } }
    ]
  },
  {
    id: 'queue-flow',
    title: 'Queue push() / pop()',
    subtitle: 'FIFO means the oldest element leaves first.',
    codeLines: [
      'std::queue<int> q;',
      'q.push(10);',
      'q.push(20);',
      'q.push(30);',
      'q.pop();',
      'std::cout << q.front();'
    ],
    steps: [
      { highlightLine: 0, note: 'Queue starts empty.', state: { kind: 'queue', values: [], front: null, rear: null } },
      { highlightLine: 1, note: '10 enters from the rear.', state: { kind: 'queue', values: [10], front: 0, rear: 0 } },
      { highlightLine: 2, note: '20 joins at the rear.', state: { kind: 'queue', values: [10, 20], front: 0, rear: 1 } },
      { highlightLine: 3, note: '30 joins behind 20.', state: { kind: 'queue', values: [10, 20, 30], front: 0, rear: 2 } },
      { highlightLine: 4, note: 'pop() removes 10.', state: { kind: 'queue', values: [20, 30], front: 0, rear: 1 } }, // Re-indexed simplified for viz
      { highlightLine: 5, note: 'front() returns 20.', state: { kind: 'queue', values: [20, 30], front: 0, rear: 1 } }
    ]
  },
  {
    id: 'priority-queue',
    title: 'Priority Queue top()',
    subtitle: 'Highest-priority item is exposed first.',
    codeLines: [
      'std::priority_queue<int> pq;',
      'pq.push(4);',
      'pq.push(9);',
      'pq.push(6);',
      'pq.pop();',
      'std::cout << pq.top();'
    ],
    steps: [
      { highlightLine: 0, note: 'Empty max-heap priority queue.', state: { kind: 'priority', values: [], top: null } },
      { highlightLine: 1, note: '4 becomes top.', state: { kind: 'priority', values: [4], top: 0 } },
      { highlightLine: 2, note: '9 rises to the top.', state: { kind: 'priority', values: [9, 4], top: 0 } },
      { highlightLine: 3, note: '6 is inserted but stays below 9.', state: { kind: 'priority', values: [9, 6, 4], top: 0 } },
      { highlightLine: 4, note: 'pop() removes 9.', state: { kind: 'priority', values: [6, 4], top: 0 } },
      { highlightLine: 5, note: 'top() now returns 6.', state: { kind: 'priority', values: [6, 4], top: 0 } }
    ]
  },
  {
    id: 'map-insert-find',
    title: 'Map Operations',
    subtitle: 'Associative lookup by key, counting and erasure.',
    codeLines: [
      'std::map<std::string, int> m;',
      'm["x"] = 10;',
      'm["y"] = 20;',
      'auto it = m.find("y");',
      'std::cout << it->second;',
      'if (m.count("x")) {',
      '  m.erase("x");',
      '}'
    ],
    steps: [
      { highlightLine: 0, note: 'Empty map.', state: { kind: 'map', entries: [], focusKey: null } },
      { highlightLine: 1, note: 'Key "x" stored with value 10.', state: { kind: 'map', entries: [['x', 10]], focusKey: 'x' } },
      { highlightLine: 2, note: 'Key "y" stored with value 20.', state: { kind: 'map', entries: [['x', 10], ['y', 20]], focusKey: 'y' } },
      { highlightLine: 3, note: 'find("y") returns matching iterator.', state: { kind: 'map', entries: [['x', 10], ['y', 20]], focusKey: 'y' } },
      { highlightLine: 4, note: 'Reads value 20.', state: { kind: 'map', entries: [['x', 10], ['y', 20]], focusKey: 'y' } },
      { highlightLine: 5, note: 'count("x") checks if key "x" exists => returns 1 (true).', state: { kind: 'map', entries: [['x', 10], ['y', 20]], focusKey: 'x' } },
      { highlightLine: 6, note: 'erase("x") removes the key-value pair from the map.', state: { kind: 'map', entries: [['y', 20]], focusKey: null } }
    ]
  },
  {
    id: 'set-unique',
    title: 'Set uniqueness',
    subtitle: 'Duplicates ignored, always sorted.',
    codeLines: [
      'std::set<int> s;',
      's.insert(30);',
      's.insert(10);',
      's.insert(30);',
      'for (int x : s) ...'
    ],
    steps: [
      { highlightLine: 0, note: 'Empty set.', state: { kind: 'set', values: [], focus: null } },
      { highlightLine: 1, note: '30 is inserted.', state: { kind: 'set', values: [30], focus: 30 } },
      { highlightLine: 2, note: '10 is inserted, ordering is sorted.', state: { kind: 'set', values: [10, 30], focus: 10 } },
      { highlightLine: 3, note: '30 already exists, ignored.', state: { kind: 'set', values: [10, 30], focus: 30 } },
      { highlightLine: 4, note: 'Traversal.', state: { kind: 'set', values: [10, 30], focus: 10 } }
    ]
  },
  {
    id: 'functor-demo',
    title: 'Functors (Objects)',
    subtitle: 'Objects that can be called like functions and store state.',
    codeLines: [
      'struct Accumulator {',
      '  int sum = 0;',
      '  void operator()(int x) {',
      '    sum += x;',
      '  }',
      '};',
      'Accumulator acc;',
      'acc(10);',
      'acc(25);',
      'std::cout << acc.sum;'
    ],
    steps: [
      { highlightLine: 6, note: 'Functor object "acc" instantiated with sum = 0.', state: { kind: 'functor', sum: 0, calledWith: null } },
      { highlightLine: 7, note: 'Calling acc(10) runs operator()', state: { kind: 'functor', sum: 0, calledWith: 10, flash: true } },
      { highlightLine: 3, note: 'Inside operator(), sum becomes 10.', state: { kind: 'functor', sum: 10, calledWith: 10 } },
      { highlightLine: 8, note: 'Calling acc(25) runs operator() again.', state: { kind: 'functor', sum: 10, calledWith: 25, flash: true } },
      { highlightLine: 3, note: 'sum += 25, so sum becomes 35.', state: { kind: 'functor', sum: 35, calledWith: 25 } },
      { highlightLine: 9, note: 'We can access the internal state acc.sum (35).', state: { kind: 'functor', sum: 35, calledWith: null } }
    ]
  },
  {
    id: 'algo-count',
    title: 'std::count_if',
    subtitle: 'Counting elements matching a condition using algorithms.',
    codeLines: [
      'std::vector<int> v = {1, 4, 3, 8};',
      'auto is_even = [](int x) { return x % 2 == 0; };',
      'int c = std::count_if(v.begin(), v.end(), is_even);',
      'std::cout << c;'
    ],
    steps: [
      { highlightLine: 0, note: 'Initialize vector with 4 elements.', state: { kind: 'algo', values: [1, 4, 3, 8], i: null, matchCount: 0 } },
      { highlightLine: 2, note: 'count_if starts traversing with predicate.', state: { kind: 'algo', values: [1, 4, 3, 8], i: 0, matchCount: 0 } },
      { highlightLine: 1, note: '1 is not even.', state: { kind: 'algo', values: [1, 4, 3, 8], i: 0, matchCount: 0 } },
      { highlightLine: 1, note: '4 is even => count increments.', state: { kind: 'algo', values: [1, 4, 3, 8], i: 1, matchCount: 1 } },
      { highlightLine: 1, note: '3 is not even.', state: { kind: 'algo', values: [1, 4, 3, 8], i: 2, matchCount: 1 } },
      { highlightLine: 1, note: '8 is even => count increments.', state: { kind: 'algo', values: [1, 4, 3, 8], i: 3, matchCount: 2 } },
      { highlightLine: 3, note: 'count_if completes, c is 2.', state: { kind: 'algo', values: [1, 4, 3, 8], i: null, matchCount: 2 } },
    ]
  }
];

function CodePanel({ codeLines, activeLine }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-700 bg-[#1e1e1e] h-[65vh]">
      <div className="flex-1 overflow-y-auto py-4 font-mono text-sm">
        {codeLines.map((line, index) => {
          const isActive = index === activeLine;
          return (
            <div
              key={`${index}-${line}`}
              className={`flex px-4 py-1.5 transition-colors ${
                isActive ? 'bg-[#401a20] text-[#e5e5e5] border-l-[3px] border-[#c14a5a]' : 'text-[#8b929e] border-l-[3px] border-transparent'
              }`}
            >
              <span className="w-8 select-none text-right mr-4 text-[#5c6370]">{index + 1}</span>
              <span className={isActive ? 'font-medium' : ''}>{line}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function BarChartVisualizer({ values, pointers, capacity }) {
  const maxVal = Math.max(...(values.length ? values : [1]), 50);
  const displayLength = Math.max(capacity || values.length, values.length);
  
  return (
    <div className="flex h-full flex-col justify-end items-center w-full min-h-[300px]">
      <div className="flex items-end gap-6 h-48 mb-8">
        {Array.from({ length: displayLength }).map((_, i) => {
          const val = values[i];
          const hasVal = val !== undefined;
          const heightPerc = hasVal ? `${Math.max((val / maxVal) * 100, 10)}%` : '10%';
          const activePointers = pointers.filter(p => p.index === i);
          
          return (
            <div key={i} className="flex flex-col items-center flex-1 min-w-[40px] relative">
              {hasVal && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-bold text-white mb-2"
                >
                  {val}
                </motion.div>
              )}
              <motion.div 
                layout
                initial={{ height: '0%' }}
                animate={{ height: heightPerc }}
                className={`w-full rounded-sm shadow-md ${hasVal ? 'bg-[#00c8e5]' : 'bg-slate-800 border border-slate-700'}`}
              />
              <div className="text-[10px] text-slate-500 mt-2 font-mono">{i}</div>
              
              <div className="absolute top-[100%] mt-6 flex flex-col items-center gap-1">
                 {activePointers.map((p, pidx) => (
                    <motion.div 
                      layoutId={`ptr-${p.label}`}
                      key={pidx} 
                      className={`flex flex-col items-center ${p.colorClass}`}
                    >
                       <span className="text-xl font-bold leading-none">↓</span>
                       <span className="text-sm font-bold">{p.label}</span>
                    </motion.div>
                 ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VisualPanel({ state }) {
  if (['vector', 'stack', 'queue', 'priority'].includes(state.kind)) {
    const pointers = [];
    if (state.kind === 'vector' && state.pointer !== null) {
      pointers.push({ index: state.pointer, colorClass: 'text-yellow-400', label: 'i' });
    } else if (state.kind === 'queue') {
       if (state.front !== null) pointers.push({ index: state.front, colorClass: 'text-yellow-400', label: 'f' });
       if (state.rear !== null && state.rear !== state.front) pointers.push({ index: state.rear, colorClass: 'text-purple-400', label: 'r' });
       else if (state.rear !== null && state.rear === state.front) pointers.push({ index: state.rear, colorClass: 'text-green-400', label: 'f,r' });
    } else if (['stack', 'priority'].includes(state.kind) && state.top !== null) {
       pointers.push({ index: state.top, colorClass: 'text-yellow-400', label: 'top' });
    }
    
    return <BarChartVisualizer values={state.values} pointers={pointers} capacity={state.capacity} />;
  }

  if (state.kind === 'map') {
    return (
      <div className="flex flex-col justify-center items-center h-full min-h-[300px]">
        <div className="grid gap-3 w-3/4 max-w-sm">
          {state.entries.length === 0 && <div className="text-slate-500 text-center italic">Empty</div>}
          <AnimatePresence>
            {state.entries.map(([key, value]) => (
              <motion.div
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                key={key}
                className={`flex items-center justify-between rounded-md border px-4 py-3 shadow-sm ${
                  state.focusKey === key ? 'border-cyan-400 bg-[#00c8e5]/20 shadow-[0_0_15px_rgba(0,200,229,0.3)]' : 'border-slate-700 bg-slate-800'
                }`}
              >
                <span className="font-mono font-bold text-white">"{key}"</span>
                <span className="font-mono text-[#00c8e5] text-lg">{value}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  if (state.kind === 'set') {
    return (
      <div className="flex flex-col justify-center items-center h-full min-h-[300px]">
        <div className="flex flex-wrap gap-4 justify-center">
          {state.values.length === 0 && <div className="text-slate-500 text-center italic">Empty</div>}
          <AnimatePresence>
            {state.values.map((value) => (
              <motion.div 
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                key={value} 
                className={`h-16 w-16 flex items-center justify-center rounded-full border-2 text-xl font-bold shadow-md ${
                  state.focus === value ? 'border-[#00c8e5] bg-[#00c8e5]/20 text-white shadow-[0_0_15px_rgba(0,200,229,0.3)]' : 'border-slate-700 bg-slate-800 text-slate-300'
                }`}
              >
                {value}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  if (state.kind === 'algo') {
    return (
       <div className="flex h-full flex-col justify-center items-center w-full min-h-[300px] gap-8">
          <div className="text-2xl font-bold text-slate-300">Matches Found: <span className="text-[#00c8e5] text-4xl ml-4 font-mono">{state.matchCount}</span></div>
          <div className="flex gap-4 items-end h-32">
             {state.values.map((v, idx) => (
                <div key={idx} className="flex flex-col items-center">
                   <motion.div 
                     layout
                     className={`h-16 w-16 flex items-center justify-center rounded-xl border-2 text-xl font-bold shadow-md transition-colors ${state.i === idx ? 'border-yellow-400 bg-yellow-400/20 text-white' : 'border-slate-700 bg-slate-800 text-slate-300'}`}
                   >
                     {v}
                   </motion.div>
                   <div className="h-10 mt-2">
                     {state.i === idx && (
                       <motion.span 
                         initial={{ y: 10, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         className="text-2xl font-bold text-yellow-400"
                       >
                         ↑
                       </motion.span>
                     )}
                   </div>
                </div>
             ))}
          </div>
       </div>
    );
  }

  if (state.kind === 'functor') {
    return (
       <div className="flex flex-col justify-center items-center h-full min-h-[300px]">
          <motion.div 
            animate={{ 
              scale: state.flash ? [1, 1.1, 1] : 1, 
              borderColor: state.flash ? ['#334155', '#00c8e5', '#334155'] : '#334155',
              boxShadow: state.flash ? ['0px 0px 0px rgba(0,200,229,0)', '0px 0px 30px rgba(0,200,229,0.5)', '0px 0px 0px rgba(0,200,229,0)'] : '0px 0px 0px rgba(0,200,229,0)'
            }}
            transition={{ duration: 0.4 }}
            className="border-2 border-slate-700 bg-slate-800 rounded-3xl p-10 flex flex-col items-center relative"
          >
             <div className="absolute top-0 transform -translate-y-1/2 bg-[#00c8e5] text-slate-900 font-bold px-4 py-1.5 rounded-full text-sm shadow-md tracking-wider">
                Accumulator Object
             </div>
             
             <div className="text-slate-400 mt-4 mb-2 font-mono text-lg lowercase">internal state:</div>
             <div className="text-5xl font-bold text-white mb-10 border-b-2 border-slate-700 pb-4 min-w-[3em] text-center font-mono">
               sum = <span className="text-[#00c8e5]">{state.sum}</span>
             </div>

             {state.calledWith !== null ? (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={state.calledWith}
                  className="bg-yellow-400/20 border border-yellow-400/50 text-yellow-200 px-5 py-2.5 rounded-xl font-mono text-lg shadow-inner"
                >
                  operator({state.calledWith})
                </motion.div>
             ) : (
                <div className="h-[46px]"></div>
             )}
          </motion.div>
       </div>
    );
  }

  return null
}

function DemoSelector({ onSelect }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 pt-6">
      {demos.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item.id)}
          className="rounded-xl border border-slate-700 bg-slate-900/70 p-5 text-left transition hover:border-[#00c8e5]/50 hover:bg-slate-800 shadow-sm"
        >
          <div className="text-lg font-semibold text-white">{item.title}</div>
          <div className="mt-2 text-sm text-slate-400">{item.subtitle}</div>
        </button>
      ))}
    </div>
  )
}

function AnimationSection() {
  const [demoId, setDemoId] = useState(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1);

  const demo = demos.find((item) => item.id === demoId) || null
  const step = demo ? demo.steps[stepIndex] : null
  const totalSteps = demo ? demo.steps.length : 0;

  useEffect(() => {
    let timer;
    if (isPlaying && demo && stepIndex < totalSteps - 1) {
      timer = setInterval(() => {
        setStepIndex(s => s + 1);
      }, 1200 / speed);
    } else if (stepIndex >= totalSteps - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, demo, stepIndex, totalSteps, speed]);

  const selectDemo = (id) => {
    setDemoId(id)
    setStepIndex(0)
    setIsPlaying(false)
  }

  const goBack = () => {
    setDemoId(null)
    setStepIndex(0)
    setIsPlaying(false)
  }

  const arrayRep = () => {
    if (!step || !['vector', 'stack', 'queue', 'priority', 'set'].includes(step.state.kind)) return null;
    return `[${step.state.values.join(', ')}]`;
  };

  return (
    <section className="space-y-6">
      {!demo ? (
        <>
          <div>
             <h2 className="text-3xl font-bold text-white tracking-tight">Animation Lab</h2>
             <p className="mt-3 text-slate-400">
               Interactive visualizer for standard data structures and algorithms.
             </p>
          </div>
          <DemoSelector onSelect={selectDemo} />
        </>
      ) : (
        <div className="flex flex-col h-[85vh]">
          {/* Header Bar */}
          <div className="flex justify-between items-center bg-[#151515] p-3 rounded-t-xl border border-slate-800 border-b-0 space-x-4">
             <div className="flex gap-2">
                <button 
                  onClick={goBack} 
                  className="px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 rounded-md hover:bg-slate-700 transition"
                >
                  ← Back
                </button>
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 bg-[#252525] rounded-md border border-slate-700 shadow-inner">
                   {demo.title}
                </div>
             </div>
             
             {/* Decorative Top Navbar Controls from original image (Standard, Small, etc.) */}
             <div className="hidden lg:flex gap-2">
               {['Standard', 'Small', 'Reverse Sorted', 'Already Sorted', 'Nearly Sorted', 'All Equal'].map((lbl, idx) => (
                 <button key={lbl} disabled className={`px-4 py-1.5 text-xs font-semibold rounded-md border ${idx === 3 ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800/50' : 'bg-[#1a1a1a] text-slate-500 border-slate-800'}`}>
                   {lbl}
                 </button>
               ))}
             </div>
          </div>

          <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0 border border-slate-800 bg-[#0d0d0d]">      
            {/* Left: Code Pane */}
            <div className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-slate-800 overflow-hidden">
               <div className="p-3 border-b border-slate-800 block text-xs font-semibold text-slate-500 bg-[#121212]">
                 Source Code
               </div>
               <CodePanel codeLines={demo.codeLines} activeLine={step.highlightLine} />
            </div>

            {/* Right: Visual Pane */}
            <div className="w-full md:w-7/12 flex flex-col relative bg-[#1c1c1e]">
               {/* Values Dump Header */}
               {arrayRep() && (
                 <div className="font-mono text-sm text-slate-300 p-4 font-semibold pb-0 z-10 w-full opacity-80 mt-2 ml-4">
                   values = {arrayRep()}
                 </div>
               )}

               {/* Central Visual Area */}
               <div className="flex-1 flex items-center justify-center p-8 overflow-hidden z-10">
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={`${demo.id}-${stepIndex}`}
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 1.05 }}
                     transition={{ duration: 0.2 }}
                     className="w-full"
                   >
                     <VisualPanel state={step.state} />
                   </motion.div>
                 </AnimatePresence>
               </div>

               {/* Step Description Box */}
               <div className="mx-6 mb-6 mt-auto rounded-lg bg-[#252526] border border-slate-700/60 p-5 shadow-lg text-center font-medium text-slate-200 z-20">
                  Step: <span className="text-white">{step.note}</span>
               </div>
            </div>
          </div>

          {/* Bottom Player Controller Bar */}
          <div className="bg-[#151515] border border-slate-800 border-t-0 rounded-b-xl px-4 py-3 flex items-center justify-between gap-4">
            
            {/* Playback Buttons */}
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-800 text-white transition"
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button 
                onClick={() => { setStepIndex(Math.max(0, stepIndex - 1)); setIsPlaying(false); }}
                disabled={stepIndex === 0}
                className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-800 text-white disabled:opacity-30 disabled:hover:bg-transparent transition"
              >
                <PrevIcon />
              </button>
              <button 
                onClick={() => { setStepIndex(Math.min(totalSteps - 1, stepIndex + 1)); setIsPlaying(false); }}
                disabled={stepIndex === totalSteps - 1}
                className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-800 text-white disabled:opacity-30 disabled:hover:bg-transparent transition"
              >
                <NextIcon />
              </button>
            </div>

            {/* Slider */}
            <div className="flex-1 flex items-center gap-3 px-4 hidden sm:flex">
               <input 
                 type="range" 
                 min="0" 
                 max={totalSteps - 1} 
                 value={stepIndex} 
                 onChange={(e) => {
                   setStepIndex(Number(e.target.value));
                   setIsPlaying(false);
                 }}
                 className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00c8e5]"
               />
               <span className="text-xs font-mono font-medium text-slate-400 min-w-[3rem]">
                 {stepIndex + 1} / {totalSteps}
               </span>
            </div>

            {/* Speed & Maximize */}
            <div className="flex items-center gap-3">
              <select 
                value={speed} 
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="bg-[#222] border border-slate-700 text-xs font-medium text-slate-300 rounded-md px-2 py-1.5 outline-none cursor-pointer"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={4}>4x</option>
              </select>

              <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-800 text-slate-400 transition hidden sm:flex">
                <MaximizeIcon />
              </button>
            </div>
            
          </div>
        </div>
      )}
    </section>
  )
}

export default AnimationSection
