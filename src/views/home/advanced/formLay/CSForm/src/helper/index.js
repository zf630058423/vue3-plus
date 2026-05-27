import { isFunction, isObject, isString } from '@/utils/is'
import { humpToMiddleline, firstUpperCase } from '@/utils'
import { componentNameEnum } from './componentMap'
// import { businessEnum, inputEnum } from './businessMap'

const GRID_KEYS = ['span', 'xs', 'sm', 'md', 'lg', 'xl']
const DEFAULT_GRID_PROPS = {
  // xs: 24,
  // sm: 12,
  // md: 6,
  // lg: 4,
  // xl: 3,
}

export const setGridProp = (globalProps = {}, item = {}) => {
  // 兼容旧版本在form和item传span的情况
  const span = item.span ?? globalProps.span

  const globalColProps = globalProps.colProps ?? {}
  const colProps = item.colProps ?? {}

  const mergedProps = { ...(span !== undefined && { span }), ...globalColProps, ...colProps }
  const needDefs = !GRID_KEYS.some((key) => key in mergedProps)
  return needDefs ? { ...mergedProps, ...DEFAULT_GRID_PROPS } : mergedProps
}

export const getSlot = (slots, slot = 'default', data) => {
  if (!slots || !Reflect.has(slots, slot)) {
    return null
  }
  if (!isFunction(slots[slot])) {
    return null
  }
  const slotFn = slots[slot]
  if (!slotFn) return null
  return slotFn(data)
}

export const setComponentSlots = (slotsProps) => {
  const slotObj = {}
  for (const key in slotsProps) {
    if (slotsProps[key]) {
      if (isFunction(slotsProps[key])) {
        slotObj[humpToMiddleline(key)] = (...args) => {
          return slotsProps[key]?.(...args)
        }
      } else {
        slotObj[humpToMiddleline(key)] = () => {
          if (isString(slotsProps[key])) {
            return slotsProps[key]
          }
          // 兼容旧版本写法
          if (isObject(slotsProps[key])) {
            return slotsProps[key]['label']
          }
        }
      }
    }
  }
  return slotObj
}

export const setComponentProps = (item, props) => {
  // const notNeedClearable = ['ColorPicker']
  // 拆分事件并组合
  const onEvents = item?.componentProps?.on || {}
  const newOnEvents = {}

  for (const key in onEvents) {
    if (onEvents[key]) {
      newOnEvents[`on${firstUpperCase(key)}`] = (...args) => {
        onEvents[key](...args)
      }
    }
  }

  const componentProps = {
    filterable: true,
    clearable: true,
    controls: false,
    ...item.componentProps,
    ...newOnEvents,
  }

  // 兼容MixInput
  if (item.component === 'MixInput') {
    const getLabelProp = (propName) => {
      const camelCase = propName.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
      return item[propName] ?? item[camelCase] ?? props[propName] ?? props[camelCase]
    }
    Object.assign(componentProps, {
      isFormItem: true,
      label: item.label,
      labelSuffix: getLabelProp('label-suffix'),
      labelWidth: getLabelProp('label-width'),
      labelPosition: getLabelProp('label-position'),
    })
  }

  // 需要删除额外的属性
  if (componentProps.slots) {
    delete componentProps.slots
  }
  if (componentProps.on) {
    delete componentProps.on
  }
  return componentProps
}

export const setComponentStyle = (schema) => {
  const style = {}
  if (![componentNameEnum.COLOR_PICKER, componentNameEnum.CHECKBOX].includes(schema.component)) {
    style.width = '100%'
  }
  return Object.assign(style, schema.componentProps?.style)
}

export const setPlaceholder = (schema, props) => {
  const { component, componentProps, label = '' } = schema

  if (props?.disabled || componentProps?.disabled) {
    // 旧版本disabled不显示
    return {}
  }

  const textMap = [
    componentNameEnum.INPUT,
    componentNameEnum.AUTOCOMPLETE,
    componentNameEnum.INPUT_NUMBER,
    componentNameEnum.INPUT_TAG,
    componentNameEnum.MENTION,
  ]
  const selectMap = [
    componentNameEnum.CASCADER,
    componentNameEnum.SELECT,
    componentNameEnum.SELECT_V2,
    componentNameEnum.TIME_SELECT,
    componentNameEnum.TIME_PICKER,
    componentNameEnum.DATE_PICKER,
    componentNameEnum.TREE_SELECT,
  ]
  if (textMap.includes(component)) {
    return {
      placeholder: `请输入${label}`,
    }
  }
  if (selectMap.includes(component)) {
    // 一些范围选择器
    const twoTextMap = ['datetimerange', 'daterange', 'monthrange', 'datetimerange', 'daterange']
    if (twoTextMap.includes(componentProps?.type || componentProps?.isRange)) {
      return {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        rangeSeparator: '-',
      }
    } else {
      return {
        placeholder: `请选择${label}`,
      }
    }
  }
  // if (Object.values(inputEnum).includes(component)) {
  //   return {
  //     placeholder: `请输入${label}`,
  //   }
  // }
  // if (Object.values(businessEnum).includes(component)) {
  //   return {
  //     placeholder: `请选择${label}`,
  //   }
  // }
  return {}
}

// 兼容旧版本的使用方式，推荐优先使用全局的rules
export const setRules = (schemas, props) => {
  let tmpRules = {}
  const getFieldRule = (item) => {
    return (
      item.rules ?? [
        {
          required: item.required,
          message: `${item.label}必填`,
          trigger: 'blur',
        },
        {
          required: item.required,
          message: `${item.label}必填`,
          trigger: 'change',
        },
      ]
    )
  }

  const recursive = (fields) => {
    fields?.forEach((item) => {
      if (item.prop && (item.required || item.rules)) {
        tmpRules[item.prop] = getFieldRule(item)
      }
      recursive(item.componentProps?.components)
    })
  }
  recursive(schemas)
  return { ...tmpRules, ...props.rules }
}

export const setFormItemClass = (globalProps, item) => {
  let classNames = []
  if (item.formItemProps?.customClass) {
    classNames.push(item.formItemProps.customClass)
  }
  if (globalProps.labelWidth === 'auto') {
    classNames.push('label-width-auto')
  }
  if (!item.hasOwnProperty('label')) {
    classNames.push('no-label')
  }
  return classNames.join(' ')
}
