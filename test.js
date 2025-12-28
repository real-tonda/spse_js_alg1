import { sumPositive } from './sumPositive.js';

function runTest(name, input, expected) {
  const result = sumPositive(input);
  const status = result === expected ? 'OK' : 'FAIL';
  console.log(`Test: ${name}`);
  console.log(`  Input: ${JSON.stringify(input)}`);
  console.log(`  Expected: ${expected}`);
  console.log(`  Actual: ${result}`);
  console.log(`  Status: ${status}`);
  console.log('');
  return status === 'OK';
}

console.log('=== Testing sumPositive function ===\n');

const tests = [
  {
    name: 'Empty array',
    input: [],
    expected: 0
  },
  {
    name: 'Only negative numbers',
    input: [-1, -2, -3, -10],
    expected: 0
  },
  {
    name: 'Mixed positive and negative',
    input: [1, -2, 3, -4, 5],
    expected: 9
  },
  {
    name: 'Large numbers',
    input: [1000000, -500000, 2000000, -1000000],
    expected: 3000000
  },
  {
    name: 'Longer array',
    input: [1, 2, 3, 4, 5, -1, -2, -3, 10, 20, 30, -10],
    expected: 75
  },
  {
    name: 'With zeros',
    input: [0, 1, 2, -1, 0, 3],
    expected: 6
  },
  {
    name: 'With non-numeric values',
    input: [1, '2', 3, 'abc', null, undefined, 4],
    expected: 10
  },
  {
    name: 'All zeros',
    input: [0, 0, 0],
    expected: 0
  }
];

let passed = 0;
let failed = 0;

tests.forEach(test => {
  if (runTest(test.name, test.input, test.expected)) {
    passed++;
  } else {
    failed++;
  }
});

console.log(`\n=== Summary ===`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${tests.length}`);

