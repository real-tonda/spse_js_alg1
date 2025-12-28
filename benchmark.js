import { removeDuplicatesList, removeDuplicatesSet } from './removeDuplicates.js';

function generateTestData(size, duplicateRatio = 0.5) {
  const uniqueCount = Math.floor(size * (1 - duplicateRatio));
  const uniqueItems = Array.from({ length: uniqueCount }, (_, i) => `item_${i}`);
  const result = [];
  
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * uniqueItems.length);
    result.push(uniqueItems[randomIndex]);
  }
  
  return result;
}

function measureTime(fn, data) {
  const start = performance.now();
  fn(data);
  const end = performance.now();
  return end - start;
}

function runBenchmark(name, fn, data) {
  const times = [];
  const iterations = 5;
  
  for (let i = 0; i < iterations; i++) {
    const time = measureTime(fn, [...data]);
    times.push(time);
  }
  
  const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  
  return {
    name,
    avgTime: avgTime.toFixed(3),
    minTime: minTime.toFixed(3),
    maxTime: maxTime.toFixed(3)
  };
}

console.log('=== Benchmarking duplicate removal functions ===\n');

const sizes = [1000, 50000];

sizes.forEach(size => {
  console.log(`\n--- Testing with ${size} elements ---`);
  const testData = generateTestData(size, 0.6);
  
  const listResult = runBenchmark('List-based (includes)', removeDuplicatesList, testData);
  const setResult = runBenchmark('Set-based', removeDuplicatesSet, testData);
  
  console.log(`${listResult.name}:`);
  console.log(`  Average: ${listResult.avgTime} ms`);
  console.log(`  Min: ${listResult.minTime} ms`);
  console.log(`  Max: ${listResult.maxTime} ms`);
  
  console.log(`${setResult.name}:`);
  console.log(`  Average: ${setResult.avgTime} ms`);
  console.log(`  Min: ${setResult.minTime} ms`);
  console.log(`  Max: ${setResult.maxTime} ms`);
  
  const speedup = (parseFloat(listResult.avgTime) / parseFloat(setResult.avgTime)).toFixed(2);
  console.log(`\n  Set-based is ${speedup}x faster on average`);
});

