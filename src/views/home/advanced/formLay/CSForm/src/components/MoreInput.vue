<template>
  <div class="relative w-full">
    <ElInput
      :class="['more-input', { 'readonly-clear-input': showClose }]"
      clearable
      v-bind="mergeProps"
      v-model="inputVal"
      :title="inputVal"
      :placeholder="inputPlaceholder"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
    >
      <template #append>
        <span v-if="showClose" class="clear-btn">
          <ElIcon
            class="ml-8px cursor-pointer"
            size="14"
            color="var(--el-input-clear-hover-color)"
            @click="onClear"
          >
            <CircleClose />
          </ElIcon>
        </span>
        <ElButton
          class="h-26px w-26px px-0 !leading-initial"
          :disabled="inputDisabled"
          @click="onClick"
          @keydown.enter="onClick"
        >
          <ElIcon color="var(--el-input-icon-color)">
            <MoreFilled />
          </ElIcon>
        </ElButton>
      </template>
    </ElInput>

    <ElSelectV2
      v-if="options && options.length > 1"
      ref="selectRef"
      v-model="selectValue"
      :options="options"
      @change="onChange"
      class="!absolute top-0 left-0 -z-1 invisible"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, useAttrs } from 'vue'
import { ElInput, ElButton, ElIcon, ElSelectV2 } from 'element-plus'
import { MoreFilled, CircleClose } from '@element-plus/icons-vue'

// 禁用自动继承
defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const props = defineProps({
  modelValue: {
    type: String,
  },
  options: {
    type: Array,
    default: () => [],
  },
})

const mergeProps = computed(() => ({
  ...props,
  ...attrs,
}))

const inputDisabled = computed(() => !!unref(mergeProps)?.disabled)

const inputPlaceholder = computed(() => {
  return unref(inputDisabled)
    ? ''
    : (unref(mergeProps).placeholder ?? `请选择${unref(mergeProps).label || ''}`)
})

const inputVal = ref()

watch(
  () => props.modelValue,
  (val) => {
    inputVal.value = val
  },
  { immediate: true }
)

const showClose = ref(false)
const onMouseenter = () => {
  if (
    !unref(inputDisabled) &&
    unref(mergeProps).readonly &&
    unref(mergeProps).clearable &&
    inputVal.value
  ) {
    showClose.value = true
  }
}
const onMouseleave = () => {
  showClose.value = false
}

const onClear = () => {
  if (typeof attrs['onClear'] === 'function') {
    attrs['onClear']()
  }
}

const onClick = () => {
  if (typeof attrs['append-click'] === 'function') {
    attrs['append-click']()
  }
  if (typeof attrs.appendClick === 'function') {
    attrs.appendClick()
  }
}

const emit = defineEmits(['selectChange'])
const selectRef = ref(null)
const selectValue = ref(null)
const onChange = (val) => {
  emit('selectChange', val)
  selectValue.value = null
}

watch(
  () => props.options,
  (val) => {
    if (val?.length) {
      setTimeout(() => {
        unref(selectRef)?.wrapperRef?.click()
      }, 100)
    }
  }
)
</script>

<style lang="scss" scoped>
.more-input {
  :deep(.el-input-group__append) {
    position: relative;
    padding: 0 13px;

    .clear-btn {
      display: flex;
      align-items: center;
      position: absolute;
      left: -27px;
      top: 50%;
      text-align: right;
      transform: translateY(-50%);
      height: calc(100% - 2px);
      background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
    }

    .el-button:not(.is-disabled) {
      &:hover {
        .el-icon {
          color: var(--text-color);
        }
      }
    }
  }
  &.readonly-clear-input {
    :deep(.el-input__wrapper) {
      padding-right: 27px;
    }
  }
}
</style>
