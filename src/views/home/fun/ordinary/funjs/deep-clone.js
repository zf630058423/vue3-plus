/**
 * 深拷贝：只是针对Object 和 Array这样的引用数据类型的。
 * 深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象，是“值”而不是“引用”（不是分支）
 */

/**
 * 
 * 浅拷贝的实现方式：
 * 当对象object 只有一层的时候，是深拷贝
 * 实现方式：
 * Object.assign({}, obj)
 * Array.prototype.concat() 或者 slice 都是浅复制
 * 深拷贝的实现方式：
 * 1. json.stringfiy 和 parse
      let a = {
          name: 'ss',
      }
      let b = JSON.parse(JSON.stringify(a));
  缺点：
  如果obj里面有时间对象，转换过后，时间将只是字符串的形式
  如果obj有RegExp, Error 对象，则序列化的结果将只得到空对象
  如果obj里面有函数,undefined,序列化后的结果会把函数或undefined丢失
  如果obj里有NaN，Infinity 和 -Infinity，则序列化的结果会变成null
  JSON.stringify() 只能序列化对象的可枚举的自由属性，例如 如果obj中的对象是由构造函数生成的，则使用JSON.parse(JSON.stringify),则会丢弃对象的constructor
  如果对象中存在循环引用的情况也无法正确实现深拷贝

   2. 手写递归深拷贝
   const deepcolne = (target, map = new WeekMap()) =>{
    // 基本类型直接返回
    if(typeof target !== 'object' || target === null) return target;
    // 函数 正则 日期 ES6新对象， 执行构造
    const constructor = target.constructor;
    if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name)) return new constructor(target);
    // map 标记每一个出现过的属性，避免循环引用
    if(map.get(target)) return map.get(target);
    map.set(target, true);
    const cloneTarget = Array.isArray(target) ? [] : {};
    for(const prop in target){
        cloneTarget[prop] = deepclone(target[prop], map);
    }
    return cloneTarget;
  }

  3. loadash函数库
    let _ = require('loadash');
    _.cloneDeep();
 * 
 */


/**
 * 手写递归 方法一
 * 
 */
function deepClone(origin) {
  const map = new WeakMap(); // 解决循环引用

  const clone = (obj) => {
    if (typeof obj !== 'object') {
      return obj;
    }

    if (map.has(obj)) {
      return map.get(obj);
    }

    let newObj = Array.isArray(obj) ? [] : {};

    map.set(obj, newObj);

    Object.keys(obj).forEach(key => {
        newObj[key] = clone(obj[key]);
    })

    return newObj;
  }
  return clone(origin);
}
let obj = {
  id: 1,
  name: 'zs',
  data: {
    id: 1,
    name:'ceshi'
  }
}
console.log(deepClone(obj));


/**
 * 
 * 手写递归 方法二
 */
// 判断数据类型
const isType = (val) => {
  return (type) => Object.prototype.toString.call(val) === `[object ${type}]`
}
function deepMerge(target) {
  const ret = Array.isArray(target) ? [] : {};
  for (let key in target) {
    // eslint-disable-next-line no-prototype-builtins
    if (target.hasOwnProperty(key)) {
      if (isType(target[key])('Object')) {
       // 判断对象的值是不是对象，如果是对象则进一步递归
        ret[key] = deepMerge(target[key])
      } else if (isType(target[key])('Array')) {
       // 如果是数组则进一步进行遍历数组，用一个新数组[]去添加值
        ret[key] = [].concat([...deepMerge(target[key])]);
      } else {
        ret[key] = target[key]; // 如果是基础数据类型，则直接赋值
      }
    }
  }
  return ret;
}
console.log(deepMerge(obj));



/**
 * 
 * 手写递归 方法三
 */
function deepClone3(obj) {
  let clone = Array.isArray(obj) ? [] : {}
  for (let key of Object.keys(obj)) {
    if (typeof obj[key] === 'object') {
      clone[key] = deepClone(obj[key])
    } else {
      clone[key] = obj[key]
    }
  }
  return clone
}

let clone = deepClone3(obj)
clone.a = 1000000000
console.log(clone);




/**
 * 手写递归 方法四
 * 深拷贝会拷贝不可枚举属性，浅拷贝不会
 * @param {*} target 
 * @param {*} map 避免循环引用
 */
function _deepClone(target, map = new Map()) {
  if(typeof target !== "object" || target === null)  return target;
  if(map.get(target)) return map.get(target); // 避免循环引用
  // 除了{}和[]，new target.constructor(target)都可以重新开辟内存
  if(/^(Function|RegExp|Date|Set|Map)$/.test(target.constructor.name)) {
    const res = new target.constructor(target);
    map.set(target, res);
    return res;
  }
  const cloneTarget = Array.isArray(target) ? [] : {}
  Object.getOwnPropertySymbols(target).forEach(item => {
    cloneTarget[item] = _deepClone(target[item], map);
    map.set(target, cloneTarget[item]);
  })
  Object.getOwnPropertyNames(target).forEach(item => {
    // eslint-disable-next-line no-prototype-builtins
    if(!target.propertyIsEnumerable(item)) {
      Object.defineProperty(target, item, Object.getOwnPropertyDescriptor(target,item));
    } else {
      cloneTarget[item] = _deepClone(target[item], map);
      map.set(target, cloneTarget[item]);
    }
  })
  // Object.propertyIsEnumerable() 判断是否是不可枚举的属性值
  return cloneTarget;
}

const arr = [1,2,3]
const data = {
  o: arr,
  // a: function() {},
  b: {
    a: arr
  }
}
Object.defineProperty(data, 'c', { enumerable: false, value: 2 }) // 默认设置为不可读不可写

const res = _deepClone(data)
console.log(res)
console.log(arr == res.b.a)




/**
 * 手写递归 方法五
 */
function deepCopy5(obj) {
  // 确定需要复制的对象类型
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  // 根据类型进行处理
  const nObj = {};
  const nArr = [];
  switch (type) {
    case "Object":
      for (let key in obj) {
        nObj[key] = deepCopy5(obj[key]);
      }
      return nObj;
    case "Array":
      for (let i = 0; i < obj.length; i++) {
        nArr.push(deepCopy5(obj[i]));
      }
      return nArr;
    case "Date":
      return new Date(obj.getTime());
    case "RegExp":
      return new RegExp(obj);

    default:
      return obj;
  }
}
console.log(deepCopy5(obj));