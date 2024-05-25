

/**
 * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
 * @param {*} num1 : 第一个小数
 * @param {*} num2 : 第二个小数
 * @returns 总数
 */
export const fnNumAdd = (num1, num2) => {
  let r1, r2, m;
  try {
    r1 = num1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return Math.round(num1 * m + num2 * m) / m;
}

/**
 * 减法运算，避免数据相减小数点后产生多位数和计算精度损失。
 * @param {*} num1 
 * @param {*} num2 
 * @returns 
 */
export const fnNumSub = (num1, num2) => {
  let baseNum, baseNum1, baseNum2;
  let precision;// 精度
  try {
    baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
    baseNum1 = 0;
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
    baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
  return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
}

/**
 * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
 * @param {*} num1 
 * @param {*} num2 
 * @returns 
 */
export const fnNumMulti = (num1, num2) => {
  let baseNum = 0;
  try {
    baseNum += num1.toString().split(".")[1].length;
  } catch (e) {
    console.log(e);
  }
  try {
    baseNum += num2.toString().split(".")[1].length;
  } catch (e) {
    console.log(e);
  }
  return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
}

/**
 * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
 * @param {*} num1 
 * @param {*} num2 
 * @returns 
 */
export const fnNumDiv = (num1, num2) => {
  let baseNum1 = 0, baseNum2 = 0;
  let baseNum3, baseNum4;
  try {
    baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
    baseNum1 = 0;
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
    baseNum2 = 0;
  }
  baseNum3 = Number(num1.toString().replace(".", ""));
  baseNum4 = Number(num2.toString().replace(".", ""));
  return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
}