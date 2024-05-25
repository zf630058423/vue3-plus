/**
 * 产生一个不重复的随机数组 方法一
 * @param {*} len 数组长度
 * @param {*} min 最小范围
 * @param {*} max 最大范围
 * @returns 
 */
export const randomUniqueArr = (len = 100, min = 0, max = 200) => {
  if (max - min < len) {
    // 可生成数的范围小于数组长度
    return null;
  }
  const hash = [];
  while (hash.length < len) {
    const num = Math.floor(Math.random() * max);
    if (num < min) continue;
    if (hash.indexOf(num) === -1) { //或者用 !hash.includes(num)
      hash.push(num);
    }
  }
  return hash;
}
// console.log(randomUniqueArr());
// console.log(randomUniqueArr(20, 10, 31));


/**
 * 产生一个不重复的随机数组 方法二
 * @param {*} len 数组长度
 * @param {*} min 最小范围
 * @param {*} max 最大范围
 * @returns 
 */
export const randomUniqueArr2 = (len, min, max) => {
  // min、max 是可以获取到的
  if (max - min < len - 2) {
    return []
  }
  const set = new Set()
  while (set.size < len) {
    // 取值用 Math.round 保证可以取到最大值和最小值
    const num = Math.round(Math.random() * (max - min)) + min;
    set.add(num)
  }
  return [...set]
}
const res = randomUniqueArr2(2, 2, 3)
console.log("res===:", res);


/**
 * 产生一个不重复的随机数组 方法三
 * @param {*} len 数组长度
 * @param {*} min 最小范围
 * @param {*} max 最大范围
 * @returns 
 */
export const random = (len = 10, min = 0, max = 200) => {
  if (max < min) {
    throw new Error("max must greater hhan or equalTo min!");
  }
  if (max - min + 1 < len) {
    throw new Error(
      "len must greater hhan or equalTo the sum of min and max !"
    );
  }

  const numbers = new Set();
  while (len !== numbers.size) {
    const num = Math.floor(Math.random() * (max - min) + min);
    numbers.add(num);
  }
  return [...numbers];
}


/**
 * 经典算法 只传长度
 * 产生一个不重复的随机数组 方法四
 * @param {*} len 数组长度
 * @param {*} min 最小范围
 * @param {*} max 最大范围
 * @returns 
 */
function generateRandomArray(length) {
  let arr = [];
  for (let i = 1; i <= length; i++) {
    arr.push(i);
  }
  // Fisher-Yates算法
  for (let i = arr.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
}

const arr = generateRandomArray(10);
console.log(arr);