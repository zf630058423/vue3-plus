
/**
 * 使用递归完成1到100的累加  方法一：递归
 * @param {*} num 参数 默认100
 * @returns 
 */
export function sum(num = 100) {
  if (num === 1) return 1
  return num + sum(num - 1);
}
console.log(sum(100));


/**
 * 使用递归完成1到100的累加  方法二：尾递归优化，一行代码解决
 * @param {*} num 参数 默认100
 * @returns 
 */
export function process(cur, total = 0) {
  return cur === 0 ? total : process(cur - 1, total + cur);
}


/**
 * 使用递归完成1到100的累加  方法三：三元法
 * @param {*} num 参数 默认100
 * @returns 
 */
export function accumulate(curr, max, total = 0) {
  return curr > max ? total : accumulate(curr + 1, max, total + curr);
}
console.log(accumulate(1, 100)); // 5050

/**
 * 使用递归完成1到100的累加  方法三： 直接就是一个循环
 * @param {*} num 参数 默认100
 * @returns 
 */
const sumFun = (min, max) => {
  let total = 0

  while (min <= max) {
    total += min
    min += 1
  }
  return total
}
console.log(sumFun(1, 100)); //