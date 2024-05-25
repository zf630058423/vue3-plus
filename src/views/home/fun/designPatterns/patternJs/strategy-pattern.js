/**
 * 策略模式
 * 方法一： JS对象写法
 */
let strategies = {
  add: function (num) {
    return num + num;
  },
  multiply: function (num) {
    return num * num;
  },
};
let calculateBonus = function (strategy, num) {
  return strategies[strategy](num);
};
console.log(calculateBonus("add", 3));
console.log(calculateBonus("multiply", 3));

/**
 *
 * 方法二： 传统写法
 *
 */
class Strategies {}
class Add extends Strategies {
  start(num) {
    return num + num;
  }
}
class Multiply extends Strategies {
  start(num) {
    return num * num;
  }
}
class Context {
  constructor(strategy) {
    this.strategy = strategy;
  }
  start(num) {
    return this.strategy.start(num);
  }
}
let context = new Context(new Add());
console.log(context.start(3));
context = new Context(new Multiply());
console.log(context.start(3));
