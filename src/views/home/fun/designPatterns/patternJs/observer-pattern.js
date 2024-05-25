/**
 *
 * 观察者模式
 * 方法一
 *
 */
class Observerd {
  constructor() {
    // 我要看看到底有多少人在观察俺
    this.observerList = [];
  }
  addObserver(observer) {
    // 添加一个观察俺的人
    this.observerList.push(observer);
  }
  notify() {
    // 我要闹点动静，所有观察者都会知道这个信息，具体怎么做就是他们自己的事情了
    this.observerList.forEach((observer) => observer.update());
  }
}

class Observer {
  constructor(doSome) {
    // 观察到小白鼠有动静之后，观察者做的事情
    this.doSome = doSome;
  }
  update() {
    console.log(this.doSome);
  }
}

const ob1 = new Observer(
  "我是ob1，我观察到小白鼠有反应了，太饿了，我得去吃个饭了"
);
const ob2 = new Observer("我是ob2，我观察到小白鼠有反应了，我要继续工作！");
const xiaoBaiShu = new Observerd();
xiaoBaiShu.addObserver(ob1);
xiaoBaiShu.addObserver(ob2);
xiaoBaiShu.notify(); // .... ....

/**
 *
 * 方法二
 *
 */
class Subject {
  constructor() {
    this.observers = [];
  }

  // 添加观察者
  addObserver(observer) {
    this.observers.push(observer);
  }

  // 移除观察者
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  // 通知观察者
  notify(data) {
    this.observers.forEach((observer) => {
      observer.update(data);
    });
  }
}

class ObserverObj {
  update(data) {
    console.log(`Received data: ${data}`);
  }
}

// 测试代码
const subject = new Subject();
const observer1 = new ObserverObj();
const observer2 = new ObserverObj();

subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notify("Hello world!"); // Output: Received data: Hello world!

subject.removeObserver(observer1);

subject.notify("Goodbye world!"); // Output: Received data: Goodbye world!
