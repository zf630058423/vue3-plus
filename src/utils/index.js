export const withInstall = (component, alias) => {
  const comp = component
  comp.install = (app) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component
}

/**
 * @param str 需要转中划线的驼峰字符串
 * @returns 字符串中划线
 */
export const humpToMiddleline = (str) => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * @param str 需要转下划线的驼峰字符串
 * @returns 字符串下划线
 */
export const humpToUnderline = (str) => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

/**
 * 首字母大写，其他字母小写
 */
export function firstUpperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

/**
 * 首字母大写，其他字母保持不变
 */
export function firstLetterUpperCase(str) {
  return str.replace(/^./, (match) => match.toUpperCase())
}

export const setCssVar = (prop, val, dom = document.documentElement) => {
  dom.style.setProperty(prop, val)
}

/**
 * 查找数组对象的某个下标
 * @param {Array} ary 查找的数组
 * @param {Functon} fn 判断的方法
 */
export const findIndex = (ary, fn) => {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  let index = -1
  ary.some((item, i, ary) => {
    const ret = fn(item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  return index
}

// 生成唯一id
export const uniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}

/**
 * @description 删除选中的数据
 * 数据量 < 10000
 */
export const delSelectItems = (selects, list, options) => {
  const { flagValue = 1, flagField = 'isDeleted', customField = 'customId' } = options ?? {}
  // 创建一个Set存储选中的id（如果有）或完整对象引用
  const selectSet = new Set(selects.map((item) => item.id ?? item[customField] ?? item))
  // 过滤list
  return list.filter((item) => {
    // 如果已经标记了，直接保留
    if (item[flagField] === flagValue) return true
    // 获取当前项的标识符
    const itemKey = item.id ?? item[customField] ?? item
    // 检查当前项是否在选中集合中
    const isSelected = selectSet.has(itemKey)
    // 未选中的保留
    if (!isSelected) return true
    const hasValidId = item.id !== undefined && item.id !== null
    if (hasValidId) {
      // 如果有id，标记为删除（保留但标记）
      item[flagField] = flagValue
      return true // 保留该项
    } else {
      // 如果没有id，直接删除（过滤掉）
      return false
    }
  })
}
