
/**
 * 随机生成字符串 方法一
 * @param {*} len  形参len, 需要生成的随机字符串的长度
 * @returns 
 */
function randomString(len = 3) { //形参len, 需要生成的随机字符串的长度
  len = len || 32;
  const t = 'abcdefghigklmnopqrstuvwxyz123456798'; //模拟随机字符串库
  const tLen = t.length;
  let res = '';//存放最终生成的字符串
  for (let i = 0; i < len; i++) {
    res += t.charAt(Math.floor(Math.random() * tLen));
  }
  return res;
}
console.log(randomString(10));


/**
 * 随机生成字符串 方法二
 * @param {*} len  形参len, 需要生成的随机字符串的长度
 * @returns 
 */
function getRandomStr(len) {
  let res = [];
  for (let i = 0; i < len; i++) {
    // unicode选取范围32到126
    let temp = getRndInteger(32, 126);
    res.push(temp)
  }
  return String.fromCharCode(...res)
}

// 以下函数返回 min（包含）～ max（包含）之间的数字：
function getRndInteger(min, max) {
  // 由于random含0不含1，所以直接加一即可实现双闭合
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandomStr(6))


//生成[0-9a-z]
Math.random().toString(36)
// '0.cieke0c5npq' 需要多长可以自己截取