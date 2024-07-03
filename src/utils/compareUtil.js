import {
  isObject,
  isArray,
  isNullOrUnDefOrEmpty,
  isDate,
  isNull,
  isUnDef,
  isEmptyArray,
  isEmptyObject,
} from './is'

/**
 * 比较方法都是原对象的所有属性值与当前对象的属性值进行比较，当前对象多余的属性不进行比较，如：
 * 1、let A = { a: 'a', b: 'b' } 与 let B = { a: 'a', b: 'b', c: 'c' }，可视为A没有被修改过；
 * 2、let A = { a: 'a', b: 'b' } 与 let B = { a: 'a', b: 'b1' }，可视为A被修改过；
 *
 * 注意：不能使用这些方法比较对象或数组是否相等！！！
 */

/**
 * @description 比较对象
 * @param {Object} origin 原数据
 * @param {Object} current 当前数据
 * @return {Boolean} 是否有修改
 **/
export const compare = (origin, current) => {
  if (isObject(origin) && isObject(current)) {
    return compareObject(origin, current)
  } else if (isArray(origin) && isArray(current)) {
    return compareArray(origin, current)
  } else if (isDate(origin) && isDate(current)) {
    return origin.getTime() === current.getTime()
  } else if (
    (isNullOrUnDefOrEmpty(origin) && !isNullOrUnDefOrEmpty(current)) ||
    (!isNullOrUnDefOrEmpty(origin) && isNullOrUnDefOrEmpty(current))
  ) {
    return false
  } else if (
    (isNull(origin) && current === '') ||
    (isUnDef(origin) && current === '') ||
    (isNull(origin) && isEmptyArray(current)) ||
    (isUnDef(origin) && isEmptyObject(current))
  ) {
    return true
  } else if (origin != current) {
    // 组件可能会将数字类型转换为字符串类型，所以不能使用 !== 或 ===
    return false
  } else {
    return true
  }
}

/**
 * @description 比较对象，只比较属性和值，并且忽略数组
 * @param {Object} origin 原对象
 * @param {Object} current 当前对象
 * @return {Boolean} 是否有修改
 **/
export const compareObject = (origin, current) => {
  if (isObject(origin) && isObject(current)) {
    const leng1 = Object.keys(origin).length
    const leng2 = Object.keys(current).length
    if (!leng1 && !leng2) {
      return true
    }
    for (let key in origin) {
      if (isObject(origin[key]) && isObject(current[key])) {
        if (!compareObject(origin[key], current[key])) {
          return false
        }
      } else if (isArray(origin[key]) && isArray(current[key])) {
        if (!compareArray(origin[key], current[key])) {
          return false
        }
      } else if (isDate(origin[key]) && isDate(current[key])) {
        if (origin[key].getTime() !== current[key].getTime()) {
          return false
        }
      } else if (
        (isNullOrUnDefOrEmpty(origin[key]) && !isNullOrUnDefOrEmpty(current[key])) ||
        (!isNullOrUnDefOrEmpty(origin[key]) && isNullOrUnDefOrEmpty(current[key]))
      ) {
        return false
      } else if (
        (isNull(origin) && current === '') ||
        (isUnDef(origin) && current === '') ||
        (isNull(origin) && isEmptyArray(current)) ||
        (isUnDef(origin) && isEmptyObject(current))
      ) {
        return true
      } else if (origin[key] != current[key]) {
        // 组件可能会将数字类型转换为字符串类型，所以不能使用 !== 或 ===
        return false
      }
    }
    return true
  } else {
    return origin === current
  }
}

/**
 * @description 比较数组
 * @param {Array} origin 原数组
 * @param {Array} current 当前数组
 * @return {Boolean} 是否有修改
 **/
export const compareArray = (origin, current) => {
  if (isArray(origin) && isArray(current)) {
    const leng1 = origin.length
    const leng2 = current.length
    if (!leng1 && !leng2) {
      return true
    }
    if (leng1 !== leng2) {
      return false
    }
    for (let i = 0; i < origin.length; i++) {
      if (!compareObject(origin[i], current[i])) {
        return false
      }
    }
    return true
  } else {
    return origin === current
  }
}
