/**
 * 
 * 快速排序
 * 方法一
 */
Array.prototype.quickSort = function () {
  const rec = (arr) => {
    if (arr.length < 2) { return arr; }
    const left = [];
    const right = [];
    const mid = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < mid) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return [...rec(left), mid, ...rec(right)];
  };

  const res = rec(this);
  // 把arr里面的值改为res
  res.forEach((n, i) => {
    this[i] = n;
  })
}
// 递归时间复杂度O(logN),分区时间复杂度O(n),总体时间复杂度为O(nlogN);
const arr = [6,5,4,3,2,1];
arr.quickSort();



/**
 * 
 * 方法二
 * 
 */
function quick_sort(q, l, r) {
  if (l >= r) return;
  let i = l - 1,
    j = r + 1,
    x = q[(i + j) >> 1];
  while (i < j) {
    do i++;
    while (q[i] < x);
    do j--;
    while (q[j] > x);
    if (i < j) {
      [q[i], q[j]] = [q[j], q[i]];
    }
  }
  quick_sort(q, l, j), quick_sort(q, j + 1, r);
}
const num = [3, 4, 2, 1, 6, 7, 4];
quick_sort(num, 0, num.length - 1);
console.log(num);



/**
 * 
 * 方法三
 * 
 */
function quickSort(arr) {
  if (arr.length < 2) return arr;
  const left = [],
    right = [],
    cur = arr.splice(0, 1);
  for (let item of arr)
    item > cur ? right.push(item) : left.push(item);
  return quickSort(left).concat(cur, quickSort(right));
}

const arr3 = [98, 42, 25, 54, 15, 3, 25, 72, 41, 10, 121];
console.log(quickSort(arr3));
