/**
 * 字符串中字母的出现次数 方法一
 */
const str = "ABCabc123"
let res = 0
for (const c of str)
  if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'))
    res++
console.log(res)  // 6


/**
 * 字符串中字母的出现次数 方法二
 */
const reg2 = /[^a-zA-Z]/g;
const str2 = "ABCabc123";
console.log(str2.replaceAll(reg2, '').length)


/**
 * 字符串中字母的出现次数 方法三
 */
const str3 = "ABCabc123";
let res3 = str3.split("").reduce((pre, cur) => {
  if (!pre[cur]) pre[cur] = 1;
  else pre[cur]++;
  return pre;
}, {});
console.log(res3);



/**
 * 字符串中字母的出现次数 方法四
 */
function countCharacters(str) {
  let charCount = {};
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char.match(/[a-zA-Z]/i)) { // 只考虑字母
      if (charCount[char]) {
        charCount[char]++;
      } else {
        charCount[char] = 1;
      }
    }
  }
  return charCount;
}
console.log(countCharacters("abcsfb232"));