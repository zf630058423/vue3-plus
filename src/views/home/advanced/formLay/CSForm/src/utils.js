import { isVNode } from 'vue'

export function isComponent(obj) {
  // 基本类型检查
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return false
  }

  // 检查虚拟节点
  if (isVNode(obj)) {
    return true
  }

  // 函数式组件或异步组件
  if (typeof obj === 'function') {
    // 可能有组件特征
    return (
      obj.name !== undefined || obj.displayName !== undefined || obj.toString().includes('import(')
    )
  }

  // 对象式组件
  if (typeof obj === 'object') {
    const componentIndicators = [
      'setup',
      'render',
      'template',
      'name',
      'props',
      'emits',
      'components',
      '__file',
    ]

    return componentIndicators.some((key) => key in obj)
  }

  return false
}
