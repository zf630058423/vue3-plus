/**
 * 对象的合并
 */
let obj1 = {
  a: 1,
  b: {
    c: 2,
    d: 3
  },
  e: 4,
  h: {
    i: 5
  }
}

let obj2 = {
  a: 111,
  b: {
    c: 222,
    f: 333
  },
  g: 444,
  h: 666
}
// 实现一个mergeObject(obj1, obj2)方法，得到下面的对象，并转化成JSON输出到#app
let obj = {
  a: 111,
  b: {
    c: 222,
    d: 3,
    f: 333
  },
  e: 4,
  g: 444,
  h: 666
}
console.log(obj);


/**
 * 实现方法一
 */
//
console.log(JSON.stringify(Object.assign(obj1, obj2)))
//不用Object.assign
function myAssign(obj, ...src) {
  for (let i = 0; i < src.length; i++) {
    if (src[i] !== null || src[i] !== undefined) {
      for (let index in src[i]) {
        console.log(index)
        //这里不用注释
        // if (src[i].hasOwnProperty(index)) {
        //   obj[index] = src[i][index];
        // }
      }
    }
  }
  return obj;
}
console.log(JSON.stringify(myAssign(obj1, obj2)))




/**
 * 实现方法二
 */
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function mergeObject(obj1, obj2) {
  let result = { ...obj1 };
  for (let key in obj2) {
    if (isObject(obj2[key]) && isObject(result[key])) {
      result[key] = mergeObject(result[key], obj2[key]);
    } else {
      result[key] = obj2[key];
    }
  }
  return result;
}

let obj11 = {
  a: 1,
  b: { c: 2, d: 3 },
  e: 4,
  h: { i: 5 }
};

let obj22 = {
  a: 111,
  b: { c: 222, f: 333 },
  g: 444,
  h: 666
};

let mergedObj = mergeObject(obj11, obj22);
console.log("mergedObj===:", mergedObj)

// 将结果转化为JSON并输出到#app元素中
// document.querySelector('#app').textContent = JSON.stringify(mergedObj, null, 4);