export const codeExamples = [
  {
    id: 'symbol-table',
    title: 'unordered_map Symbol Table',
    description: 'Fast identifier lookup during semantic analysis.',
    tags: ['Symbol Table', 'Semantic Analysis'],
    code: `#include <iostream>
#include <string>
#include <unordered_map>

enum class Type { Int, Float, Bool };
struct SymbolInfo { Type type; int scopeLevel; };

int main() {
    std::unordered_map<std::string, SymbolInfo> table;
    table["x"] = {Type::Int, 1};
    table["y"] = {Type::Float, 1};

    std::string key = "x";
    auto it = table.find(key);
    if (it != table.end()) {
        std::cout << "Found " << key << " in scope " << it->second.scopeLevel << "\\n";
    } else {
        std::cout << "Undeclared identifier\\n";
    }
}`
  },
  {
    id: 'ast-vector',
    title: 'vector for AST Nodes',
    description: 'Ordered child storage for expression trees.',
    tags: ['AST', 'Tree'],
    code: `#include <iostream>
#include <memory>
#include <string>
#include <vector>

struct ASTNode {
    std::string value;
    std::vector<std::shared_ptr<ASTNode>> children;
};

int main() {
    auto root = std::make_shared<ASTNode>();
    root->value = "BinaryExpr:+";

    auto left = std::make_shared<ASTNode>();
    left->value = "Identifier:x";
    auto right = std::make_shared<ASTNode>();
    right->value = "Literal:42";

    root->children.push_back(left);
    root->children.push_back(right);
    std::cout << root->value << " has " << root->children.size() << " children\\n";
}`
  },
  {
    id: 'cfg-graph',
    title: 'Control Flow Graph',
    description: 'Adjacency list graph using vector<vector<int>>.',
    tags: ['CFG', 'Optimization'],
    code: `#include <iostream>
#include <vector>

class CFG {
public:
    explicit CFG(int n) : adj(n) {}
    void addEdge(int u, int v) { adj[u].push_back(v); }
    void print() const {
        for (int i = 0; i < (int)adj.size(); ++i) {
            std::cout << "B" << i << " -> ";
            for (int v : adj[i]) std::cout << "B" << v << " ";
            std::cout << "\\n";
        }
    }
private:
    std::vector<std::vector<int>> adj;
};

int main() {
    CFG cfg(4);
    cfg.addEdge(0, 1); cfg.addEdge(1, 2);
    cfg.addEdge(1, 3); cfg.addEdge(2, 3);
    cfg.print();
}`
  },
  {
    id: 'token-pipeline',
    title: 'Token Pipeline (deque)',
    description: 'Push/pop from both ends for lexical processing.',
    tags: ['Lexer', 'Deque'],
    code: `#include <deque>
#include <iostream>
#include <string>

int main() {
    std::deque<std::string> tokens = {"int", "x", "=", "10", ";"};
    tokens.push_front("LINE_START");
    tokens.push_back("LINE_END");

    while (!tokens.empty()) {
        std::cout << tokens.front() << " ";
        tokens.pop_front();
    }
    std::cout << "\\n";
}`
  },
  {
    id: 'precedence-stack',
    title: 'Operator Precedence Stack',
    description: 'LIFO handling for expression parsing.',
    tags: ['Parser', 'Stack'],
    code: `#include <iostream>
#include <stack>
#include <string>

int precedence(char op) {
    if (op == '+' || op == '-') return 1;
    if (op == '*' || op == '/') return 2;
    return 0;
}

int main() {
    std::string expr = "a+b*c";
    std::stack<char> ops;
    for (char c : expr) {
        if (c == '+' || c == '-' || c == '*' || c == '/') {
            while (!ops.empty() && precedence(ops.top()) >= precedence(c)) {
                std::cout << "pop " << ops.top() << "\\n";
                ops.pop();
            }
            ops.push(c);
        }
    }
    while (!ops.empty()) { std::cout << "pop " << ops.top() << "\\n"; ops.pop(); }
}`
  },
  {
    id: 'priority-worklist',
    title: 'Priority Worklist',
    description: 'priority_queue for optimization pass scheduling.',
    tags: ['Optimizer', 'Priority Queue'],
    code: `#include <iostream>
#include <queue>
#include <string>

struct Task {
    int priority;
    std::string name;
    bool operator<(const Task& other) const { return priority < other.priority; }
};

int main() {
    std::priority_queue<Task> worklist;
    worklist.push({2, "DeadCodeElim"});
    worklist.push({5, "Inlining"});
    worklist.push({3, "ConstantFold"});

    while (!worklist.empty()) {
        auto t = worklist.top(); worklist.pop();
        std::cout << t.name << " (p=" << t.priority << ")\\n";
    }
}`
  },
  {
    id: 'map-types',
    title: 'Type Registry (map)',
    description: 'Ordered type table for deterministic diagnostics.',
    tags: ['Type System', 'Map'],
    code: `#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> typeSize = {
        {"bool", 1}, {"char", 1}, {"int", 4}, {"double", 8}
    };

    for (const auto& [name, sz] : typeSize) {
        std::cout << name << " -> " << sz << " bytes\\n";
    }
}`
  },
  {
    id: 'set-unique-symbols',
    title: 'Unique Symbol Capture (set)',
    description: 'Deduplicate identifiers discovered during scanning.',
    tags: ['Scanner', 'Set'],
    code: `#include <iostream>
#include <set>
#include <string>
#include <vector>

int main() {
    std::vector<std::string> ids = {"x", "sum", "x", "temp", "sum", "i"};
    std::set<std::string> unique(ids.begin(), ids.end());
    for (const auto& id : unique) std::cout << id << "\\n";
}`
  },
  {
    id: 'vector-member-functions',
    title: 'Vector Member Functions',
    description: 'A practical walkthrough of common vector operations used in compiler utilities.',
    tags: ['Vector', 'Member Functions'],
    code: `#include <iostream>
#include <vector>

void print(const std::vector<int>& values, const std::string& label) {
    std::cout << label << ": ";
    for (int value : values) std::cout << value << " ";
    std::cout << "\\n";
}

int main() {
    std::vector<int> values;
    std::cout << "empty = " << values.empty() << "\\n";

    values.reserve(6);
    std::cout << "capacity after reserve = " << values.capacity() << "\\n";

    values.push_back(10);
    values.push_back(20);
    values.push_back(30);
    print(values, "after push_back");

    values.insert(values.begin() + 1, 15);
    print(values, "after insert");

    std::cout << "front = " << values.front() << ", back = " << values.back() << "\\n";
    std::cout << "at(2) = " << values.at(2) << ", size = " << values.size() << "\\n";

    values.erase(values.begin() + 2);
    print(values, "after erase");

    values.pop_back();
    print(values, "after pop_back");

    std::vector<int> other = {100, 200};
    values.swap(other);
    print(values, "after swap");

    values.clear();
    std::cout << "size after clear = " << values.size() << "\\n";
}`
  },
  {
    id: 'map-member-functions',
    title: 'Map Member Functions',
    description: 'Common map operations for deterministic symbol and type registries.',
    tags: ['Map', 'Associative Container'],
    code: `#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, std::string> typeTable;

    typeTable.insert({"x", "int"});
    typeTable["y"] = "float";
    typeTable["flag"] = "bool";

    std::cout << "size = " << typeTable.size() << "\\n";
    std::cout << "y -> " << typeTable.at("y") << "\\n";

    auto found = typeTable.find("x");
    if (found != typeTable.end()) {
        std::cout << "found x -> " << found->second << "\\n";
    }

    std::cout << "count(flag) = " << typeTable.count("flag") << "\\n";

    typeTable.erase("y");
    std::cout << "after erase(y), size = " << typeTable.size() << "\\n";

    for (const auto& [name, type] : typeTable) {
        std::cout << name << " : " << type << "\\n";
    }

    typeTable.clear();
    std::cout << "empty after clear = " << typeTable.empty() << "\\n";
}`
  },
  {
    id: 'set-member-functions',
    title: 'Set Member Functions',
    description: 'Unique sorted storage with lookup and erase operations.',
    tags: ['Set', 'Unique Keys'],
    code: `#include <iostream>
#include <set>

int main() {
    std::set<int> liveVars;

    liveVars.insert(30);
    liveVars.insert(10);
    liveVars.insert(20);
    liveVars.insert(20);

    std::cout << "size = " << liveVars.size() << "\\n";
    std::cout << "count(20) = " << liveVars.count(20) << "\\n";

    auto it = liveVars.find(10);
    if (it != liveVars.end()) {
        std::cout << "found = " << *it << "\\n";
    }

    liveVars.erase(20);

    std::cout << "contents: ";
    for (int value : liveVars) std::cout << value << " ";
    std::cout << "\\n";

    liveVars.clear();
    std::cout << "empty = " << liveVars.empty() << "\\n";
}`
  },
  {
    id: 'heap-algorithms',
    title: 'Heap Algorithms',
    description: 'Use make_heap, push_heap, pop_heap, and sort_heap on optimization priorities.',
    tags: ['Heap', 'Algorithms'],
    code: `#include <algorithm>
#include <iostream>
#include <vector>

void print(const std::vector<int>& values, const std::string& label) {
    std::cout << label << ": ";
    for (int value : values) std::cout << value << " ";
    std::cout << "\\n";
}

int main() {
    std::vector<int> priorities = {4, 1, 7, 3, 9};

    std::make_heap(priorities.begin(), priorities.end());
    print(priorities, "after make_heap");

    priorities.push_back(6);
    std::push_heap(priorities.begin(), priorities.end());
    print(priorities, "after push_heap");

    std::pop_heap(priorities.begin(), priorities.end());
    int top = priorities.back();
    priorities.pop_back();
    std::cout << "popped top = " << top << "\\n";

    std::sort_heap(priorities.begin(), priorities.end());
    print(priorities, "after sort_heap");
}`
  },
  {
    id: 'functor-comparator',
    title: 'Functors and Custom Comparators',
    description: 'A functor controlling sort order for compiler diagnostics.',
    tags: ['Functor', 'Comparator'],
    code: `#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

struct BySeverityDescending {
    bool operator()(const std::pair<std::string, int>& a,
                    const std::pair<std::string, int>& b) const {
        return a.second > b.second;
    }
};

int main() {
    std::vector<std::pair<std::string, int>> diagnostics = {
        {"unused variable", 1},
        {"type mismatch", 5},
        {"missing semicolon", 3}
    };

    std::sort(diagnostics.begin(), diagnostics.end(), BySeverityDescending{});

    for (const auto& [message, severity] : diagnostics) {
        std::cout << severity << " -> " << message << "\\n";
    }
}`
  },
  {
    id: 'algorithm-showcase',
    title: 'STL Algorithm Showcase',
    description: 'for_each, find_if, count_if, sort, reverse, rotate, and partition in one demo.',
    tags: ['Algorithms', 'Iterators'],
    code: `#include <algorithm>
#include <iostream>
#include <vector>

void print(const std::vector<int>& values, const std::string& label) {
    std::cout << label << ": ";
    for (int value : values) std::cout << value << " ";
    std::cout << "\\n";
}

int main() {
    std::vector<int> data = {5, 2, 8, 1, 8, 4, 3};

    std::for_each(data.begin(), data.end(), [](int& x) { x += 1; });
    print(data, "after for_each");

    auto firstBig = std::find_if(data.begin(), data.end(), [](int x) { return x > 6; });
    if (firstBig != data.end()) std::cout << "first > 6 = " << *firstBig << "\\n";

    std::cout << "count_if even = "
              << std::count_if(data.begin(), data.end(), [](int x) { return x % 2 == 0; })
              << "\\n";

    std::sort(data.begin(), data.end());
    print(data, "after sort");

    std::reverse(data.begin(), data.end());
    print(data, "after reverse");

    std::rotate(data.begin(), data.begin() + 2, data.end());
    print(data, "after rotate");

    std::partition(data.begin(), data.end(), [](int x) { return x % 2 == 0; });
    print(data, "after partition");
}`
  },
  {
    id: 'set-algorithms',
    title: 'Set Algorithms',
    description: 'Union, intersection, difference, and symmetric difference on sorted ranges.',
    tags: ['Set Algorithms', 'algorithm'],
    code: `#include <algorithm>
#include <iostream>
#include <iterator>
#include <vector>

void print(const std::vector<int>& values, const std::string& label) {
    std::cout << label << ": ";
    for (int value : values) std::cout << value << " ";
    std::cout << "\\n";
}

int main() {
    std::vector<int> a = {1, 2, 3, 5};
    std::vector<int> b = {3, 4, 5, 6};
    std::vector<int> out;

    std::set_union(a.begin(), a.end(), b.begin(), b.end(), std::back_inserter(out));
    print(out, "union");

    out.clear();
    std::set_intersection(a.begin(), a.end(), b.begin(), b.end(), std::back_inserter(out));
    print(out, "intersection");

    out.clear();
    std::set_difference(a.begin(), a.end(), b.begin(), b.end(), std::back_inserter(out));
    print(out, "difference a-b");

    out.clear();
    std::set_symmetric_difference(a.begin(), a.end(), b.begin(), b.end(), std::back_inserter(out));
    print(out, "symmetric difference");
}`
  }
]
