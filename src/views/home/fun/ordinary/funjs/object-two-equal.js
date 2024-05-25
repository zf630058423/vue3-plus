/**
 * 判断两个对象是否相等 方法一
 */
const obj1 = { a: "11", b: { c: "22" } };
const obj2 = { a: "11", b: { c: "22" } };
function isEqual(obj1, obj2) {
  const arr1 = Object.keys(obj1);
  const arr2 = Object.keys(obj2);
  if (arr1.length !== arr2.length) return false;
  for (const k in arr1) {
    if (typeof obj1[k] == "object" || typeof obj2[k] == "object") {
      return isEqual(obj1[k], obj2[k]);
    } else if (obj1[k] !== obj2[k]) return false;
  }
  return true;
}
console.log(isEqual(obj1, obj2));


/**
 * 判断两个对象是否相等  方法二
 */
function isEqual2(a, b) {
  // 如果 a 和 b 完全相等，返回 true
  if (a === b) return true;

  // 如果 a 和 b 的类型都是 "object" 并且不为 null
  if (typeof a == 'object' && a != null && typeof b == 'object' && b != null) {
    let keysA = Object.keys(a);
    let keysB = Object.keys(b);

    // 如果两个对象的属性数量不同，则返回 false
    if (keysA.length != keysB.length) return false;

    for (let key of keysA) {
      // 如果两个对象中有任何一个对象没有此属性，则返回 false 
      if (!keysB.includes(key)) return false;

      // 如果对于所有相同名字的键，a[key] 和 b[key] 都是深度相等，则继续比较下一个键。
      if (!isEqual2(a[key], b[key])) return false;
    }

    return true;
  }
  // 否则，它们可能是原始类型或者函数、日期、正则表达式等其他复杂类型，
  // 这里我们假设这些情况下直接使用 === 就足够了。
  else {
    return a === b;
  }
}

let obj11 = { foo: "bar", baz: [1, 2, 3] };
let obj22 = { foo: "bar", baz: [1, 2, 3] };
console.log(isEqual2(obj11, obj22)); // 输出：true

let obj3 = { foo: "baz", qux: [4, 5, 6] };
console.log(isEqual2(obj1, obj3)); // 输出：false




/**
 * 简单点，如果不考虑健值对顺序不同的前提下，直接判断字符串是否相等就行了，相同的对象格式化后字符串相同（不适用里面含有function的情况～）
 * @param {*} objTest1 
 * @param {*} objTest2 
 * @returns 
 */
function isEqualTest(objTest1, objTest2) {
  return JSON.stringify(objTest1) === JSON.stringify(objTest2);
}
console.log(isEqualTest({}, {})); // 输出：false