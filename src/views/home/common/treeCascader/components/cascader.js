export default {
  initList: [], //回显当前的列表
  selectList: [], //查找所有回显的ids

  //移除px
  removePx(str) {
    return str.includes('px') ? Number(str.replace(/px$/, '')) : str
  },

  //设置下拉框mask的大小
  setCascaderStyle(props) {
    return { width: props.width, height: props.height, lineHeight: props.height }
  },

  setDisabledStyle(props) {
    return props.disabled ? { background: '#a8abb2' } : null
  },

  //根据key排序
  getSortList(arry, key) {
    return arry.sort((a, b) => {
      return a[key] - b[key]
    })
  },

  initTreeList(treeList, id) {
    treeList.forEach((el) => {
      let obj = {}
      Object.keys(el).forEach((key) => {
        if (key !== 'children') {
          obj[key] = el[key]
        }
      })
      this.initList.push(obj)
      if (el.children) {
        this.initTreeList(el.children)
      }
    })
  },

  //回显找所有的id
  setIds(arr, id) {
    arr.forEach((el) => {
      if (el.id === id) {
        this.selectList.push(el)
        if (el.parentId === id) {
          this.selectList.push(el)
        }
        this.setIds(arr, el.parentId)
      }
    })
  },

  setMask(myElement, props) {
    const element = myElement.value
    const rect = element?.getBoundingClientRect()
    const offsetTop = rect?.top || null // 元素顶部距离视窗顶部的距离
    const top = props.positionMethod === 'fixed' && offsetTop ? `${offsetTop + 3}px` : '0px'
    return {
      position: props.positionMethod,
      top: top,
    }
  },

  //包含某个字符 转数组
  setSelectName(name, symbol = '/') {
    if (name && name.includes(symbol)) {
      return name.split(symbol)
    } else if (name && !name.includes(symbol)) {
      return [name]
    } else {
      return []
    }
  },
}
