// import moment from "moment";

/**
 * 保留小数四舍五入
 * @param {*} number 数字
 * @param {*} n 保留位数
 * @returns
 */
function getTofixed(number, n) {
  // 如果 digits 参数太小或太大。0 到 20（包括）之间的值不会引起 RangeError。实现环境（implementations）也可以支持更大或更小的值
  if (n < 0) {
    n = 0;
  }
  if (n > 20) {
    console.log("抱歉！小数位不能超过20位");
    throw new RangeError("tofixed() digits argument must be between 0 and 20");
  }
  // 如果该方法在一个非Number类型的对象上调用
  if (isNaN(number)) {
    throw new TypeError(number + ".tofixed() is not a function");
  }
  if (number == "Infinity" || number == "-Infinity") {
    number = "0";
  }
  // 如果数值大于 1e+21，该方法会简单调用 Number.prototype.toString()并返回一个指数记数法格式的字符串
  if (number >= Math.pow(10, 21)) {
    return number.toString();
  }
  // 如果忽略该参数，则默认为 0，进行四舍五入，不包括小数部分
  if (n === undefined || n === 0) {
    return Math.round(number).toString();
  }

  let result = number ? number.toString() : "0";
  const arr = result.split(".");
  // 整数情况
  if (arr.length < 2) {
    result += ".";
    for (let i = 0; i < n; i++) {
      result += "0";
    }
    return result;
  }

  // 小数情况（原位数 <= 需求位数）
  const integer = arr[0];
  let decimal = arr[1];
  if (decimal.length === n) {
    return result;
  }
  if (decimal.length < n) {
    for (let i = 0; i < n - decimal.length; i++) {
      result += "0";
    }
    return integer.length === 0 ? 0 + result : result;
  }
  // 小数情况（原位数 > 需求位数，需四舍五入）
  result = integer.length === 0 ? 0 : integer + "." + decimal.substring(0, n);
  const last = decimal.substring(n, n + 1);
  if (parseInt(last, 10) >= 5) {
    const multiple = Math.pow(10, n);
    if (Number(result) > 0) {
      // result = ((Math.round(parseFloat(result) * multiple) + 1) / multiple).toString() // 使用 Math.round 防止结果无限小数
      result = (
        (parseFloat(parseFloat(result) * multiple) + 1) /
        multiple
      ).toString(); // 使用 Math.round 防止结果无限小数
    } else {
      // 判断result为负数的情况
      // result = ((Math.round(parseFloat(result) * multiple) - 1) / multiple).toString() // 使用 Math.round 防止结果无限小数
      result = (
        (parseFloat(parseFloat(result) * multiple) - 1) /
        multiple
      ).toString(); // 使用 Math.round 防止结果无限小数
    }
    // 0 补足小数
    if (result.split(".").length <= 1) {
      result += ".";
      decimal = "";
    } else {
      decimal = result.split(".")[1];
    }

    if (decimal.length < n) {
      for (let i = 0; i < n - decimal.length; i++) {
        result += "0";
      }
      return result;
    }
  }
  return result;
}


/**
 * 可以使用this关键字
 * 
 * @param {*} fn 函数
 * @param {*} delay 时间
 * @returns 
 */
function debounce(fn, delay) {
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

function throttle(fn, delay) {
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


export default {
  getTofixed,
  debounce,
  throttle
}