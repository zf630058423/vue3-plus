/**
 *
 * 使用 setTimeout 实现 setInterval
 * 方法一
 *
 */
function _setInterval(fn, delay = 4, ...args) {
  let cancel = false;
  const task = () => {
    setTimeout(() => {
      if (!cancel) {
        fn.apply(this, args);
        task();
      }
    }, delay);
  };
  task();
  return () => {
    cancel = true;
  };
}
_setInterval(() => {
  console.log("测试");
}, 1000);

/**
 * 方法二
 */
// eslint-disable-next-line no-unused-vars
let timer = null;
function myInterval(cb, delay) {
  let interval = () => {
    cb();
    timer = setTimeout(interval, delay); // 递归执行
  };
  timer = setTimeout(interval, delay); //触发执行
}
myInterval(() => {
  console.log("I am Jack");
}, 1000);

/**
 * 方法三
 */
function mySetInterval(func, delay, ...args) {
  let timer = null;
  function fun() {
    return setTimeout(() => {
      func(...args);
      timer = fun();
    }, delay);
  }
  timer = fun();
  return () => {
    clearTimeout(timer);
  };
}

let clear = mySetInterval(() => {
  console.log(11);
}, 1000);

setTimeout(() => {
  clear();
}, 2100);

/**
 * 方法四
 */
let timeWorker = {};
let _mSetInterval = function (fn, time, ...args) {
  // 定义一个key，来标识此定时器
  let key = Symbol();
  // 定义一个递归函数，持续调用定时器
  let execute = function (fn, time) {
    timeWorker[key] = setTimeout(function () {
      fn(...args);
      execute(fn, time);
    }, time);
  };
  execute(fn, time);
  // 返回key
  return key;
};
let _clearInterval = function (key) {
  if (key in timeWorker) {
    clearTimeout(timeWorker[key]);
    delete timeWorker[key];
  }
};
// test
!(() => {
  let timer = _mSetInterval(() => console.log(1), 1000);
  setTimeout(() => {
    _clearInterval(timer);
  }, 10000);
})();

/**
 * 方法五
 */
function mySetInterval5(fn, delay, ...args) {
  let timer = null;
  const task = () => {
    timer = setTimeout(() => {
      if (timer) {
        fn.apply(this, args);
        task();
      }
    }, delay);
  };
  task();
  return () => {
    clearTimeout(timer);
    timer = null;
  };
}

const cancel = mySetInterval5(console.log, 1000, "mySetInterval");

setTimeout(() => {
  cancel();
}, 4500);
