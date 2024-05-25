/**
 *
 * 插入排序
 *
 */
Array.prototype.insertionSort = function () {
  for (let i = 1; i < this.length; i++) {
    const temp = this[i];
    let j = i;
    // 寻找插入的位置
    while (j > 0) {
      if (this[j - 1] > temp) {
        this[j] = this[j - 1];
      } else {
        break;
        // 此时j为应该插入的位置
      }
      j--;
    }
    this[j] = temp;
  }
};
// 时间复杂度O(n^2)
const arr = [2, 5, 4, 8, 2, 1];
arr.insertionSort();
