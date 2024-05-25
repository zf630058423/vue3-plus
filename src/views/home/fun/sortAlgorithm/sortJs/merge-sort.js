/**
 * 
 * 归并排序  方法一
 * 
 */
Array.prototype.mergeSort = function () {
  const rec = (arr) => {
    if (arr.length === 1) { return arr; }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid, arr.length);
    const orderLeft = rec(left);
    const orderRight = rec(right);
    const res = [];
    while (orderLeft.length || orderRight.length) {
      if (orderLeft.length && orderRight.length) {
        res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift());
      } else if (orderLeft.length) {
        res.push(orderLeft.shift());
      } else if (orderRight.length) {
        res.push(orderRight.shift());
      }
    }
    return res;
  }
  const res = rec(this);
  // 把arr里面的值改为res
  res.forEach((n, i) => {
    this[i] = n;
  })
}
// 分的时间复杂度O(logN)，并的时间复杂度O(n),总体时间复杂度是O(nlogN)
const arr = [2,5,4,8,2,1];
arr.mergeSort();


/**
 * 归并排序  方法二
 * @param arr 待排序数组
 * @returns
 */
const mergeSort = function (arr) {
  const len = arr.length;

  // 当被分割的数组只有一个元素时，返回数组。
  if (len <= 1) return arr;
  const mid = Math.floor(len / 2);
  const leftArr = mergeSort(arr.slice(0, mid));
  const rightArr = mergeSort(arr.slice(mid, len));
  arr = mergeArr(leftArr, rightArr);

  return arr;
};

/**
 * 合并两个有序数组
 * @param leftArr
 * @param rightArr
 * @returns
 */
const mergeArr = function (leftArr, rightArr){
  // 初始化两个指针，分别指向 arr1 和 arr2
  let i = 0;
  let j = 0;
  const res = [];

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      res.push(leftArr[i]);
      i++;
    } else {
      res.push(rightArr[j]);
      j++;
    }
  }

  // 若其中一个子数组会首先被合并完全，则直接拼接另一个子数组的剩余部分
  if (i < leftArr.length) {
    return [...res, ...leftArr.slice(i)];
  } else {
    return [...res, ...rightArr.slice(j)];
  }
};

// test
const arr2 = [8, 7, 6, 5, 4, 3, 2, 1];
console.log(mergeSort(arr2));