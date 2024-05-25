/**
 *
 * 实现可过期的localStorage数据
 * 可以在存储数据时，在数据中加入一个过期时间戳，然后在获取数据时，先判断该数据的时间戳是否已经过期，如果已经过期，则将该数据从localStorage中删除，并返回null,否则返回该数据
 *
 */
function setWithExpiration(key, value, expirationMinutes) {
  const expirationMS = expirationMinutes * 60 * 1000;
  const record = {
    value: value,
    timestamp: new Date().getTime() + expirationMS,
  };
  localStorage.setItem(key, JSON.stringify(record));
}

function getWithExpiration(key) {
  const record = JSON.parse(localStorage.getItem(key));
  if (!record) {
    return null;
  }
  if (new Date().getTime() > record.timestamp) {
    localStorage.removeItem(key);
    return null;
  }
  return record.value;
}

//使用方法
setWithExpiration("data", { foo: "bar" }); //设置data数据，1分钟后过期
const data = getWithExpiration("data"); //获取data数据
console.log(data);
setTimeout(() => {
  const expiredData = getWithExpiration("data"); //获取data数据
  console.log(expiredData); //null, 数据已过期，被自动删除
}, 60 * 1000); //1分钟后
