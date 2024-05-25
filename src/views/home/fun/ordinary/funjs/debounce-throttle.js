/**
 * 
 * 防抖 节流 
 * 防抖：在一段时间内多次触发同一个事件，只执行最后一次触发的事件，而忽略之前的所有事件。
 * 节流：在一段时间内多次触发同一个事件，每隔一定时间间隔执行一次事件。
 * 方法一
 */
export function debounce(callback, time) {
    let timer = null;
    return (...args) => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      timer = setTimeout(() => {
        callback(...args)
      }, time);
    }
  }

export function throttle(fn, delay) {
    let currentTime = Date.now()
    return (...args) => {
      let nowTime = Date.now()
      if (nowTime - currentTime > delay) {
        fn(...args)
        currentTime = Date.now()
      }
    }
}
  

/**
 * 可以使用this关键字
 * 方法二
 * @param {*} fn 函数
 * @param {*} delay 时间
 * @returns 
 */
export function debounce2(fn, delay) {
  let timer = null;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

export function throttle2(fn, delay) {
  let timer = null;
  let lastTime = 0;
  return function() {
    const context = this;
    const args = arguments;
    const nowTime = Date.now();
    if (nowTime - lastTime >= delay) {
      fn.apply(context, args);
      lastTime = nowTime;
    } else {
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
        lastTime = nowTime;
      }, delay - (nowTime - lastTime));
    }
  };
}
