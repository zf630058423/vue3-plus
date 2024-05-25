/**
 *
 * Promise串行
 * 方法一
 *
 */
async function serialPromise(taskarr) {
  let res = [];
  for (const task of taskarr) {
    try {
      res.push(await task());
    } catch (error) {
      res.push(null);
    }
  }
  return res;
}
const arr = [];
serialPromise(arr);

/**
 * 方法二  使用reduce
 */
// function runPromiseByQueue(myPromises) {
//   return myPromises.reduce((prev, next) => {
//     return prev.then(() => next());
//   }, Promise.resolve());
// }
// const createPromise = (time, id) => () =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(time);
//       console.log("promise", id);
//     }, time);
//   });
// runPromiseByQueue().then((res) => {
//   console.log(res);
// });
