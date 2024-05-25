/**
 *
 * 发布订阅者模式
 * 方法一
 *
 */
class EventEmitter {
  constructor() {
    // key: 事件名
    // value: callback [] 回调数组
    this.events = {};
  }
  on(name, callback) {
    if (this.events[name]) {
      this.events[name].push(callback);
    } else {
      this.events[name] = [callback];
    }
  }
  off(name, callback) {
    if (!this.message[name]) return;
    if (!callback) {
      // 如果没有callback,就删掉整个事件
      this.message[name] = undefined;
    }
    this.message[name] = this.message[name].filter((item) => item !== callback);
  }
  emit(name, ...args) {
    if (!this.events[name]) return;
    this.events[name].forEach((cb) => cb(...args));
  }
}
let ee = new EventEmitter();
console.log(ee.on("张三", function () {}));

/**
 *
 * 方法二
 *
 */
class EventEmiter2 {
  constructor() {
    this.cache = {}; //存放不同的事件
  }
  on(name, fn) {
    //事件名,回调
    if (this.cache[name]) {
      this.cache[name].push(fn);
    } else {
      this.cache[name] = [fn]; //添加新事件
    }
  }
  off(name, fn) {
    //删除事件的某个回调
    let tasks = this.cache[name]; //拿到对应的回调队列
    if (tasks) {
      const index = tasks.findIndex((f) => f === fn);
      if (index >= 0) {
        tasks.splice(index, 1);
      }
    }
  }
  emit(name, once = false, ...args) {
    if (this.cache[name]) {
      //创建副本,如果回调函数内继续注册相同事件会造成死循环
      let tasks = this.cache[name].slice();
      for (let fn of tasks) {
        fn(...args);
      }
      if (once) {
        delete this.cache[name];
      }
    }
  }
}
//test
let eventsBus = new EventEmiter2();
let fn1 = function (name, age) {
  console.log(name, age);
};
let fn2 = function (name, age) {
  console.log("fn", name, age);
};
eventsBus.on("test", fn1);
eventsBus.on("test", fn2);
eventsBus.emit("test", false, "Jason", 18);
//Jason 18
//fn Jason 18

/**
 *
 * 方法三
 *
 */
class EventEmitter3 {
  cache = new Map();
  $on(eventName, cb) {
    this.cache.has(eventName)
      ? this.cache.get(eventName).push(cb)
      : this.cache.set(eventName, [cb]);
  }
  $off(eventName) {
    this.cache.delete(eventName);
  }
  $emit(eventName) {
    if (!this.cache.has(eventName)) {
      return;
    }
    for (const cb of this.cache.get(eventName)) {
      cb();
    }
    this.$off(eventName);
  }
}
let ee3 = new EventEmitter3();
console.log(ee3.$on("张三", function () {}));

/**
 *
 * 方法四
 *
 */
class EventEmitter4 {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  once(eventName, callback) {
    const onceCallback = (...args) => {
      callback.apply(this, args);
      this.off(eventName, onceCallback);
    };
    this.on(eventName, onceCallback);
  }

  emit(eventName, ...args) {
    const callbacks = this.events[eventName];
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback.apply(this, args);
      });
    }
  }

  off(eventName, callback) {
    const callbacks = this.events[eventName];
    if (callbacks) {
      if (!callback) {
        delete this.events[eventName];
      } else {
        const index = callbacks.indexOf(callback);
        if (index !== -1) {
          callbacks.splice(index, 1);
          if (callbacks.length === 0) {
            delete this.events[eventName];
          }
        }
      }
    }
  }
}
let ee4 = new EventEmitter4();
console.log(ee4.on("张三", function () {}));

/**
 *
 * 方法五
 *
 */
class EventEmitter5 {
  constructor() {
    this.event = {};
  }
  on(name, callback) {
    if (this.event[name]) {
      this.event[name].push(callback);
    } else {
      this.event[name] = [callback];
    }
  }
  off(name, callback) {
    if (!this.event[name]) return;
    if (!callback) this.event[name] = [];
    this.event[name] = this.event[name].filter((item) => {
      item !== callback && item.initialCallback !== callback;
    });
  }
  emit(name, ...callbacks) {
    if (!this.event[name]) return;
    this.event[name].forEach((cb) => cb(...callbacks));
  }
  once(name, callback) {
    const one = (...args) => {
      callback(...args);
      this.off(name, one);
    };
    one.initialCallback = callback;
    this.on(name, one);
  }
}
let ee5 = new EventEmitter5();
console.log(ee5.on("张三", function () {}));
