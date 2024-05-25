/**
 * 打印出 1~10000 以内的对称数 方法一
 */
function isSymmetryNum(start, end) {
  for (let i = start; i < end + 1; i++) {
    let str = String(i);
    if (str.length <= 1) continue;
    if (str.split("").reverse().join("") === str) {
      console.log(i);
    }
  }
}
isSymmetryNum(1, 10000)


/**
 * 打印出 1~10000 以内的对称数 方法二
 */
function getDuicheng() {
  const res = [];
  for (let i = 1; i < 10; i++) {
    res.push(i);
    res.push(i * 11);
    for (let j = 0; j < 10; j++) {
      res.push(i * 101 + j * 10); //101-999
      res.push(i * 1001 + j * 110); //1001-9999
    }
  }
  return res;
}
console.log(getDuicheng());


/**
 * 打印出 1~10000 以内的对称数 方法三： 简单的双指针
 */
const res = [];
function getSymNum() {
  for (let i = 1; i <= 10000; i++) {
    let str1 = i + "";
    if (judgeSym(str1)) res.push(i);
  }
}
function judgeSym(str) {
  let l = 0,
    r = str.length - 1;
  while (l < r) {
    if (str[l] !== str[r]) return false;
    r--;
    l++;
  }
  return true;
}
getSymNum();
console.log(res);