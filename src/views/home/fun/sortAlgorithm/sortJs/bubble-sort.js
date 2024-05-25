/**
 * 
 * 冒泡排序
 * 方法一
 */
const arr = [7, 1, 3, 4, 5, 2, 6];
function bubbleSort(array) {
    // 1.获取数组的长度
    let length = array.length;
    // 2.反向循环, 因此次数越来越少
    for (let i = length - 1; i >= 0; i--) {
      // 3.根据i的次数, 比较循环到i位置
      for (let j = 0; j < i; j++) {
        // 4.如果j位置比j+1位置的数据大, 那么就交换
        if (array[j] > array[j + 1]) {
          [array[j + 1], array[j]] = [array[j], array[j + 1]];
        }
      }
    }
    return arr;
  }
console.log(bubbleSort(arr));
  


/**
 * 
 * 方法二
 */
function bubbleSort2(arr2) {
  const len = arr2.length;

  // 外层代表轮数，内层循环代表每轮要比较的次数
  for (let i = 0; i < len - 1; i++) {
    // flag作为一个标志位。可以优化冒泡排序，让算法的最好情况时间复杂度达到O(n)
    let flag = false;
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr2[j] > arr2[j + 1]) {
        [arr2[j], arr2[j + 1]] = [arr2[j + 1], arr2[j]];
        flag = true;
      }
    }

    // 若一次交换也没发生，则说明数组有序，直接放过。
    if (!flag) return arr2;
  }

  return arr2;
}

// test
const arr2 = [5, 3, 2, 4, 1];
console.log(bubbleSort2(arr2));


/**
 * 
 * 方法三
 */
Array.prototype.bubbleSort = function () {
  for (let i = 0; i < this.length - 1; i++) {
    for (let j = 0; j < this.length - 1 - i; j++) {
      if (this[j] > this[j + 1]) {
        const temp = this[j + 1];
        this[j + 1] = this[j];
        this[j] = temp;
      }
    }
  }
}
// O(n^2), 冒泡排序
const arr3 = [6,5,4,3,2,1];
arr3.bubbleSort();



/**
 * 方法四
 * 需额外空间，非原地排序 快速排序 
 * @param arr 待排序数组
 * @returns
 */
// const quickSort = function (arr: number[]): number[] {
//   if (arr.length <= 1) {
//     return arr;
//   }

//   const pivotIndex = Math.floor(arr.length / 2);
//   // 从数组中取出我们的"基准"元素
//   const pivot = arr.splice(pivotIndex, 1)[0];
//   const leftArr: number[] = [];
//   const rightArr: number[] = [];

//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] <= pivot) {
//       leftArr.push(arr[i]);
//     } else {
//       rightArr.push(arr[i]);
//     }
//   }

//   // 至此，我们将数组分成了left和right两个部分，中间的一个元素pivot之前被删了，现在要加回来
//   return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
// };

// // test
// const arr4 = [98, 42, 25, 54, 15, 3, 25, 72, 41, 10, 121];
// console.log(quickSort(arr4));