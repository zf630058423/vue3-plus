/**
 * 
 * instanceof
 * 方法一
 * 
 */
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left), // 获取对象的原型
      prototype = right.prototype; // 获取构造函数的 prototype 对象

  // 判断构造函数的 prototype 对象是否在对象的原型链上
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
function Person() { }
var p = new Person();
console.log(myInstanceof(p, Object));
// console.log(p instanceof Person);//true




/**
 * 
 * instanceof
 * 方法二
 */
function myinstanceof(left, right) {
  let lpro = left.__proto__; //Object.getPrototypeOf(left)
  let rpro = right.prototype;
  while (lpro) {
    if (lpro === rpro) return true;
    lpro = lpro.__proto__;
  }
  return false;
}

console.log(myinstanceof(Function, Function)); //true



/**
 * 都遗漏了左侧必须是个 object 类型 1 instanceof Number === false
 * instanceof
 * 方法三
 */
function myInstanceof3(left, right) {
  if (typeof left !== 'object') return false
  let up = Object.getPrototypeOf(left)
  while (up) {
    if (up === right.prototype) {
      return true
    }
    up = Object.getPrototypeOf(up)
  }
  return false
}

function Person3() { }
var p3 = new Person3();
console.log(myInstanceof3(p3, Object), p3 instanceof Object);
console.log(myInstanceof3(1, Number), 1 instanceof Number);