/**
 * 数组中的最大值方法一
 */
let arr = [5, 2, 7, 9]
// let res = Math.max(...arr)
// let res = arr.sort()[arr.length-1]
let res = arr[0]
for (let i = 0; i < arr.length; i++) {
  if (arr[i] > res) {
    res = arr[i]
  }
}
console.log(res);
/**
 * arr.sort()[arr.length - 1] 这种方法不能得到答案，sort函数需要指定排序函数才行。因为默认的排序函数是会将数组中的数据转化成字符串进行比较的，而字符串大小比较是根据字典序的（如：会出现 "11" < "2" 的情况） 正确写法应该是： arr.sort(function(a, b) { return a -b })[arr.length-1]
 */


/**
 * 方法二
 */
function getMaxInArr(arr) {
  return arr.reduce((acc, cur) => acc > cur ? acc : cur)
}
console.log(getMaxInArr("232abdfa"));

/**
 * 方法三
 */
const arr3 = [5, 2, 7, 9]

// 1. 排序取值
const max1 = arr3.sort()[arr3.length - 1]
console.log("max1===:", max1);

// 2. 使用 Math.max
const max2 = Math.max(...arr3)
console.log("max2===:", max2);

// 3. 循环取值
const max3 = arr3.reduce((t, e) => (t > e ? t : e), 0)
console.log("max3===:", max3);