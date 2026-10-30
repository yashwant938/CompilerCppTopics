import test from 'node:test'
import assert from 'node:assert/strict'
import { parseVectorTrace } from '../src/data/vectorTrace.js'

const output = `TRACE|create|0|0|
TRACE|reserve(3)|0|3|
TRACE|push_back(10)|1|3|10
TRACE|push_back(20)|2|3|10,20
TRACE|erase(begin)|1|3|20\n`

test('parses all observed states and preserves compiler capacity', () => {
  const steps = parseVectorTrace(output)
  assert.equal(steps.length, 5)
  assert.deepEqual(steps[3], { operation: 'push_back(20)', size: 2, capacity: 3, values: [10, 20] })
  assert.deepEqual(steps[4].values, [20])
})

test('rejects incomplete, inconsistent and unrecognised output', () => {
  assert.throws(() => parseVectorTrace('TRACE|create|0|0|'))
  assert.throws(() => parseVectorTrace(output.replace('2|3|10,20', '3|3|10,20')))
  assert.throws(() => parseVectorTrace(output.replace('reserve(3)', 'unknown')))
})
