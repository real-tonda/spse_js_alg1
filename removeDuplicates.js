export function removeDuplicatesList(arr) {
  const result = [];
  for (const item of arr) {
    if (!result.includes(item)) {
      result.push(item);
    }
  }
  return result;
}

export function removeDuplicatesSet(arr) {
  return Array.from(new Set(arr));
}

