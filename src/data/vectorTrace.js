// This program emits its own observations. It is not a debugger or a memory trace.
export const TRACE_SOURCE = `#include <iostream>
#include <vector>

void trace(const char* operation, const std::vector<int>& values) {
  std::cout << "TRACE|" << operation << "|" << values.size()
            << "|" << values.capacity() << "|";
  for (std::size_t i = 0; i < values.size(); ++i) {
    if (i) std::cout << ",";
    std::cout << values[i];
  }
  std::cout << "\\n";
}

int main() {
  std::vector<int> values;
  trace("create", values);
  values.reserve(3);
  trace("reserve(3)", values);
  values.push_back(10);
  trace("push_back(10)", values);
  values.push_back(20);
  trace("push_back(20)", values);
  values.erase(values.begin());
  trace("erase(begin)", values);
}`

const OPERATIONS = ['create', 'reserve(3)', 'push_back(10)', 'push_back(20)', 'erase(begin)']

export function parseVectorTrace(output) {
  const lines = output.trim().split(/\r?\n/)
  if (lines.length !== OPERATIONS.length) throw new Error('The compiler returned an incomplete trace.')
  return lines.map((line, index) => {
    const match = /^TRACE\|([^|]+)\|(\d+)\|(\d+)\|(-?\d+(?:,-?\d+)*)?$/.exec(line)
    if (!match || match[1] !== OPERATIONS[index]) throw new Error('The compiler returned an invalid trace.')
    const size = Number(match[2])
    const capacity = Number(match[3])
    const values = match[4] ? match[4].split(',').map(Number) : []
    if (size !== values.length || capacity < size || size > 100 || capacity > 100000) {
      throw new Error('The compiler returned inconsistent vector data.')
    }
    return { operation: match[1], size, capacity, values }
  })
}
