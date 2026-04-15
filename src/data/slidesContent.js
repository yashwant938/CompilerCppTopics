export const slidesContent = [
  {
    title: 'SLIDE 1 - What is STL?',
    lines: [
      'C++ STL stands for Standard Template Library.',
      'It is a powerful and extensive collection of template-based classes and functions provided in C++.',
      'These templates allow us to write generic and reusable code that works across different data types.',
      'STL provides commonly used data structures and algorithms like vectors, maps, sorting, searching, etc.',
      'Instead of implementing these from scratch, we can directly use STL.',
      'So overall, STL helps in writing efficient, reusable, and maintainable code.'
    ]
  },
  {
    title: 'SLIDE 2 - Why we need STL?',
    lines: [
      'Efficiency: STL provides highly optimized implementations of data structures and algorithms, which are tested and efficient.',
      'Productivity: It reduces development time because we do not need to reinvent common data structures like arrays, lists, or maps.',
      'Consistency: STL provides a standardized way to use data structures and algorithms, making code easier to understand.',
      'Portability: Code written using STL works across different compilers since it is part of the C++ standard.',
      'Safety: STL reduces common errors like memory leaks. For example, smart pointers help manage memory automatically.',
      'Maintainability: STL-based code is easier to maintain because it uses well-tested and standardized components.',
      'Performance Optimization: STL algorithms are optimized and often perform better than manually written implementations.',
      'Expressiveness: It allows us to write cleaner and more readable code.',
      'Community and Resources: There is strong community support, making it easier to learn and use.'
    ]
  },
  {
    title: 'SLIDE 3 - Common Components in STL',
    lines: [
      'STL mainly consists of four components.',
      'Containers: Examples include vector, list, queue, stack, set, and map.',
      'Algorithms: Operations like sorting, searching, and reversing.',
      'Iterators: Used to traverse elements in containers.',
      'Functors: Objects that behave like functions.',
      'These components work together to make STL powerful and flexible.'
    ]
  },
  {
    title: 'SLIDE 4 - Containers',
    lines: [
      'Containers in C++ STL are data structures used to store and manage collections of objects.',
      'They provide a standardized way to store, retrieve, and manipulate data.',
      'Each container has its own characteristics and is suitable for different use cases.'
    ]
  },
  {
    title: 'SLIDE 5 - Vector',
    lines: [
      'Vector is a dynamic array that can grow or shrink in size.',
      'It allows fast random access to elements.',
      'Insertion and removal at the end is efficient.',
      'It is suitable for most scenarios where elements are stored in a linear sequence.',
      'Internally, vector stores elements in contiguous memory like an array.'
    ]
  },
  {
    title: 'SLIDE 6 - Vector Member Functions',
    lines: [
      'begin(): Returns an iterator pointing to the first element.',
      'end(): Returns an iterator pointing just after the last element.',
      'size(): Returns the number of elements in the vector.',
      'empty(): Checks whether the vector is empty.',
      'capacity(): Returns how many elements the vector can hold before reallocating.',
      'reserve(size_type n): Requests capacity increase to reduce reallocations.',
      'max_size(): Returns the maximum possible number of elements.',
      'front(): Accesses the first element.',
      'back(): Accesses the last element.',
      'operator[](size_type n): Accesses element at index without bounds check.',
      'at(size_type n): Accesses element at index with bounds check.',
      'push_back(const T& value): Adds an element at the end.',
      'pop_back(): Removes the last element.',
      'insert(iterator position, const T& value): Inserts before position.',
      'erase(iterator position) or erase(iterator first, iterator last): Removes one or more elements.',
      'clear(): Removes all elements.',
      'swap(vector& x): Swaps contents with another vector.',
      'shrink_to_fit(): Requests the container to reduce its capacity to fit its size.'
    ]
  },
  {
    title: 'SLIDE 7 - List',
    lines: [
      'Doubly-linked list.',
      'Allows fast insertions and removals anywhere in the list.',
      'No random access like vectors.'
    ]
  },
  {
    title: 'SLIDE 8 - List Member Functions',
    lines: [
      'begin(): Returns an iterator pointing to the first element in the list.',
      'end(): Returns an iterator pointing to the past-the-end element in the list.',
      'size(): Returns the number of elements in the list.',
      'empty(): Checks if the list is empty.',
      'front(): Accesses the first element in the list.',
      'back(): Accesses the last element in the list.',
      'push_back(const T& value): Adds element at the end of the list.',
      'pop_back(): Removes last element from the list.',
      'insert(iterator position, const T& value): Inserts new element before position in the list.',
      'erase(iterator position) or erase(iterator first, iterator last): Removes one or more elements starting at position.',
      'clear(): Removes all elements from the list and leaves size 0.',
      'swap(list& x): Swaps contents with another list of same type, including sizes.',
      'pop_front(): Removes first element from the list.',
      'push_front(const T& value): Adds element at the beginning of the list.',
      'remove(const T& value): Removes all elements from the list equal to the specified value.'
    ]
  },
  {
    title: 'SLIDE 9 - Queue',
    lines: [
      'Adaptor class that provides a First-In, First-Out (FIFO) data structure.',
      'Implemented using other containers (for example deque or list) as the underlying storage.'
    ]
  },
  {
    title: 'SLIDE 10 - Queue Member Functions',
    lines: [
      'empty(): Checks if the queue is empty.',
      'size(): Returns the number of elements in the queue.',
      'front(): Accesses the first element in the queue, which is the next element to be removed.',
      'back(): Accesses the last element in the queue, which is the most recently added element.',
      'push(const T& value): Adds an element to the end of the queue.',
      'pop(): Removes the first element from the queue.',
      'swap(queue& x): Swaps the contents of the queue with another queue of the same type.'
    ]
  },
  {
    title: 'SLIDE 11 - Stack',
    lines: [
      'Adaptor class that provides a Last-In, First-Out (LIFO) data structure.',
      'Implemented using other containers (for example vector, deque, or list) as the underlying storage.'
    ]
  },
  {
    title: 'SLIDE 12 - Stack Member Functions',
    lines: [
      'empty(): Checks if the stack is empty.',
      'size(): Returns the number of elements in the stack.',
      'top(): Accesses the top element of the stack, which is the most recently added element.',
      'push(const T& value): Adds an element to the top of the stack.',
      'pop(): Removes the top element from the stack.',
      'swap(stack& x): Swaps the contents of the stack with another stack of the same type.'
    ]
  },
  {
    title: 'SLIDE 13 - Deque',
    lines: [
      'Double-ended queue.',
      'Similar to vectors but allows efficient insertion and removal at both ends.',
      'Suitable when elements need to be inserted or removed frequently from the front or back.'
    ]
  },
  {
    title: 'SLIDE 14 - Deque Member Functions',
    lines: [
      'begin(): Returns an iterator pointing to the first element in the deque.',
      'end(): Returns an iterator pointing to the past-the-end element in the deque.',
      'size(): Returns the number of elements currently in the deque.',
      'empty(): Checks if the deque is empty.',
      'front(): Accesses the first element in the deque.',
      'back(): Accesses the last element in the deque.',
      'operator[](size_type n): Accesses element at index without bounds checking.',
      'at(size_type n): Accesses element at index with bounds checking.',
      'push_back(const T& value): Adds element to the end of the deque.',
      'pop_back(): Removes the last element from the deque.',
      'pop_front(): Removes the first element from the deque.',
      'push_front(const T& value): Adds element to the beginning of the deque.',
      'insert(iterator position, const T& value): Inserts a new element before given position.',
      'erase(iterator position) or erase(iterator first, iterator last): Removes one or more elements from specified position.',
      'clear(): Removes all elements from deque and leaves size 0.',
      'swap(deque& x): Swaps contents with another deque of the same type, including sizes.'
    ]
  },
  {
    title: 'SLIDE 15 - Priority Queue',
    lines: [
      'Adaptor class that provides a priority queue (heap).',
      'Elements are stored in a way that allows retrieval of the highest-priority element efficiently.'
    ]
  },
  {
    title: 'SLIDE 16 - Priority Queue Member Functions',
    lines: [
      'empty(): Checks if the priority queue is empty.',
      'size(): Returns the number of elements currently in the priority queue.',
      'top(): Accesses the element at the top, which is the largest (highest-priority) element based on comparator.',
      'push(const T& value): Adds an element and reorders to maintain heap property.',
      'pop(): Removes the top element and reorders remaining elements to maintain heap property.',
      'swap(priority_queue& x): Swaps contents with another priority queue of the same type.'
    ]
  },
  {
    title: 'SLIDE 17 - Map',
    lines: [
      'Associative container that stores key-value pairs.',
      'Allows efficient retrieval and modification of values based on keys.',
      'Keys are unique within the map.'
    ]
  },
  {
    title: 'SLIDE 18 - Map Member Functions',
    lines: [
      'begin(): Returns an iterator to the first key-value pair in the map.',
      'end(): Returns an iterator to the past-the-end element in the map.',
      'empty(): Checks if the map is empty.',
      'size(): Returns number of key-value pairs in the map.',
      'operator[](const Key& key): Accesses value by key, inserting a new element if key does not exist.',
      'at(const Key& key): Accesses value by key, throws exception if key is not found.',
      'insert(...): Inserts a new key-value pair into the map.',
      'erase(...): Removes one or more elements by key, iterator, or range.',
      'clear(): Removes all key-value pairs and leaves size 0.',
      'find(const Key& key): Returns iterator to key, or end() if not found.',
      'count(const Key& key): Returns number of elements with key (for std::map it is 0 or 1).'
    ]
  },
  {
    title: 'SLIDE 19 - Set',
    lines: [
      'Sorted collection of unique elements.',
      'Elements are stored in sorted order, and duplicates are automatically removed.',
      'Provides efficient insertion, deletion, and search operations.'
    ]
  },
  {
    title: 'SLIDE 20 - Set Member Functions',
    lines: [
      'begin(): Returns an iterator pointing to the first element in the set.',
      'end(): Returns an iterator pointing to the past-the-end element in the set.',
      'empty(): Checks if the set is empty.',
      'size(): Returns the number of elements in the set.',
      'insert(const T& value): Inserts a new element while maintaining order and uniqueness.',
      'erase(...): Removes one or more elements by key, position, or range.',
      'clear(): Removes all elements from the set and leaves size 0.',
      'find(const T& key): Returns iterator to key, or end() if not found.',
      'count(const T& key): Returns number of elements with key (for std::set it is 0 or 1).'
    ]
  },
  {
    title: 'SLIDE 21 - Algorithms in STL',
    lines: [
      'The C++ STL includes a wide range of algorithms that operate on containers such as vectors, lists, sets, and maps.',
      'These algorithms are defined in the <algorithm> header and provide core data manipulation functionality.'
    ]
  },
  {
    title: 'SLIDE 22 - Iterators and Iterating Algorithms',
    lines: [
      'std::for_each: Applies a function to each element in a range.',
      'std::find: Searches for a specific element in a range.',
      'std::find_if: Searches for the first element that satisfies a predicate.',
      'std::count: Counts occurrences of a value in a range.',
      'std::count_if: Counts elements that satisfy a predicate.',
      'std::sort: Sorts elements in ascending order.',
      'std::reverse: Reverses the order of elements in a range.',
      'std::rotate: Rotates elements in a range.',
      'std::unique: Removes duplicate consecutive elements from a sorted range.',
      'std::partition: Divides elements into two groups based on a predicate.'
    ]
  },
  {
    title: 'SLIDE 23 - Numeric Algorithms',
    lines: [
      'std::accumulate: Computes the sum of elements in a range.',
      'std::inner_product: Computes the inner product of two ranges.',
      'std::partial_sum: Computes partial sums of a range.',
      'std::iota: Fills a range with incrementing values.'
    ]
  },
  {
    title: 'SLIDE 24 - Searching and Finding Algorithms',
    lines: [
      'std::binary_search: Checks if a value exists in a sorted range.',
      'std::lower_bound: Finds the first element greater than or equal to a value in a sorted range.',
      'std::upper_bound: Finds the first element greater than a value in a sorted range.',
      'std::equal_range: Finds the range of elements equal to a value in a sorted range.'
    ]
  },
  {
    title: 'SLIDE 25 - Min and Max Algorithms',
    lines: [
      'std::min: Returns the smaller of two values.',
      'std::max: Returns the larger of two values.',
      'std::min_element: Finds the smallest element in a range.',
      'std::max_element: Finds the largest element in a range.'
    ]
  },
  {
    title: 'SLIDE 26 - Heap Algorithms',
    lines: [
      'std::make_heap: Converts a range into a max-heap.',
      'std::push_heap: Inserts an element into a max-heap.',
      'std::pop_heap: Removes the largest element from a max-heap.',
      'std::sort_heap: Sorts a range that represents a max-heap.'
    ]
  },
  {
    title: 'SLIDE 27 - Set Algorithms',
    lines: [
      'std::set_union: Computes union of two sorted ranges.',
      'std::set_intersection: Computes intersection of two sorted ranges.',
      'std::set_difference: Computes difference between two sorted ranges.',
      'std::set_symmetric_difference: Computes symmetric difference of two sorted ranges.'
    ]
  },
  {
    title: 'SLIDE 28 - Functors',
    lines: [
      'Functors (function objects) are objects that behave like functions and can be called with function-call syntax.',
      'They are implemented as classes or structs that overload operator().',
      'In STL, functors are commonly used as custom comparators or custom operations in algorithms and containers.'
    ]
  },
  {
    title: 'SLIDE 29 - Functor Usage in Algorithms',
    lines: [
      'Functors are commonly used as arguments to STL algorithms to provide custom behavior for sorting, searching, and more.',
      'For custom objects, a functor can define sorting criteria based on selected object attributes.'
    ]
  },
  {
    title: 'SLIDE 30 - Random Access Iterators',
    lines: [
      'Random access iterators support both traversal and arithmetic operations.',
      'Example with std::vector<int>::iterator: forward traversal, backward traversal, and index-style movement using iterator arithmetic.',
      'Useful when algorithms require fast jumps (for example sort and binary-search style operations).'
    ]
  },
  {
    title: 'SLIDE 31 - Function Call Operator operator()',
    lines: [
      'Functors define behavior through function call operator operator().',
      'When a functor object is invoked like a function, operator() executes and applies custom logic.'
    ]
  },
  {
    title: 'SLIDE 32 - Custom Comparators',
    lines: [
      'Functors are frequently used to provide custom comparison logic in STL sorting and searching.',
      'For example, std::sort can accept a comparator functor to define ascending, descending, or domain-specific ordering.'
    ]
  },
  {
    title: 'SLIDE 33 - Advantages of Functors',
    lines: [
      'Functors provide a flexible way to customize behavior compared with plain function pointers.',
      'They are type-safe, allowing the compiler to catch type-related errors at compile time.',
      'Functors can carry additional state, making them versatile for many tasks.'
    ]
  }
]
