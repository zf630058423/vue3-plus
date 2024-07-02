import { defineComponent, ref } from 'vue'
import { ElIcon } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import './cascader.scss'

export default defineComponent({
  name: 'TreePanes',
  props: {
    treeList: {
      type: Array,
      default: () => [],
    },
    left: {
      type: String,
      default: '10px',
    },
    rowIndex: {
      type: Number,
      default: 0,
    },
    maskWidth: {
      type: String,
      default: '130px',
    },
    positionMethod: {
      type: String,
      default: 'absolute',
    },
  },
  emits: ['mouse-enter', 'mouse-out', 'click-handler'],
  setup(props, { emit, slots, expose }) {
    const className = ref('cascader-pop')

    const onMouseEnterHander = (obj) => {
      const data = {
        left: props.left,
        children: obj.children,
        rowIndex: obj.rowIndex,
      }
      emit('mouse-enter', data, obj)
    }

    const onClickHandler = (e, obj) => {
      obj.active = !obj.active
      emit('click-handler', e, obj)
      e.stopPropagation()
    }

    return () => {
      setTimeout(() => {
        className.value = 'cascader-pop expand'
      }, 200)
      return (
        <div class={className.value} style={{ left: props.left, minWidth: props.maskWidth }}>
          <div class="cascader-mask">
            <ul class="cascader-mask_ul">
              {props.treeList &&
                props.treeList?.map((item, index) => {
                  return (
                    <li
                      class="cascader-mask_ul_li"
                      key={index}
                      onmouseenter={() => onMouseEnterHander(item)}
                      onClick={(e) => onClickHandler(e, item)}
                    >
                      <span class={item.active ? 'active' : ''}>{item.label}</span>
                      {item.children ? <ElIcon><ArrowRight /></ElIcon> : null}
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
      )
    }
  },
})
