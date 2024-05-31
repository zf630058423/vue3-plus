import Decimal from 'decimal.js'

export const math = {
  // 加法
  add: (...args) => {
    let result = new Decimal(args[0] || 0)
    for (let i = 1; i < args.length; i++) {
      result = result.add(new Decimal(args[i] || 0))
    }
    return result.toNumber()
  },
  // 减法
  sub: (...args) => {
    let result = new Decimal(args[0] || 0)
    for (let i = 1; i < args.length; i++) {
      result = result.sub(new Decimal(args[i] || 0))
    }
    return result.toNumber()
  },
  //乘法
  mul: (...args) => {
    let result = new Decimal(args[0] || 0)
    for (let i = 1; i < args.length; i++) {
      result = result.mul(new Decimal(args[i] || 0))
    }
    return result.toNumber()
  },
  //除法
  div: (...args) => {
    let result = new Decimal(args[0] || 0)
    for (let i = 1; i < args.length; i++) {
      result = result.div(new Decimal(args[i] || 0))
    }
    return result.toNumber()
  },
  // 四舍五入保留小数点
  toDecimalPlaces: (num, decimalPlaces) => {
    return new Decimal(num || 0).toDecimalPlaces(decimalPlaces).toNumber()
  },
}

/**
 * @description 寻找最大公约数
 * @param {Object} numbers 整数数组
 * @return {Integer} 公约数
 **/
export const findGCD = (numbers) => {
  let gcd = numbers[0]
  for (let i = 1; i < numbers.length; i++) {
    gcd = calculateGCD(gcd, numbers[i])
  }
  return gcd
}

function calculateGCD(a, b) {
  if (b === 0) {
    return a
  } else {
    return calculateGCD(b, a % b)
  }
}

/**
 * @description 科学计数法转换为数字
 * @param {Object} inputNumber 科学计数法
 * @return {Number} 数字
 **/
export function transferToNumber(inputNumber) {
  if (isNaN(inputNumber) || !inputNumber) {
    return inputNumber
  }
  inputNumber = '' + inputNumber
  inputNumber = parseFloat(inputNumber)
  let eformat = inputNumber.toExponential() // 转换为标准的科学计数法形式（字符串）
  let tmpArray = eformat.match(/\d(?:\.(\d*))?e([+-]\d+)/) // 分离出小数值和指数值
  let number = inputNumber.toFixed(Math.max(0, (tmpArray[1] || '').length - tmpArray[2]))
  return number
}

/**
 * @description 将数字字符转换为千分位
 **/
export function thousandSeparator(numberString, precision) {
  if (!numberString) return numberString
  let digits
  if (digits) {
    digits = precision
  } else {
    digits = `${numberString}`.split('.')[1]?.length || 0
  }
  // 转换为数字类型
  let number = parseFloat(numberString)
  // 检查是否是有效数字
  if (isNaN(number)) {
    return numberString
  }
  // 格式化为千分位表示并保留原有小数
  return number.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}
