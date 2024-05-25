/**
 * 选择排序
 */
Array.prototype.selectionSort = function () {
  for (let i = 0; i < this.length - 1; i++) {
    let indexMin = i;
    for (let j = i; j < this.length; j++) {
      if (this[j] < this[indexMin]) {
        indexMin = j;
      }
    }
    // 如果最小值的位置就是i就不用交换
    if (indexMin !== i) {
      const temp = this[i];
      this[i] = this[indexMin];
      this[indexMin] = temp;
    }
  }
}
// 时间复杂度O(n^2)
const arr = [6,5,4,3,2,1];
arr.selectionSort();