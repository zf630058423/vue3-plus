import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import TreePanes from './TreePanes'
import './cascader.scss'
import { cloneDeep } from 'lodash-es'
import { ElIcon } from 'element-plus'
import { ArrowDown, CircleClose } from '@element-plus/icons-vue'
import cascaderConfig from './cascader'
import formProps from './props'
import { CascaderTree } from './treeCascaderList'

export default defineComponent({
  name: 'TreeCascader',
  props: formProps,
  components: {
    TreePanes, //子组件 多个mask下拉
  },
  emits: ['active-item-click'],
  setup(props, { emit, slots, expose }) {
    const placeholder = '请选择'
    const selectValue = ref('')
    const selectIds = ref([])
    const isShow = ref(false) //是否点击了select
    const isClose = ref(false) //是否显示关闭
    //存储所有的treeList
    const tree = reactive({
      treeArray: [],
    })

    //存储当前划过或者选择的list
    const curSelectTreeList = ref([])
    const treePanes = ref([])
    const myElement = ref(null)
    const curIndex = ref(0)

    watch(
      () => props.proPfmClassId,
      (newVal, oldVal) => {
        if (!props.proPfmClassId) {
          selectValue.value = props.placeholder
          regSet(true)
        }
      }
    )

    onMounted(() => {
      //父组件传递过来的数据
      // tree.treeArray = cloneDeep(changeTreeList(props.optionsTree))
      //目前没有接口，父组件没有数据，即数据写死展示
      tree.treeArray = cloneDeep(changeTreeList(CascaderTree.data))

      document.addEventListener('click', (e) => {
        if (isShow.value) {
          regSet()
        }
      })

      //编辑查看时 回显数据和id
      if (props.type === 'UPDATE' || props.type === 'LOOKUP') {
        cascaderConfig.initList = []
        cascaderConfig.selectList = []
        cascaderConfig.initTreeList(tree.treeArray)
        cascaderConfig.setIds(cascaderConfig.initList, props.proPfmClassId)
        cascaderConfig.selectList = cascaderConfig.getSortList(
          cascaderConfig.selectList,
          'rowIndex'
        )
        selectValue.value = cascaderConfig.selectList.map((el) => el.label).join('/')
        selectIds.value = cascaderConfig.selectList.map((el) => el.value)
        activeTreeList(tree.treeArray, selectIds.value, true)
      } else {
        selectValue.value = props.placeholder
      }
    })

    //重新给属性定位
    const changeTreeList = (treeList, rowIndex = 0) => {
      treeList.length > 0
        ? treeList.forEach((el) => {
          el.value = el.id
          el.label = el.dictNameCnj
          el['rowIndex'] = rowIndex
          el['active'] = false
          if (el.children) {
            curIndex.value++
            changeTreeList(el.children, curIndex.value)
          }
        })
        : []
      return treeList
    }

    //点击tree中li时取值
    const activeTreeList = (treeList, ids, isHx = false) => {
      if (treeList && treeList.length > 0) {
        treeList.forEach((el) => {
          el.active = ids.includes(el.value) ? true : false
          //如果不是新增状态 直接显示active  查看和编辑selectValue已做处理
          if (!isHx) {
            if (ids.includes(el.value)) {
              if (selectValue.value.includes(placeholder)) {
                selectValue.value = el.label
              } else {
                selectValue.value = selectValue.value
                  ? `${selectValue.value}/${el.label}`
                  : el.label
              }
            }
          }
          if (el.children) {
            activeTreeList(el.children, ids, isHx)
          }
        })
      }
    }

    //鼠标移入当前的li时，判断是否展示下一个mask(下拉框)
    const onMouseEnter = (obj, curTreeItem) => {
      let width = cascaderConfig.removePx(props.maskWidth) + 2
      selectTreeList(curTreeItem)
      const index = obj.rowIndex + 1
      if (obj.children && obj.children.length > 0) {
        const left = `${index * width}px`
        treePanes.value = treePanes.value.filter((item) => index > item.rowIndex)
        treePanes.value.push({
          rowIndex: index,
          left: left,
          treeList: obj.children?.map((el) => ({ ...el, level: treePanes.value.length + 1 })),
        })
      } else {
        treePanes.value = treePanes.value.filter((el) => el.rowIndex < index)
      }
    }

    const selectTreeList = (curTreeItem) => {
      curSelectTreeList.value =
        curSelectTreeList.value.length > 0
          ? curSelectTreeList.value.filter((el) => el.rowIndex < curTreeItem.rowIndex)
          : []
      let regObj = {}
      Object.keys(curTreeItem).forEach((key) => {
        if (key !== 'children') {
          regObj[key] = curTreeItem[key]
        }
      })
      curSelectTreeList.value.push(regObj)
      curSelectTreeList.value = cascaderConfig.getSortList(curSelectTreeList.value, 'rowIndex')
      selectIds.value = curSelectTreeList.value.map((el) => el.id)
    }

    //点击select显示下拉
    const handClick = (e) => {
      e.stopPropagation()
      if (props.disabled) return
      isShow.value = !isShow.value
      const treeList = tree.treeArray
      if (isShow.value) {
        treePanes.value.push({
          rowIndex: 0,
          left: props.maskLeft,
          treeList: treeList.map((el) => ({ ...el, rowIndex: 0, level: 1 })),
        })
      } else {
        curIndex.value = 0
        treePanes.value = []
      }
    }

    //点击li中item时
    const onClickHandler = (e, data) => {
      e.stopPropagation()
      selectValue.value = ''
      activeTreeList(tree.treeArray, selectIds.value, false)

      const params = {
        names: cascaderConfig.setSelectName(selectValue.value),
        ids: selectIds.value.length > 0 ? Array.from(selectIds.value) : [],
        name: data.label,
        id: data.id,
        level: data.level,
      }
      emit('active-item-click', params, data)
      regSet()
    }

    //点击清除
    const closeClick = (e) => {
      e.stopPropagation()
      selectValue.value = placeholder
      regSet(true)
      emit('active-item-click', null, null)
    }

    //重置的方法
    const regSet = (close = false) => {
      curIndex.value = 0
      isShow.value = false
      isClose.value = false
      treePanes.value = []
      if (close) {
        selectIds.value = []
        curSelectTreeList.value = []
        changeTreeList(tree.treeArray)
      }
    }

    return () => {
      const iconClass = isShow.value ? 'icon-select' : 'icon-default'
      const titleTxtClass = selectValue.value.includes(placeholder)
        ? 'disabled-color'
        : 'title-color'
      const selectTitleClass = props.disabled ? 'disabled' : ''

      let IconImg = null
      if (
        isClose.value &&
        !selectValue.value.includes(placeholder) &&
        !isShow.value &&
        !props.disabled
      ) {
        IconImg = (
          <ElIcon>
            <CircleClose class="close-icon" onClick={(e) => closeClick(e)} />
          </ElIcon>
        )
      } else {
        IconImg = (
          <ElIcon class={iconClass}>
            <ArrowDown />
          </ElIcon>
        )
      }

      return (
        <div
          class={['cascader', isShow.value ? 'select' : '', selectTitleClass]}
          style={cascaderConfig.setCascaderStyle(props)}
        >
          <div
            class={['cascader-title', selectTitleClass]}
            ref={myElement}
            onClick={(e) => handClick(e)}
            onmouseenter={(e) => (isClose.value = true)}
            onmouseout={(e) => (isClose.value = false)}
          >
            <span class={['span-input', titleTxtClass]}>{selectValue.value}</span>
            {IconImg}
          </div>
          <div class="mask-list" style={cascaderConfig.setMask(myElement, props)}>
            {treePanes.value.length > 0
              ? treePanes.value.map((el) => {
                return (
                  <TreePanes
                    treeList={el.treeList}
                    key={el.rowIndex}
                    left={el.left}
                    maskWidth={props.maskWidth}
                    rowIndex={el.rowIndex}
                    positionMethod={props.positionMethod}
                    onMouseEnter={onMouseEnter}
                    onClickHandler={onClickHandler}
                  />
                )
              })
              : null}
          </div>
        </div>
      )
    }
  },
})
