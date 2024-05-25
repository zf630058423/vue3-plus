/**
 * JS异步数据流，实现并发异步请求，结果顺序输出
 */
const timer = [3000, 2000, 1000, 5000, 5000];
function myTimeout(timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(timer);
    }, timer);
    console.log(reject);
  });
}
async function orderPrint(timer) {
  const promises = timer.map((time) => myTimeout(time));
  for (const p of promises) {
    console.log(await p);
  }
}
orderPrint(timer);
