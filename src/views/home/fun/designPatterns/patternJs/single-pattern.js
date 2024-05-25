/**
 *
 * 单例模式
 * ES6 class实现
 *
 */
class Singleton {
  constructor(name, age) {
    if (!Singleton.instance) {
      this.name = name;
      this.age = age;
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
}
console.log(new Singleton("Taobao", 18) === new Singleton("Baidu", 15)); // true

/**
 *
 * 单例模式
 * ES5 实现
 *
 */
const danli = function (name) {
  this.name = name;
  this.instance = null;
};
danli.prototype.getName = function () {
  console.log(this.name);
};
danli.getInstance = function (ret) {
  if (!this.instance) {
    this.instance = new danli(ret);
    //假如为null，创建一个构造函数，此时instance标记不为空，不用进行二次创建
  }
  return this.instance;
};
let a = danli.getInstance("a");
let b = danli.getInstance("b");
a.getName();
b.getName();
console.log(a === b); //他俩相同，因为没有二次创建
