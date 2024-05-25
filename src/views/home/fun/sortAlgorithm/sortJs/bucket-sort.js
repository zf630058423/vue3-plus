/**
 * 
 * 桶排序
 * 
 */
const bucketSort = (arr) => {
  const max = Math.max(...arr)
  const min = Math.min(...arr)
  const len = arr.length
  const bucketNum = Math.floor((max - min) / len) + 1
  const buckets = new Array(bucketNum).fill(0).map(() => [])
  // 收集到桶中
  for (const num of arr) {
    buckets[Math.floor((num - min) / len)].push(num)
  }
  // 各个桶中各自排序
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b) // 一般用插入排序或快速排序
  }
  // 整合回原数组
  let k = 0
  for (let i = 0; i < buckets.length; i++) {
    for (let j = 0; j < buckets[i].length; j++) {
      arr[k++] = buckets[i][j]
    }
  }
  return arr
}
console.log(bucketSort[1,54,3,65,23,43,12]);