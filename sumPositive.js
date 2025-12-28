export function sumPositive(arr) {
  if (!Array.isArray(arr)) {
    return 0;
  }
  
  return arr.reduce((sum, num) => {
    const value = Number(num);
    if (isNaN(value)) {
      return sum;
    }
    return value > 0 ? sum + value : sum;
  }, 0);
}

