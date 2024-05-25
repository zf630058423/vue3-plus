<template>
  <div class="link-input">
    <el-input
      ref="input"
      v-on="$listeners"
      v-bind="$attrs"
      v-model="currentValue"
      @blur="blur"
      :style="style"
    >
    </el-input>
    <div class="link" v-if="currentValue && linkStatus" @click="linkCancel" :style="linkStyle">
      <el-tooltip
        class="item"
        effect="dark"
        :content="$attrs.tip || '连接'"
        placement="bottom-start"
      >
        <span class="link-span" @click.stop="toLink">{{ currentValue }}</span>
      </el-tooltip>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, computed, onMounted } from 'vue'

/**
 * 文本框组件包含连接文字或数字
 * value： 默认值
 */
const props = defineProps({
  value: {
    type: [String, Number],
    default: '',
  },
  linkUrl: {
    type: String,
    default: 'http://www.baidu.com',
  },
  height: {
    type: Number,
    default: 32,
  },
  width: {
    type: Number,
    default: 200,
  },
  size: {
    type: Number,
    default: 14,
  },
})

const input = ref()
const linkStatus = ref(false)
const currentValue = ref('')

watch(
  () => props.value,
  (newVal, oldVal) => {
    currentValue.value = newVal
  },
  {
    immediate: true,
  }
)

const style = computed(() => {
  return {
    width: props.width + 'px',
    height: props.height + 'px',
  }
})

const linkStyle = computed(() => {
  return {
    height: props.height - 3 + 'px',
    width: props.width - 19 + 'px',
    lineHeight: props.height - 3 + 'px',
    fontSize: props.size + 'px',
  }
})

onMounted(() => {
  $nextTick(() => {
    input.value.$refs.input.style.height = props.height + 'px'
  })
})

const blur = () => {
  linkStatus.value = true
}

const linkCancel = () => {
  if ($attrs.disabled) return
  linkStatus.value = !linkStatus.value
  input.value.focus()
}

const toLink = () => {
  window.location.href = props.linkUrl
}
</script>
<style scoped lang="scss">
.link-input {
  position: relative;

  .link {
    position: absolute;
    z-index: 1000;
    top: 2px;
    background: #f5f7fa;
    left: 1px;
    width: 99%;
    margin-right: 50px;
    border-radius: 4px;
    padding: 0 8px;

    &-span {
      display: inline-block;
      height: 30px;
      line-height: 30px;

      &:hover {
        cursor: pointer;
        color: #006eff;
        text-decoration-line: underline;
      }
    }
  }
}
</style>
