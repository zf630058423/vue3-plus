/**
 * 使用Promise封装AJAX请求
 * 方法一
 */
function getJson(url) {
  let promise = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    //创建一个http请求
    xhr.open("get", url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;
      if (this.status >= 200 && this.status < 400) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    //设置错误监听函数
    xhr.onerror = function () {
      reject(new Error(this.statusText));
    };
    //设置响应数据类型
    xhr.setRequestHeader("Accept", "application/json");
    //发出http请求
    xhr.send(null);
  });
  return promise;
}

getJson("")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

/**
 * 方法二
 */
function ajaxPromise(url, method, data) {
  return new Promise((resolve, reject) => {
    // 1.创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest();

    // 2.与服务器建立连接
    xhr.open(method, url, true);

    // 3.给服务器发送数据
    xhr.send(method === "POST" && data ? JSON.stringify(data) : null);

    // 4.接收请求
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(this.status);
        }
      }
    });
  });
}
ajaxPromise("GET", "https://dog.ceo/api/breeds/image/random")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

/**
 * 方法三
 */
function asyncAjax(way, url, params) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    if (way === "get") {
      let param_list = [];
      for (let key of Object.keys(params)) {
        param_list.push(key + "=" + params[key]);
      }
      if (param_list.length !== 0) {
        let param_str = param_list.join("&");
        url += "?" + param_str;
      }

      xhr.open(way, url);
      xhr.send();
    } else {
      xhr.open(way, url);
      xhr.sendRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(params));
    }

    xhr.onload = function () {
      if (this.status >= 200 && this.status <= 400) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };

    xhr.onerror = function () {
      reject(this.statusText);
    };
  });
}

asyncAjax("get", "", { name: "zhangsan" })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
