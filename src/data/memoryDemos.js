export const memoryDemos = [
  {
    id: 'system-memory',
    title: 'Operating System RAM',
    subtitle: 'Visualize how the Stack, Heap, Data, and Code segments exist in OS Memory.',
    codeLines: [
      'int global_var = 10;      // 1. Data segment',
      'int uninit_global;        // 2. BSS segment',
      'int main() {              // 3. Code/Text segment',
      '  int local = 5;          // 4. Stack segment',
      '  int* ptr = new int(20); // 5. Heap segment',
      '  return 0;',
      '}'
    ],
    steps: [
      { highlightLine: 0, note: 'Initialized globals are compiled directly into the Data Segment static block.', state: { kind: 'system-memory', highlight: 'data', layout: ['data'], blocks: [{region:'data', name:'global_var', val:'10'}] } },
      { highlightLine: 1, note: 'Uninitialized globals go to the BSS segment (statically zeroed out).', state: { kind: 'system-memory', highlight: 'bss', layout: ['data', 'bss'], blocks: [{region:'data', name:'global_var', val:'10'}, {region:'bss', name:'uninit_global', val:'0'}] } },
      { highlightLine: 2, note: 'The main function instructions are mapped into the Read-Only Code (Text) segment.', state: { kind: 'system-memory', highlight: 'code', layout: ['data', 'bss', 'code'], blocks: [{region:'data', name:'global_var', val:'10'}, {region:'bss', name:'uninit_global', val:'0'}, {region:'code', name:'main()', val:'{...}'}] } },
      { highlightLine: 3, note: 'Local variables rapidly push onto the Stack (which structurally grows downward).', state: { kind: 'system-memory', highlight: 'stack', layout: ['data', 'bss', 'code', 'stack'], blocks: [{region:'data', name:'global_var', val:'10'}, {region:'bss', name:'uninit_global', val:'0'}, {region:'code', name:'main()', val:'{...}'}, {region:'stack', name:'local', val:'5'}] } },
      { highlightLine: 4, note: 'Dynamic memory (new/malloc) dynamically allocates bounds from the Heap (grows upward).', state: { kind: 'system-memory', highlight: 'heap', layout: ['data', 'bss', 'code', 'stack', 'heap'], blocks: [{region:'data', name:'global_var', val:'10'}, {region:'bss', name:'uninit_global', val:'0'}, {region:'code', name:'main()', val:'{...}'}, {region:'stack', name:'local', val:'5'}, {region:'stack', name:'ptr', val:'0x8A'}, {region:'heap', name:'*ptr', val:'20'}] } },
      { highlightLine: 5, note: 'The program hits exit. The stack cleanly unwinds back to the system.', state: { kind: 'system-memory', highlight: 'cleanup', layout: ['data', 'bss', 'code', 'heap'], blocks: [{region:'data', name:'global_var', val:'10'}, {region:'bss', name:'uninit_global', val:'0'}, {region:'code', name:'main()', val:'{...}'}, {region:'heap', name:'*ptr', val:'20'}] } }
    ]
  },
  {
    id: 'memory-vector',
    title: 'Vector Reallocation',
    subtitle: 'See how contiguous arrays jump in memory when capacity is hit.',
    codeLines: [
      'std::vector<int> v;',
      'v.push_back(10); // cap: 1',
      'v.push_back(20); // cap: 2',
      'v.push_back(30); // cap: 4 (reallocation!)'
    ],
    steps: [
      { highlightLine: 0, note: 'Empty vector created.', state: { kind: 'memory-vector', blocks: [], capacity: 0 } },
      { highlightLine: 1, note: 'Allocate capacity 1, push 10.', state: { kind: 'memory-vector', blocks: [10], capacity: 1 } },
      { highlightLine: 2, note: 'Capacity exceeded! Allocate 2 new contiguous blocks, copy element, push 20.', state: { kind: 'memory-vector', blocks: [10, 20], capacity: 2, reallocating: true } },
      { highlightLine: 3, note: 'Capacity exceeded again! Allocate 4 new blocks, copy, push 30.', state: { kind: 'memory-vector', blocks: [10, 20, 30], capacity: 4, reallocating: true } }
    ]
  },
  {
    id: 'memory-list',
    title: 'List (Doubly-Linked)',
    subtitle: 'Visualize scattered nodes bound together by pointers in the heap.',
    codeLines: [
      'std::list<int> l;',
      'l.push_back(10);',
      'l.push_back(20);',
      'l.push_front(5);'
    ],
    steps: [
      { highlightLine: 0, note: 'List created. No nodes allocated.', state: { kind: 'memory-list', nodes: [] } },
      { highlightLine: 1, note: 'A node is allocated in the heap. Next/Prev are null.', state: { kind: 'memory-list', nodes: [10] } },
      { highlightLine: 2, note: 'Another isolated node allocated. Pointers connect them.', state: { kind: 'memory-list', nodes: [10, 20] } },
      { highlightLine: 3, note: 'push_front allocates a node to the left, rewiring pointers.', state: { kind: 'memory-list', nodes: [5, 10, 20] } }
    ]
  },
  {
    id: 'memory-deque',
    title: 'Deque Chunking',
    subtitle: 'Arrays of pointers leading to fixed-size contiguous blocks.',
    codeLines: [
      'std::deque<int> dq;',
      'dq.push_back(10);',
      'dq.push_back(20);',
      'dq.push_front(5);'
    ],
    steps: [
      { highlightLine: 0, note: 'Map structure created, no data chunks yet.', state: { kind: 'memory-deque', chunks: [] } },
      { highlightLine: 1, note: 'First memory chunk allocated. Value inserted.', state: { kind: 'memory-deque', chunks: [[10]] } },
      { highlightLine: 2, note: 'Same block fills up with contiguous memory.', state: { kind: 'memory-deque', chunks: [[10, 20]] } },
      { highlightLine: 3, note: 'push_front creates a brand new chunk and links it to the map array!', state: { kind: 'memory-deque', chunks: [[5], [10, 20]] } }
    ]
  }
];
