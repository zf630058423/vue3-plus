/**
 *
 * settimeout系统补偿时间
 * 方法一
 *
 */
function _timerSetInterval(fn, delay, ...args) {
  let current = Date.now();
  let timer = null;

  const task = () => {
    current += delay;
    timer = setTimeout(() => {
      fn.apply(this, args);
      task();
    }, current - Date.now());
  };

  task();
  return () => clearTimeout(timer);
}
_timerSetInterval(() => {
  console.log("setTimeout系统补偿时间", 1000);
});

/**
 * 方法二
 * @param {*} fn 回调函数
 * @param {*} time 时间
 */
function mySettimeout(fn, time) {
  let start = new Date().getTime();
  let count = 1;
  fn();
  function instance() {
    let gap = time * count;
    let fact = new Date().getTime() - start;
    let diff = fact - gap;
    count++;
    fn();
    setTimeout(() => {
      instance();
    }, time - diff);
  }
  setTimeout(() => {
    instance();
  }, time);
}
mySettimeout(() => console.log(new Date()), 10000);
