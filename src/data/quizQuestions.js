export const quizQuestions = [
  {
    id: 1,
    question: 'Which STL container is best for implementing a compiler symbol table with average O(1) lookup?',
    options: ['unordered_map', 'vector', 'stack', 'deque'],
    correctAnswer: 'unordered_map',
    explanation: 'unordered_map supports average O(1) insert/find, making it ideal for symbol tables.'
  },
  {
    id: 2,
    question: 'Which STL container is commonly used to store AST children nodes in order?',
    options: ['vector', 'set', 'unordered_set', 'queue'],
    correctAnswer: 'vector',
    explanation: 'AST children are usually ordered and iterated sequentially, so vector is a natural fit.'
  },
  {
    id: 3,
    question: 'Which STL algorithm can sort token streams by position?',
    options: ['sort', 'accumulate', 'for_each', 'fill'],
    correctAnswer: 'sort',
    explanation: 'std::sort is the standard sorting algorithm for random-access iterators.'
  },
  {
    id: 4,
    question: 'What does std::stack model well in compiler design?',
    options: ['Scope tracking', 'Graph traversal storage', 'Hash lookups', 'Lexeme deduplication'],
    correctAnswer: 'Scope tracking',
    explanation: 'Nested scope entry/exit is naturally modeled with LIFO behavior via stack.'
  },
  {
    id: 5,
    question: 'For a control flow graph adjacency list, which STL structure is typical?',
    options: ['vector<vector<int>>', 'set<int>', 'map<int, int>', 'queue<int>'],
    correctAnswer: 'vector<vector<int>>',
    explanation: 'A vector of vectors is a compact and fast adjacency list representation.'
  },
  {
    id: 6,
    question: 'Which STL feature helps write generic compiler passes?',
    options: ['Templates', 'Macros', 'Namespaces', 'Typedef'],
    correctAnswer: 'Templates',
    explanation: 'Templates enable type-safe generic code for reusable compiler utilities.'
  },
  {
    id: 7,
    question: 'Which method gives bounds checking on vector access?',
    options: ['at()', 'operator[]', 'front()', 'data()'],
    correctAnswer: 'at()',
    explanation: 'at() throws an exception on invalid index and is safer than operator[].'
  },
  {
    id: 8,
    question: 'Which algorithm checks whether a token exists in a range?',
    options: ['find', 'transform', 'rotate', 'remove_if'],
    correctAnswer: 'find',
    explanation: 'std::find scans the range and returns iterator to the matching element.'
  },
  {
    id: 9,
    question: 'Which container preserves insertion order and allows dynamic growth?',
    options: ['vector', 'unordered_map', 'priority_queue', 'set'],
    correctAnswer: 'vector',
    explanation: 'vector keeps element order and grows dynamically.'
  },
  {
    id: 10,
    question: 'What is a major reason to prefer STL over handwritten structures in compilers?',
    options: ['Reliability and optimization', 'More assembly code', 'Larger binaries always', 'No iterators needed'],
    correctAnswer: 'Reliability and optimization',
    explanation: 'STL implementations are mature, tested, and optimized across toolchains.'
  },
  {
    id: 11,
    question: 'Which STL container stores unique sorted keys by default?',
    options: ['set', 'vector', 'unordered_map', 'list'],
    correctAnswer: 'set',
    explanation: 'std::set stores unique keys in sorted order.'
  },
  {
    id: 12,
    question: 'Which iterator pair commonly defines a full STL range?',
    options: ['begin() and end()', 'front() and back()', 'rbegin() and rend()', 'data() and size()'],
    correctAnswer: 'begin() and end()',
    explanation: 'Most STL algorithms operate on [begin, end) ranges.'
  },
  {
    id: 13,
    question: 'Which operation improves vector reallocation behavior for known sizes?',
    options: ['reserve()', 'erase()', 'clear()', 'swap()'],
    correctAnswer: 'reserve()',
    explanation: 'reserve() preallocates capacity to reduce repeated reallocations.'
  },
  {
    id: 14,
    question: 'Which container gives FIFO behavior for compiler task queues?',
    options: ['queue', 'stack', 'vector', 'set'],
    correctAnswer: 'queue',
    explanation: 'queue pops from the front and pushes at the back.'
  },
  {
    id: 15,
    question: 'Which STL header generally provides std::unordered_map?',
    options: ['<unordered_map>', '<map>', '<vector>', '<algorithm>'],
    correctAnswer: '<unordered_map>',
    explanation: 'unordered_map is declared in the <unordered_map> header.'
  },
  {
    id: 16,
    question: 'Which STL utility helps iterate and apply an action to each token?',
    options: ['for_each', 'lower_bound', 'stable_sort', 'binary_search'],
    correctAnswer: 'for_each',
    explanation: 'for_each visits each element and executes a callable.'
  },
  {
    id: 17,
    question: 'Which container is better for random access in AST vectors?',
    options: ['vector', 'list', 'forward_list', 'stack'],
    correctAnswer: 'vector',
    explanation: 'vector supports O(1) random access by index.'
  },
  {
    id: 18,
    question: 'Which operation removes all vector elements?',
    options: ['clear()', 'erase(begin())', 'pop_back()', 'resize(1)'],
    correctAnswer: 'clear()',
    explanation: 'clear() removes all elements from the container.'
  },
  {
    id: 19,
    question: 'Which structure is useful for priority-based optimization passes?',
    options: ['priority_queue', 'array', 'unordered_set', 'multimap'],
    correctAnswer: 'priority_queue',
    explanation: 'priority_queue always provides access to highest-priority item first.'
  },
  {
    id: 20,
    question: 'In STL, what is the key advantage of algorithms + iterators?',
    options: ['Container-independent operations', 'Direct machine code output', 'No compile-time checks', 'Fixed data type only'],
    correctAnswer: 'Container-independent operations',
    explanation: 'Algorithms are reusable because iterators abstract container details.'
  }
]
