import { isArray, isNull, isUnDef } from './is'

/**
 * @param {Array} tree - 树数组
 * @param {String} alias - children别名
 * @param {String} key - id别名
 * @param {String} parentKey - parentId别名
 * @return {Array} 树结构数组
 * @description 将大数据扁平化数组转换为树结构数组（有parentKey，但parentKey对应的id项不存在，将会被排除）
 */
export const array2Tree = (array = [], alias = 'children', key = 'id', parentKey = 'parentId') => {
  function recursive(nodes) {
    const tree = []
    if (isArray(nodes)) {
      const map = new Map(nodes.map((node) => [node[key], { ...node, [alias]: [] }]))
      for (const node of map.values()) {
        if (!node[parentKey] || node[parentKey] === '0') {
          tree.push(node)
        } else {
          map.get(node[parentKey]) && map.get(node[parentKey])[alias].push(node)
        }
      }
    }
    return tree
  }
  return recursive(array)
}

export const array2TreeWithChildren = (
  array = [],
  alias = 'children',
  key = 'id',
  parentKey = 'parentId'
) => {
  function recursive(nodes) {
    const tree = []
    if (isArray(nodes)) {
      const map = new Map(
        nodes.map((node) => [node[key], { ...node, [alias]: [...(node[alias] || [])] }])
      )
      for (const node of map.values()) {
        if (!node[parentKey] || node[parentKey] === '0') {
          tree.push(node)
        } else if (map.get(node[parentKey])) {
          if (!map.get(node[parentKey])[alias].some((n) => n[key] === node[key])) {
            map.get(node[parentKey])[alias].push(node)
          }
        }
      }
    }
    return tree
  }
  return recursive(array)
}

/**
 * @param {Array} tree - 树数组
 * @param {String} alias - children别名
 * @param {String} key - id别名
 * @param {String} parentKey - parentId别名
 * @return {Array} 树数组扁平化数据
 * @description 将树数组扁平化
 */
export const tree2Array = (
  tree = [],
  alias = 'children',
  key = 'id',
  parentKey = 'parentId',
  retainChildren = false
) => {
  const recursive = (array, parent) => {
    for (let i = 0; i < array.length; i++) {
      const item = array[i]
      const obj = {
        [parentKey]: item[parentKey] || (parent && parent[key]) || null,
        customRootId: (parent && parent.customRootId) || item[key],
      }
      for (let key in item) {
        if (retainChildren) {
          obj[key] = item[key]
        } else if (key !== alias) {
          obj[key] = item[key]
        }
      }
      nodes.push(obj)
      if (item[alias] && isArray(item[alias])) {
        recursive(item[alias], obj)
      }
    }
  }
  const nodes = []
  if (isArray(tree)) {
    recursive(tree)
  }
  return nodes
}

export const tree2ArrayWithChildren = (
  tree = [],
  alias = 'children',
  key = 'id',
  parentKey = 'parentId'
) => {
  return tree2Array(tree, alias, key, parentKey, true)
}

/**
 * @param {Array} tree - 树数组
 * @param {String} alias - children别名
 * @return {Array} 所有叶子节点
 * @description 获取树数组的所有叶子节点
 */
export const tree2LeafArray = (tree = [], alias = 'children') => {
  const recursive = (array) => {
    for (let i = 0; i < array.length; i++) {
      const item = array[i]
      if (item[alias] && isArray(item[alias]) && item[alias].length) {
        recursive(item[alias])
      } else {
        nodes.push(item)
      }
    }
  }
  const nodes = []
  if (isArray(tree)) {
    recursive(tree)
  }
  return nodes
}

/**
 * @param {Array} tree - 树数组
 * @param {Array} leafIds - 叶节点id数组
 * @param {String} key - id别名
 * @param {String} parentKey - parentId别名
 * @return {Array} 叶子节点不为空的树
 * @description 移除给定的叶节点，返回剩节点树，如果父节点下没有叶节点一并移除
 */
export const removeTreeLeaf = (tree = [], leafIds = [], key = 'id', parentKey = 'parentId') => {
  const recursive = (array, ids) => {
    for (let i = 0; i < ids.length; i++) {
      const index = array.findIndex((el) => el[key] === ids[i])
      const item = array.splice(index, 1)[0]
      if (!array.some((el) => el[parentKey] === item[parentKey])) {
        const parent = array.find((el) => el[key] === item[parentKey])
        parent && recursive(array, [parent[key]])
      }
    }
  }

  let list = []
  if (isArray(tree)) {
    if (isNull(leafIds) || isUnDef(leafIds)) {
      return tree
    }
    if (!isArray(leafIds)) {
      leafIds = [leafIds]
    }
    const parsedData = tree2Array(tree)
    recursive(parsedData, leafIds)
    list = array2Tree(parsedData)
  }
  return list
}

/**
 * @param {Array} tree - 树数组
 * @param {Array} nodeId - 树节点id
 * @return {Array} 叶子节点不为空的树
 * @description 移除树节点及子节点
 */
export const removeNodeAndChildren = (tree, nodeId) => {
  function removeNode(nodes, nodeId) {
    // 过滤掉需要删除的节点及其子节点
    return nodes.filter((node) => {
      if (node.id === nodeId) {
        return false // 删除当前节点
      }
      if (node.children && node.children.length > 0) {
        node.children = removeNode(node.children, nodeId) // 递归删除子节点
      }
      return true
    })
  }
  return removeNode(tree, nodeId)
}

/**
 * @param {Array} source - 原始树数组
 * @param {Array} tree - 当前树数组
 * @param {Array} leafIds - 叶节点id数组
 * @param {String} key - id别名
 * @param {String} parentKey - parentId别名
 * @return {Array} 树数组
 * @description 添加叶节点，如果父节点不存在则自动添加父节点
 */
export const addTreeLeaf = (
  source = [],
  tree = [],
  leafIds = [],
  key = 'id',
  parentKey = 'parentId'
) => {
  const recursive = (array, list, ids) => {
    for (let i = 0; i < leafIds.length; i++) {
      const item = array.find((el) => el[key] === ids[i])
      if (item) {
        list.push(item)
        if (item[parentKey] && !list.some((el) => el[key] === item[parentKey])) {
          const parent = array.find((el) => el[key] === item[parentKey])
          recursive(array, list, [parent[key]])
        }
      }
    }
  }
  const sourceData = tree2Array(source)
  const treeData = tree2Array(tree)
  if (!isArray(leafIds)) {
    leafIds = [leafIds]
  }
  recursive(sourceData, treeData, leafIds)
  return array2Tree(sourceData.filter((item) => treeData.some((el) => el[key] === item[key])))
}

/**
 * @param {Array} array - 树数组
 * @return {Array} 树数组
 * @description 将有parentId但parent不存在的顶层数据的parentId清空
 */
export const cleanNonexistentParentId = (array = []) => {
  const recursive = (item) => {
    if (item.parentId || item.parentId === 0) {
      const parent = array.find((el) => el.id === item.parentId)
      if (parent) {
        if (parent.parentId) {
          recursive(parent)
        }
      } else {
        item.parentId = null
      }
    }
  }

  if (isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      const item = array[i]
      recursive(item)
    }
    return array
  } else {
    return []
  }
}

export const filterTreeByField = (tree, targetField) => {
  return tree.filter((node) => {
    if (node[targetField]) {
      // 如果节点包含目标字段，则保留该节点及其子节点
      if (node.children && node.children.length > 0) {
        node.children = filterTreeByField(node.children, targetField)
      }
      return true
    } else if (node.children && node.children.length > 0) {
      // 如果节点没有目标字段但有子节点，递归地处理子节点
      node.children = filterTreeByField(node.children, targetField)
      // 保留包含目标字段的子节点
      return node.children.length > 0
    }
    // 否则，过滤掉该节点及其子节点
    return false
  })
}
