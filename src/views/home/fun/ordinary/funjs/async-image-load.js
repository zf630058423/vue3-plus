/**
 *
 * promise实现图片异步加载
 *
 */
<body>
  <div id="box">
    <h1>我是一张缺省图</h1>
  </div>
</body>;

let oBox = document.getElementById("box");
let oH = document.querySelector("h1");

function loadImageAsync(url) {
  return new Promise(function (resolve, reject) {
    let image = new Image();

    image.onload = function () {
      resolve(image);
    };

    image.onerror = function () {
      reject(new Error("Could not load image at " + url));
    };

    image.src = url;
  });
}
// 模拟一下异步加载图片
// 用setTimeoutm模拟ajax调用接口，获取接口返回的图片路径，然后传入函数中，函数中已经提前创建好了
// 图片标签。我们在.then的回调函数中自行决定插入div容器中做一些事，比如把缺省图隐藏掉
setTimeout(() => {
  loadImageAsync(
    "https://img2020.cnblogs.com/blog/2221918/202104/2221918-20210429012928150-1671892053.png"
  ).then((res) => {
    oH.style.display = "none";
    oBox.appendChild(res);
  });
}, 1000);
