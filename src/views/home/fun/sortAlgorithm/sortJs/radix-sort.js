/**
 * 
 * 基数排序
 * 
 */
const radixSort = (arr, maxDigit) => {
  let mod = 10, mul = 1
  const buckets = new Array(maxDigit).fill(0).map(() => [])
  for (let i = 0; i < maxDigit; i++, mod *= 10, mul *= 10) {
    for (const num of arr) {
      const bucketIdx = Math.floor((num % mod) / mul)
      if (!buckets[bucketIdx]) buckets[bucketIdx] = []
      buckets[bucketIdx].push(num)
    }
    // 收集回原数组
    let idx = 0
    for (let j = 0; j < buckets.length; j++) {
      if (buckets[j]) {
        for (let k = 0; k < buckets[j].length; k++) {
          arr[idx++] = buckets[j][k]
        }
      }
      buckets[j] = []
    }
  }
  return arr
}
console.log(radixSort([2,8,6,98,34,53,32]),3);