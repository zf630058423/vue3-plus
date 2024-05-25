
/**
 * 实现一个字符串匹配算法indexOf 方法一
 * @param {*} str1 第一个字符串
 * @param {*} str2 第二个字符串
 * @returns 
 */
function myIndexOf(str1, str2) {
  if (str2.length <= 0) return -1
  const shortStr = str1.length >= str2.length ? str2 : str1
  const longStr = shortStr === str1 ? str2 : str1
  let firstChar = shortStr[0]
  let left = 0
  for (var i = 0; i < longStr.length; i++) {
    left = longStr[i] === firstChar ? i : left
    // console.log(typeof longStr)
    if (longStr.substr(left, shortStr.length) === shortStr) return left
  }
  return -1
}

console.log(myIndexOf('zhpp', 'pp')); // 2


/**
 * 实现一个字符串匹配算法indexOf 方法二
 * @returns 
 */
// 实现字符串匹配indexOf方法
// string.indexOf(searchvalue,start)
//        searchvalue:必需。规定需检索的字符串值。
//        start:可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 string Object.length - 1。
//              如省略该参数，则将从字符串的首字符开始检索。
String.prototype.indexOf = function myIndexOf(searchvalue, start = 0) {
  console.log("myIndexOf");
  if (typeof searchvalue !== "string") throw TypeError("需检索值非字符串");
  if (start < 0 || start > this.length)
    throw TypeError(
      "开始检索的位置取值不合法，合法取值是 0 到 string.length - 1"
    );
  for (let index = start; index < this.length; index++) {
    if (this[index] === searchvalue[0]) {
      let len = searchvalue.length;
      let i = 0;
      while (i < len && this[index + i] === searchvalue[i]) {
        // console.log("this[index + i]", this[index + i], searchvalue[i]);
        i++;
      }
      // console.log(i);
      if (i === len) return index;
    }
  }
};

let str = "test tesy";
console.log(str.indexOf("t"));


/**
 * 实现一个字符串匹配算法indexOf 方法三
 * @param {*} string 第一个字符串
 * @param {*} substring 第二个字符串
 * @returns 
 */
function indexOf3(string, substring) {
  if (substring === "") {
    return -1;
  }

  for (var i = 0, len = string.length; i < len; i += 1) {
    if (string.slice(i, i + substring.length) === substring) {
      return i;
    }
  }

  return -1;
}
console.log(indexOf3("fasfa", 'sfa'));