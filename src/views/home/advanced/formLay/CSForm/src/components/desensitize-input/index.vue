<script lang="jsx">
import { computed, defineComponent, ref, watch } from 'vue'
import { ElInput, ElInputNumber } from 'element-plus'
// import { useUserStore } from '@/store/modules/user'
import { isFunction } from '@/utils/is'
// import { desensitizeValue, desensitizeConfigValidator } from '@/utils/desensitize'

export default defineComponent({
  name: 'DesensitizeInput',
  inheritAttrs: false,
  props: {
    // 绑定的值
    modelValue: {
      type: [String, Number, null],
      default: null,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 是否只读（有些场景需要只读但不脱敏）
    readonly: {
      type: Boolean,
      default: false,
    },
    isNumber: {
      type: Boolean,
      default: false,
    },
    // 脱敏配置
    desensitizeConfig: {
      type: [String, Object, null],
      default: null,
      // validator: desensitizeConfigValidator,
    },
    roles: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue', 'input', 'blur', 'change'],
  setup(props, { attrs, emit, slots }) {
    // const userStore = useUserStore()

    const prefixCls = 'desensitize-input-number'

    // 内部值引用
    const internalValue = ref(props.modelValue)

    // 监听外部modelValue变化
    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal !== internalValue.value) {
          internalValue.value = newVal
        }
      },
    )

    // 当前是否应该显示脱敏内容
    // const shouldDesensitize = computed(() => {
    //   const userRoles = new Set(userStore.getRoles?.map((item) => item.roleCode) || [])
    //   return (
    //     (props.disabled || props.readonly) &&
    //     props.roles?.length &&
    //     !props.roles.some((item) => userRoles.has(item))
    //   )
    // })

    // 组件属性计算
    const componentProps = computed(() => {
      const baseProps = {
        disabled: props.disabled,
        readonly: props.readonly,
        ...attrs,
      }

      // 移除可能冲突的属性
      delete baseProps.model
      delete baseProps.modelValue
      delete baseProps['onUpdate:modelValue']

      return baseProps
    })

    // 处理输入事件
    const handleInput = (value) => {
      internalValue.value = value
      emit('update:modelValue', value)
      emit('input', value)
    }

    // 处理change事件
    const handleChange = (value) => {
      emit('change', value)
    }

    // 处理blur事件
    const handleBlur = (event) => {
      emit('blur', event)
    }

    // 渲染插槽
    const renderInputSlots = () => {
      const itemSlots = {}

      if (isFunction(slots['prefix'])) {
        itemSlots['prefix'] = () => slots['prefix']()
      }
      if (isFunction(slots['suffix'])) {
        itemSlots['suffix'] = () => slots['suffix']()
      }
      if (isFunction(slots['prepend'])) {
        itemSlots['prepend'] = () => slots['prepend']()
      }
      if (isFunction(slots['append'])) {
        itemSlots['append'] = () => slots['append']()
      }

      return itemSlots
    }

    const renderInputNumberSlots = (slotName) => {
      const { prepend, append } = slots || {}
      if (slotName === 'prepend') {
        return prepend ? <div class={`${prefixCls}__prepend`}>{prepend()}</div> : null
      }

      if (slotName === 'append') {
        return append ? <div class={`${prefixCls}__append`}>{append()}</div> : null
      }

      const itemSlots = {}

      if (isFunction(slots['decrease-icon'])) {
        itemSlots['decrease-icon'] = () => slots['decrease-icon']()
      }
      if (isFunction(slots['increase-icon'])) {
        itemSlots['increase-icon'] = () => slots['increase-icon']()
      }
      if (isFunction(slots['prefix'])) {
        itemSlots['prefix'] = () => slots['prefix']()
      }
      if (isFunction(slots['suffix'])) {
        itemSlots['suffix'] = () => slots['suffix']()
      }

      return itemSlots
    }

    const getInputNumberClass = () => {
      let classList = [prefixCls]
      if (slots?.prepend) {
        classList.push('is-prepend')
      }
      if (slots?.append) {
        classList.push('is-append')
      }
      return classList.join(' ')
    }

    // 渲染普通组件（可编辑或不需要脱敏时）
    const renderNormalComponent = () => {
      const commonHandlers = {
        onInput: handleInput,
        onChange: handleChange,
        onBlur: handleBlur,
      }

      if (props.isNumber) {
        return (
          <div class={getInputNumberClass()}>
            {renderInputNumberSlots('prepend')}
            <ElInputNumber
              modelValue={internalValue.value}
              onUpdate:modelValue={handleInput}
              {...componentProps.value}
              {...commonHandlers}
            >
              {renderInputNumberSlots()}
            </ElInputNumber>
            {renderInputNumberSlots('append')}
          </div>
        )
      } else {
        return (
          <ElInput
            modelValue={internalValue.value}
            onUpdate:modelValue={handleInput}
            {...componentProps.value}
            {...commonHandlers}
          >
            {renderInputSlots()}
          </ElInput>
        )
      }
    }

    // 渲染脱敏组件（不可编辑且需要脱敏时）
    // const renderDesensitizedComponent = () => {
    //   // 计算脱敏后的显示值
    //   const displayValue = desensitizeValue(
    //     internalValue.value,
    //     props.isNumber,
    //     props.desensitizeConfig,
    //   )

    //   return (
    //     <ElInput modelValue={displayValue} readonly={true} {...componentProps.value}>
    //       {renderInputSlots()}
    //     </ElInput>
    //   )
    // }

    // 主渲染函数
    return () => {
      // if (shouldDesensitize.value) {
      // return renderDesensitizedComponent()
      // } else {
      return renderNormalComponent()
      // }
    }
  },
})
</script>

<style lang="scss">
.desensitize-input-number {
  display: flex;
  width: 100%;
  &__prepend,
  &__append {
    background-color: var(--el-fill-color-light);
    color: var(--el-color-info);
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    border-radius: var(--el-border-radius-base) !important;
    padding: 0 8px;
    line-height: 26px;
    white-space: nowrap;
  }

  &__prepend {
    border-right: 0;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    box-shadow:
      1px 0 0 0 var(--el-border-color) inset,
      0 1px 0 0 var(--el-border-color) inset,
      0 -1px 0 0 var(--el-border-color) inset;
  }

  &__append {
    border-left: 0;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    box-shadow:
      0 1px 0 0 var(--el-border-color) inset,
      0 -1px 0 0 var(--el-border-color) inset,
      -1px 0 0 0 var(--el-border-color) inset;
  }

  &.is-prepend {
    .el-input__wrapper {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
  }

  &.is-append {
    .el-input__wrapper {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }

  .el-input-number {
    flex: 1;
  }
}
</style>
