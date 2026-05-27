<template>
  <div
    :class="prefixCls"
    style="display: flex; align-items: center; width: 100%; overflow: hidden"
    v-bind="$attrs"
  >
    <div v-if="$props.slots?.prepend" :class="`${prefixCls}__prepend`">
      {{ $props.slots?.prepend || $props.slots?.prepend?.label }}
    </div>
    <div
      class="flex-1 flex w-ful"
      :class="[
        { 'is-start-prepend': $props.slots?.startPrepend },
        { 'is-start-append': $props.slots?.startAppend },
      ]"
    >
      <div v-if="$props.slots?.startPrepend" :class="`${prefixCls}-start__prepend`">
        {{ $props.slots?.startPrepend?.label }}
      </div>
      <ElInputNumber
        style="width: 100%"
        v-number-keydown
        v-model="inputFrom"
        :controls-position="controlsPosition"
        :controls="controls"
        :title="inputFrom"
        :placeholder="placeholder"
        :disabled="disabled"
        :min="min"
        v-bind="fromProps"
        @change="onChange('from', inputFrom)"
        @blur="onBlur('from', $event)"
        @focus="onFocus('from', $event)"
      />
      <div v-if="$props.slots?.startAppend" :class="`${prefixCls}-start__append`">
        {{ $props.slots?.startAppend?.label }}
      </div>
    </div>
    <span style="padding: 0 4px">{{ separator }}</span>
    <div
      class="flex-1 flex w-ful"
      :class="[
        { 'is-end-prepend': $props.slots?.endPrepend },
        { 'is-end-append': $props.slots?.endAppend },
      ]"
    >
      <div v-if="$props.slots?.endPrepend" :class="`${prefixCls}-end__prepend`">
        {{ $props.slots?.endPrepend?.label }}
      </div>
      <ElInputNumber
        style="width: 100%"
        v-number-keydown
        v-model="inputTo"
        :controls-position="controlsPosition"
        :controls="controls"
        :title="inputTo"
        :placeholder="placeholder"
        :disabled="disabled"
        :max="max"
        v-bind="toProps"
        @change="onChange('to', inputTo)"
        @blur="onBlur('to', $event)"
        @focus="onFocus('to', $event)"
      />
      <div v-if="$props.slots?.endAppend" :class="`${prefixCls}-end__append`">
        {{ $props.slots?.endAppend?.label }}
      </div>
    </div>
    <div v-if="$props.slots?.append" :class="`${prefixCls}__append`">
      {{ $props.slots?.append || $props.slots?.append?.label }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElInputNumber } from 'element-plus'
// import { $t } from '@/locales'

const prefixCls = 'range-input'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  controls: {
    type: Boolean,
    default: false,
  },
  controlsPosition: {
    type: String,
    default: 'right',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
  placeholder: {
    type: String,
  },
  slots: {
    type: Object,
  },
  separator: {
    type: String,
  },
  precision: {
    type: Number,
  },
  defaultSetToValue: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue', 'change', 'blur', 'focus'])

const inputFrom = ref(props.modelValue && props.modelValue[0])
const inputTo = ref(props.modelValue && props.modelValue[1])

const fromProps = computed(() => {
  const obj = {}
  if (inputTo.value) {
    obj.max = inputTo.value
  }
  obj.precision = props.precision
  return obj
})

const toProps = computed(() => {
  const obj = {}
  if (inputTo.value) {
    obj.min = inputFrom.value
  }
  obj.precision = props.precision
  return obj
})

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      inputFrom.value = val[0] || val[0] === 0 ? val[0] : null
      inputTo.value = val[1] || val[1] === 0 ? val[1] : null
    }
  },
)

watch(
  () => [inputFrom.value, inputTo.value],
  (newVal) => {
    emits('update:modelValue', newVal)
  },
)

const onChange = (type, value) => {
  emits('change', { type, value })
}

const onBlur = (type, event) => {
  if ('from' === type && props.defaultSetToValue && !inputTo.value) {
    inputTo.value = inputFrom.value
  }
  emits('blur', { type, event })
}

const onFocus = (type, event) => {
  emits('focus', { type, event })
}
</script>

<style lang="scss">
.range-input {
  display: flex;
  width: 100%;

  &__append,
  &__append {
    padding: 0 8px;
  }

  &-start__prepend,
  &-end__prepend,
  &-start__append,
  &-end__append {
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

  &-start__prepend,
  &-end__prepend {
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow:
      1px 0 0 0 var(--el-border-color) inset,
      0 1px 0 0 var(--el-border-color) inset,
      0 -1px 0 0 var(--el-border-color) inset;
  }

  &-start__append,
  &-end__append {
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-shadow:
      0 1px 0 0 var(--el-border-color) inset,
      0 -1px 0 0 var(--el-border-color) inset,
      -1px 0 0 0 var(--el-border-color) inset;
  }

  .is-start-prepend,
  .is-end-prepend {
    .el-input__wrapper {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .is-start-append,
  .is-end-append {
    .el-input__wrapper {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}
</style>
