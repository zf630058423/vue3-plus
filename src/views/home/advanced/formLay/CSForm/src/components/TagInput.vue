<template>
  <div
    :key="tags"
    :class="['tag-input', 'el-input', { 'is-disabled': disabled }, { 'is-empty': !tags.length }]"
    :title="tags.map((tag) => (isObject(tag) ? tag[label] : tag))?.join(',')"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <div class="el-input__wrapper">
      <div class="tag-input__inner">
        <template v-if="tags.length">
          <ElTag
            v-for="tag in tags"
            :key="tag"
            :closable="!disabled"
            :disable-transitions="false"
            type="info"
            class="input_tags"
            @close="onClose(tag)"
          >
            {{ isObject(tag) ? tag[label] : tag }}
          </ElTag>
        </template>
        <div v-else class="placeholder">{{ placeholder }}</div>
      </div>
      <span class="el-input__suffix">
        <span
          class="el-input__suffix-inner"
          style="width: 40px; display: flex; justify-content: flex-end"
        >
          <ElIcon
            v-show="clearable && !disabled && showClose"
            class="cursor-pointer"
            @click="onClear"
          >
            <CircleClose />
          </ElIcon>
          <ElIcon
            class="cs_form_icon !ml-4px cursor-pointer focus-visible"
            :tabindex="disabled ? '-1' : '0'"
            @keydown.enter="onIconClick"
            @click="onIconClick"
          >
            <MoreFilled />
          </ElIcon>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ElTag, ElIcon } from 'element-plus'
import { CircleClose, MoreFilled } from '@element-plus/icons-vue'
import { isObject } from '@/utils/is'

const props = defineProps({
  clearable: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
  },
  value: {
    type: String,
    default: 'id',
  },
})

const emit = defineEmits(['suffixIconClick', 'change'])

const tags = ref([])

watch(
  () => props.options,
  (newVal) => {
    tags.value = newVal || []
  },
  {
    deep: true,
    immediate: true,
  }
)

const onClear = () => {
  tags.value = []
  emit('change', tags.value)
}

const onClose = (tag) => {
  const index = tags.value?.findIndex((item) =>
    isObject(tag) ? tag[props.value] === item[props.value] : tag === item
  )
  tags.value.splice(index, 1)
  emit('change', tags.value)
}

const showClose = ref(false)
const onMouseenter = () => {
  if (tags.value?.length) {
    showClose.value = true
  }
}
const onMouseleave = () => {
  showClose.value = false
}

const onIconClick = () => {
  if (!props.disabled) {
    emit('suffixIconClick')
  }
}
</script>

<style lang="scss" scoped>
.tag-input {
  .el-input__wrapper {
    padding-left: 6px;
    padding-right: 6px;
    height: unset;
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  }
  &:not(.is-disabled) {
    .el-input__wrapper {
      &:hover {
        box-shadow: 0 0 0 1px var(--el-color-primary) inset;
      }
    }
  }
  &__inner {
    width: 100%;
    min-height: 24px;

    .placeholder {
      line-height: 24px;
      font-size: 14px;
      color: #b5b8bd;
    }
    .input_tags {
      margin: -2px 6px 2px 0;
      color: var(--text-color);
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.el-form-item.is-error .tag-input.is-empty .el-input__wrapper {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset !important;
}
</style>
