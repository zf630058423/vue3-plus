<script lang="jsx">
import { defineComponent, computed, unref } from 'vue'
import { ElFormItem } from 'element-plus'
import { useRenderComponent } from '../hooks/useRenderComponent'

export default defineComponent({
  name: 'MixInput',
  components: {
    ElFormItem,
  },
  props: {
    label: {
      type: String,
    },
    components: {
      type: Array,
      default: () => [],
    },
    model: {
      type: Object,
      default: () => ({}),
    },
    autoSetPlaceholder: {
      type: Boolean,
      default: true,
    },
    isFormItem: {
      type: Boolean,
      default: false,
    },
    labelWidth: {
      type: [String, Number],
    },
    labelPosition: {
      // 'left' | 'right' | 'top'
      type: String,
      default: 'right',
    },
    labelSuffix: {
      type: String,
      default: ':',
    },
  },
  setup(props) {
    const { renderComponent } = useRenderComponent()

    // 计算属性：判断是否有必填项
    const hasRequiredField = computed(() => props.components.some((item) => item.required))

    // 样式生成函数
    const getPrependStyle = (index) => (index ? { marginLeft: '5px', lineHeight: '24px' } : {})

    const getFormItemStyle = (item) => (item.componentProps?.style?.width ? {} : { flex: 1 })

    const getComponentStyle = (item, index) => {
      const baseStyle = { ...item.componentProps?.style }

      // 添加左边距条件
      if (index > 0 || (!index && item.slots?.prepend)) {
        baseStyle.marginLeft = '5px'
      }

      // 如果没有设置宽度，则自动填充
      if (!baseStyle.width) {
        baseStyle.flex = 1
      }

      return baseStyle
    }

    // 渲染标签
    const renderLabel = () => {
      const style = {}
      if (props.labelWidth) {
        // 如果没有单位，默认添加 px
        let widthValue = props.labelWidth
        if (typeof widthValue === 'number' || /^\d+$/.test(widthValue)) {
          widthValue = widthValue + 'px'
        }
        style.width = widthValue
      }
      return (
        <div class="mix-input__label" style={style}>
          {props.label}
          {props.labelSuffix}
        </div>
      )
    }

    // 渲染普通项
    const renderNormalItem = (item, index) => {
      const style = getComponentStyle(item, index)
      return <div style={style}>{renderComponent(item, unref(props).model, unref(props))}</div>
    }

    // 渲染单个表单项
    const renderFormItem = (item, index) => {
      const style = getComponentStyle(item, index)
      return (
        <div style={style}>
          <ElFormItem style={getFormItemStyle(item)} prop={item.prop} class={item.className}>
            {renderComponent(item, unref(props).model, unref(props))}
          </ElFormItem>
        </div>
      )
    }

    // 渲染前后插槽
    const renderSlot = (slotType, item, index) => {
      const slotContent = item.slots?.[slotType]
      if (!slotContent) return null

      const style =
        slotType === 'prepend' ? getPrependStyle(index) : { marginLeft: '5px', lineHeight: '24px' }

      const content = slotContent.label ?? slotContent

      return <div style={style}>{typeof content === 'function' ? content() : content}</div>
    }

    return () => (
      <div
        class={[
          'mix-input',
          `mix-input--label-${props.labelPosition}`,
          hasRequiredField.value && 'is-required',
        ]}
      >
        {props.isFormItem && renderLabel()}
        <div class="mix-input__content">
          {props.components.map((item, index) => {
            return (
              <>
                {renderSlot('prepend', item, index)}
                {props.isFormItem ? renderFormItem(item, index) : renderNormalItem(item, index)}
                {renderSlot('append', item, index)}
              </>
            )
          })}
        </div>
      </div>
    )
  },
})
</script>

<style lang="scss" scoped>
.mix-input {
  display: flex;
  width: 100%;
  &__label {
    box-sizing: border-box;
    padding-left: 8px;
    padding-right: 8px;
    min-width: 80px;
    height: 26px;
    line-height: 26px;
    font-size: 13px;
    color: var(--text-color);
  }
  &--label-top {
    display: block;
    .mix-input__label {
      margin-bottom: 8px;
    }
  }
  &--label-right {
    display: flex;
    .mix-input__label {
      justify-content: flex-end;
      text-align: right;
    }
  }
  &__content {
    display: flex;
    flex: 1;
  }

  &.is-required {
    .mix-input__label::before {
      content: '*';
      margin-right: 4px;
      color: var(--el-color-danger);
    }
  }

  :deep(.el-form-item__content) {
    margin-left: unset !important;
  }
}
</style>
