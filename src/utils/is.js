// 类型判断
export const is = (val, type) => {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}

// 数字
export const isNumber = (val) => {
  return is(val, 'Number')
}

// 字符串
export const isString = (val) => {
  return is(val, 'String')
}

// 布尔值
export const isBoolean = (val) => {
  return is(val, 'Boolean')
}

// 对象
export const isObject = (val) => {
  return val !== null && is(val, 'Object')
}

// 数组
export const isArray = (val) => {
  if (val) {
    return Array.isArray(val)
  }
  return false
}

// 日期格式
export const isDate = (val) => {
  return is(val, 'Date')
}

// 函数
export const isFunction = (val) => {
  return typeof val === 'function'
}

// 正则
export const isRegExp = (val) => {
  return is(val, 'RegExp')
}

// Symbol
export const isSymbol = (val) => {
  return is(val, 'Symbol')
}

export const isPromise = (val) => {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

// 空
export const isEmpty = (val) => {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export const isEmptyArray = (val) => {
  if (isArray(val)) {
    return val.length === 0
  }
  return false
}

export const isEmptyObject = (val) => {
  if (isObject(val)) {
    return Object.keys(val).length === 0
  }
  return false
}

// undefined
export const isUnDef = (val) => {
  return !isDef(val)
}

// 非undefined
export const isDef = (val) => {
  return typeof val !== 'undefined'
}

// null
export const isNull = (val) => {
  return val === null
}

// 非null
export const isNotNull = (val) => {
  return val !== null
}

// null 或 undefined
export const isNullOrUnDef = (val) => {
  return isUnDef(val) || isNull(val)
}

// null 或 undefined 或 空
export const isNullOrUnDefOrEmpty = (val) => {
  return isUnDef(val) || isNull(val) || isEmpty(val)
}

// 非null 和 非undefined
export const isNotNullAndDef = (val) => {
  return isNotNull(val) && isDef(val)
}

// 非null 和 非undefined 和 非空
export const isNotNullAndDefAndEmpty = (val) => {
  return isNotNull(val) && isDef(val) && !isEmpty(val)
}

export const isWindow = (val) => {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export const isElement = (val) => {
  return isObject(val) && !!val.tagName
}

export const isMap = (val) => {
  return is(val, 'Map')
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export const isUrl = (path) => {
  const reg =
    // eslint-disable-next-line no-useless-escape
    /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

export const isEmail = (email) => {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(email)
}

// 座机和400电话
export const isTelephoneNo = (email) => {
  const reg =
    /^((0\d{2,3}-\d{7,8})|(1\d{10}))$|(^(400)-(\d{3})-(\d{4})(.)(\d{1,4})$)|(^(400)-(\d{3})-(\d{4}$))/
  return reg.test(email)
}

// 中国手机号码
export const isMobilePhoneNo = (email) => {
  const reg = /^((\-|\+)?(00)?86(\-|\+)?)?1[2-9][0-9]\d{8}$/
  return reg.test(email)
}

// 传真号
export const isFaxNo = (email) => {
  const reg = /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/
  return reg.test(email)
}

// 图片格式
export const isPicture = (picture) => {
  // const reg = /(.*)\.(jpg|jpeg|png|bmp|gif|webp|ico|pcx|tif|raw|tga|wmf|emf|cdr)$/i
  const reg = /(.*)\.(jpg|jpeg|png|bmp|gif|webp)$/i
  return reg.test(picture)
}

// JSON
export const isJSON = (str) => {
  try {
    if (!str) return false
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

// 判断一个字符串是否符合日期格式
export const isDateString = (dateString) => {
  // 正则表达式匹配 YYYY/MM/DD 或 YYYY-MM-DD 格式的日期
  const regex = /^\d{4}[-/]\d{1,2}[-/]\d{1,2}$/

  // 如果字符串不匹配正则表达式，直接返回 false
  if (!regex.test(dateString)) {
    return false
  }

  // 使用 Date 对象解析日期字符串
  const date = new Date(dateString)

  // 检查日期是否有效
  const isValid = !isNaN(date.getTime())

  // 检查日期解析后是否与原始输入一致
  const parts = dateString.split(/[-/]/)
  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const day = parseInt(parts[2], 10)

  const isExactMatch =
    date.getFullYear() === year && date.getMonth() === month && date.getDate() === day

  return isValid && isExactMatch
}
