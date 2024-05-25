/**
 * 实现有并行限制的 Promise 调度器
 * 方法一
 */
// Scheduler调度器：
class Scheduler {
  constructor(max) {
    // 最大可并发任务数
    this.max = max;
    // 当前并发任务数
    this.count = 0;
    // 阻塞的任务队列
    this.queue = [];
  }

  async add(fn) {
    if (this.count >= this.max) {
      // 若当前正在执行的任务，达到最大容量max
      // 阻塞在此处，等待前面的任务执行完毕后将resolve弹出并执行
      await new Promise((resolve) => this.queue.push(resolve));
    }
    // 当前并发任务数++
    this.count++;
    // 使用await执行此函数
    const res = await fn();
    // 执行完毕，当前并发任务数--
    this.count--;
    // 若队列中有值，将其resolve弹出，并执行
    // 以便阻塞的任务，可以正常执行
    this.queue.length && this.queue.shift()();
    // 返回函数执行的结果
    return res;
  }
}

//使用：
// 延迟函数
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

// 同时进行的任务最多2个
const scheduler = new Scheduler(2);

// 添加异步任务
// time: 任务执行的时间
// val: 参数
const addTask = (time, val) => {
  scheduler.add(() => {
    return sleep(time).then(() => console.log(val));
  });
};

addTask(1000, "1"); //2
addTask(500, "2"); //3
addTask(300, "3"); //1
addTask(400, "4"); //4

/**
 * 方法二
 */
class Schedular {
  constructor(limit) {
    this.limit = limit;
    this.queue = [];
    this.runCounts = 0;
  }
  add(time, order) {
    const mypromise = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order); //执行order
          resolve();
          console.log(reject);
        }, time);
      });
    };
    this.queue.push(mypromise);
  }
  taskStart() {
    for (let i = 0; i < this.limit; i++) {
      this.request();
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCounts >= this.limit)
      return;
    this.runCounts++;
    this.queue
      .shift()()
      .then((res) => {
        console.log(res);
        this.runCounts--;
        this.request();
      });
  }
}
const scheduler2 = new Schedular(2);
const addTask2 = (time, order) => {
  scheduler2.add(time, order);
};
addTask2(1000, "1");
addTask2(500, "2");
addTask2(300, "3");
addTask2(400, "4");
scheduler2.taskStart();

/**
 * 方法三
 * 题意：并发控制Promise，要求：实现Scheduler
 */
// 延迟函数
const sleep3 = (time) => new Promise((resolve) => setTimeout(resolve, time));

// 同时进行的任务最多2个
const scheduler3 = new Scheduler(2);

// 添加异步任务
// time: 任务执行的时间
// val: 参数
const addTask3 = (time, val) => {
  scheduler3.add(() => {
    return sleep3(time).then(() => console.log(val));
  });
};

addTask3(1000, "1"); // 2
addTask3(500, "2"); // 3
addTask3(300, "3"); // 1
addTask3(400, "4"); // 4
