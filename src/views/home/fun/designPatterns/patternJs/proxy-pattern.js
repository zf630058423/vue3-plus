/**
 *
 * 代理模式
 *
 */
let api = {
  _apiKey: "kafakakafaka",
  name: "kafaka",
};
const RESTRICTED = ["_apiKey"];
api = new Proxy(api, {
  get(target, key, receiver) {
    if (RESTRICTED.indexOf(key) > -1) {
      throw Error(`${key} 不可访问.`);
    }
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    if (RESTRICTED.indexOf(key) > -1) {
      throw Error(`${key} 不可修改`);
    }
    return Reflect.set(target, key, value, receiver);
  },
});

// console.log(api._apiKey)
console.log(api.name);
// api._apiKey = '987654321'
