// import { CSSelectTableNew } from '@/components/CSSelectTableNew'

/* 动态导入BusinessComps下的组件，以文件名为组件名 */
// const modules = import.meta.glob('@/components/BusinessComps/**/*.vue', { eager: true })

const getUpperCaseName = (name) => {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

const getConstantName = (name) => {
  return name
    .replace(/([A-Z])/g, '_$1')
    .replace(/^_/, '')
    .toUpperCase()
}

// const { businessMap, businessEnum } = Object.entries(modules).reduce(
//   (acc, [path, module]) => {
//     const parts = path.split('/')
//     const folderName = parts[parts.length - 2] // 获取文件所在文件夹名

//     // 格式化组件名（大驼峰式）
//     const componentName = getUpperCaseName(folderName)

//     // 生成常量名（全大写下划线式）
//     const constantName = getConstantName(folderName)

//     // 添加到组件对象
//     acc.businessMap[componentName] = module.default

//     // 添加到常量映射对象
//     acc.businessEnum[constantName] = componentName

//     return acc
//   },
//   { businessMap: {}, businessEnum: {} }
// )

const componentModules = import.meta.glob(
  ['../components/*.{vue,jsx}', '../components/*/*.{vue,jsx}'],
  { eager: true },
)

const { inputMap, inputEnum } = Object.entries(componentModules).reduce(
  (acc, [path, module]) => {
    // 移除路径前缀和后缀
    const relativePath = path.replace('../components/', '').replace(/\.(vue|jsx)$/, '')
    const parts = relativePath.split('/')

    // 确定组件名
    let componentName = ''

    if (parts.length === 1) {
      // 情况1: 直接文件，如 TagInput.vue
      componentName = getUpperCaseName(parts[0])
    } else if (parts.length > 1) {
      // 情况2: 目录结构，如 desensitize-input/index.vue
      // 使用目录名作为组件名
      const dirName = parts[parts.length - 2] // 获取目录名
      componentName = getUpperCaseName(dirName)
    }

    // 如果获取不到有效的组件名，则跳过
    if (!componentName) return acc

    // 生成常量名（全大写下划线式）
    const constantName = getConstantName(componentName)

    // 添加到组件对象
    acc.inputMap[componentName] = module.default || module

    // 添加到常量映射对象
    acc.inputEnum[constantName] = componentName

    return acc
  },
  { inputMap: {}, inputEnum: {} },
)

// businessMap['SelectTableNew'] = CSSelectTableNew
// businessEnum[getConstantName('SelectTableNew')] = getUpperCaseName('SelectTableNew')

// export { businessMap, businessEnum, inputMap, inputEnum }
export { inputMap, inputEnum }
