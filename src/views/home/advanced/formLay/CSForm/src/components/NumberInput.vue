<template>
  <div
    :class="[
      prefixCls,
      { 'is-prepend': $slots.prepend || $props.slots?.prepend },
      { 'is-append': $slots.append || $props.slots?.append },
    ]"
  >
    <div v-if="$slots.prepend" :class="`${prefixCls}__prepend`">
      <slot name="prepend" />
    </div>
    <div v-else-if="$props.slots?.prepend" :class="`${prefixCls}__prepend`">
      {{ $props.slots?.prepend?.label }}
    </div>
    <ElInputNumber
      v-number-keydown
      v-model="inputVal"
      :controls="false"
      v-bind="mergeProps"
      :title="inputVal"
      :placeholder="placeholder"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
    />
    <div v-if="$slots.append" :class="`${prefixCls}__append`">
      <slot name="append" />
    </div>
    <div v-else-if="$props.slots?.append" :class="`${prefixCls}__append`">
      {{ $props.slots?.append?.label }}
    </div>
  </div>
</template>

<script setup>
import { ElInputNumber } from 'element-plus'

const attrs = useAttrs()

const props = defineProps({
  // 选中项绑定值
  modelValue: {
    type: Number,
  },
  // 设置计数器允许的最小值
  min: {
    type: Number,
  },
  // 设置计数器允许的最大值
  max: {
    type: Number,
  },
  // 计数器步长
  step: {
    type: Number,
    default: 1,
  },
  // 是否只能输入 step 的倍数
  stepStrictly: {
    type: Boolean,
    default: false,
  },
  // 数值精度
  precision: {
    type: Number,
  },
  // 原生  readonly 属性，是否只读
  readonly: {
    type: Boolean,
    default: false,
  },
  // 是否禁用状态
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否使用控制按钮
  label: {
    type: String,
  },
  // 输入框默认 placeholder
  placeholder: {
    type: String,
  },
  // 输入时是否触发表单的校验
  validateEvent: {
    type: Boolean,
    default: true,
  },
})

const mergeProps = computed(() => ({
  ...props,
  ...attrs,
}))

const prefixCls = 'number-input'

const inputVal = ref(null)

watch(
  () => props.modelValue,
  (val) => {
    inputVal.value = val
  }
)

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus'])
const onChange = (currentValue, oldValue) => {
  emit('update:modelValue', currentValue)
  emit('change', currentValue, oldValue)
}
const onBlur = (e) => {
  emit('blur', e)
}
const onFocus = (e) => {
  emit('focus', e)
}
</script>

<style lang="scss">
.number-input {
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
    border-radius: var(--el-border-radius-base);
    padding: 0 8px;
    line-height: 26px;
    white-space: nowrap;
  }

  &__prepend {
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow:
      1px 0 0 0 var(--el-border-color) inset,
      0 1px 0 0 var(--el-border-color) inset,
      0 -1px 0 0 var(--el-border-color) inset;
  }

  &__append {
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-shadow:
      0 1px 0 0 var(--el-border-color) inset,
      0 -1px 0 0 var(--el-border-color) inset,
      -1px 0 0 0 var(--el-border-color) inset;
  }

  &.is-prepend {
    .el-input__wrapper {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  &.is-append {
    .el-input__wrapper {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .el-input-number {
    flex: 1;
  }
}
</style>
