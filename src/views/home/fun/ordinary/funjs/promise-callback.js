/**
 * 使用 Promise 改写回调地狱
 */
function myPromise(time, context) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(context);
      resolve();
      console.log(reject);
    }, time);
  });
}

// promise写法
myPromise(1000, 111)
  .then(() => {
    return myPromise(2000, 222);
  })
  .then(() => {
    return myPromise(3000, 333);
  });

/**
 * 方法二
 */
function myPromise2(time, context) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(context);
      resolve();
      console.log(reject);
    }, time);
  });
}

// async await写法
async function fun() {
  await myPromise2(1000, 111);
  await myPromise2(2000, 222);
  await myPromise2(3000, 333);
}
fun();
