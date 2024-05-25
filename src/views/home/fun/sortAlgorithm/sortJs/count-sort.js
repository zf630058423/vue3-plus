/**
 * 
 * 计数排序
 * 计数排序的核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。
就是遍历数组记录数组下的元素出现过多次，然后把这个元素找个位置先安置下来，简单点说就是以原数组每个元素的值作为新数组的下标，
而对应小标的新数组元素的值作为出现的次数，相当于是通过下标进行排序。
 */
function countingSort(arr, maxValue) {
var bucket = new Array(maxValue + 1) //开辟新的数组空间
var sortedIndex = 0//开始下标
var arrLen = arr.length //数组的长度
var bucketLen = maxValue + 1; //开辟新的数组空间的长度

for (var i = 0; i < arrLen; i++) {
    if (!bucket[arr[i]]) {
        bucket[arr[i]] = 0;
    }
    bucket[arr[i]]++;
}

for (var j = 0; j < bucketLen; j++) {
    while (bucket[j] > 0) {
        arr[sortedIndex++] = j;
        bucket[j]--;
    }
}

return arr;
}

var arr = [2, 3, 8, 7, 1, 2, 7, 3];
// 1.第一步找出最大的数
const maxValue = Math.max(...arr)
console.log(countingSort(arr, maxValue));