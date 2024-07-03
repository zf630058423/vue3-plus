import dayjs from 'dayjs'
import { isNull, isUnDef, isBoolean, isSymbol, isDate } from './is'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

const ONEDAYMS = 24 * 60 * 60 * 1000 // 一天的毫秒数

export const dateUtil = dayjs

// 非日期格式数据
export function notTimeFormat(date) {
  return (
    isNull(date) ||
    isUnDef(date) ||
    isBoolean(date) ||
    isSymbol(date) ||
    isNull(date) ||
    new Date(date) == 'Invalid Date'
  ) /* 不能使用=== */
}

// 2022-12-12
export function formatDate(date, format = DATE_FORMAT) {
  if (notTimeFormat(date)) {
    return date
  } else if (isDate(new Date(date))) {
    return dayjs(new Date(date)).format(format)
  } else {
    return date
  }
}

// 2022-12-12 09:59:59
export function formatDateTime(date, format = DATE_TIME_FORMAT) {
  if (notTimeFormat(date)) {
    return date
  } else if (isDate(new Date(date))) {
    return dayjs(new Date(date)).format(format)
  } else {
    return date
  }
}

// 2022-12-12T09:59:59
export function formatDateTimeT(date, format = DATE_TIME_FORMAT) {
  if (notTimeFormat(date)) {
    return date
  } else if (isDate(new Date(date))) {
    return dayjs(new Date(date)).format(format).replace(' ', 'T')
  } else {
    return date
  }
}

// 计算两个日期之间的差值
export function GetNumberOfDays(date1, date2) {
  //获得天数
  //date1：开始日期，date2结束日期
  var a1 = Date.parse(new Date(date1))
  var a2 = Date.parse(new Date(date2))
  var day = Math.floor(parseFloat((a2 - a1) / ONEDAYMS)) //核心：时间戳相减，然后除以天数
  return day
}

// 获取一个或多个月前的日期
export function getPrevMonthDate(m) {
  const month = m || 1
  const now = new Date()
  now.setMonth(now.getMonth() - month)

  const prevYear = now.getFullYear()
  const prevMonth = now.getMonth() + 1
  const prevMonthDays = new Date(prevYear, prevMonth, 0).getDate()

  return new Date(
    prevYear,
    prevMonth - 1,
    Math.min(now.getDate(), prevMonthDays),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  )
}

// 获取当天日期加n天后的日期
export function getDateth(date1, days = 0) {
  return new Date(new Date(date1).getTime() + ONEDAYMS * days)
}

// 获取当天日期加n月后的日期，如果日期不够取最后一天
export function getDateByPlusMonth(date, m = 1) {
  const originalDate = dayjs(date)
  const newDate = originalDate.add(m, 'month')
  if (newDate.date() !== originalDate.date()) {
    newDate.endOf('month')
  }
  return newDate
}

// 获取某个日期是星期几
export function getWeekday(date) {
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return weekdays[new Date(date).getDay()]
}

// 获取两个日期之间跨几天
export function getDaysBetween(date1, date2) {
  const date1Ms = new Date(date1).getTime() // 转换为毫秒
  const date2Ms = new Date(date2).getTime() // 转换为毫秒
  const days = (date2Ms - date1Ms) / ONEDAYMS // 计算总天数
  return Math.round(days) + 1 // 返回四舍五入后的整数天数
}

// 获取两个日期之间跨几周
export function getWeeksBetween(date1, date2) {
  // 将日期转换为毫秒
  const startMillis = new Date(date1).getTime()
  const endMillis = new Date(date2).getTime()
  // 计算两个日期之间的毫秒差值
  const diffMillis = endMillis - startMillis
  // 将毫秒差值转换为天数
  const diffDays = diffMillis / ONEDAYMS
  // 计算整周数
  const weeks = Math.floor(diffDays / 7) + 1
  return weeks
}

// 获取两个日期之间跨几月
export function getMonthsBetween(date1, date2) {
  const startDate = new Date(date1)
  const endDate = new Date(date2)
  // 计算年份和月份差值
  const yearDiff = endDate.getFullYear() - startDate.getFullYear()
  const monthDiff = endDate.getMonth() - startDate.getMonth()

  return yearDiff * 12 + monthDiff + 1
}

// 获取两个日期之间跨几季
export function getQuartersBetween(date1, date2) {
  // 将输入字符串转换为Date对象
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  // 计算整月数
  let months = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth())
  // 如果第二个日期在同一年的前一季度结束，减去一个季度
  if (d2.getMonth() < d1.getMonth() && d2.getMonth() >= 0 && d2.getMonth() < 3) {
    months--
  }
  // 计算季度数
  return Math.floor(months / 3) + 1
}

// 判断传入的日期是否小于今天
export const isBeforeToday = (date) => {
  return new Date(formatDate(date)).getTime() < new Date(formatDate(new Date())).getTime()
}
