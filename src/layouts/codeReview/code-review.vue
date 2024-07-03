<template>
  <div class="copy-code-container">
    <div class="copy-container flex-row">
      <span v-if="props.componentName">{{ props.componentName }}</span>
      <el-tooltip content="复制代码" placement="top-start">
        <Zf-Icon icon="fa-copy" color="#666" @click="handleCopy(code, $event)" />
      </el-tooltip>
      <el-tooltip :content="showCodeContent" placement="top-start">
        <Zf-Icon
          icon="fa-angle-right"
          :class="showCode ? 'icon-down' : 'icon-right'"
          @click="handeShowCode"
        />
      </el-tooltip>
    </div>
    <div class="code-palce-container" :class="{ 'show-code': showCode }">
      <div class="code-box">
        <pre>
          <highlightjs class="javascirpt lang-javascript" :autodetect="false" language='JavaScript' :code="code" />
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import clip from '@/utils/clipboard.js' // use clipboard directly

const props = defineProps({
  componentName: {
    type: String,
    default: '',
  },
  code: {
    type: String,
    default: '',
  },
})

const showCode = ref(false)

const showCodeContent = computed(() => (!showCode.value === true ? '显示代码' : '隐藏代码'))

const handeShowCode = () => {
  showCode.value = !showCode.value
}

const handleCopy = (text, event) => {
  clip(text, event)
}
</script>

<style lang="scss" scoped>
.copy-code-container {
  width: 100%;
  text-align: left;
  border-bottom: 1px solid #f2f2f2;

  .copy-container {
    width: 100%;
    height: 50px;
    justify-content: right;
    align-items: center;
    position: relative;
    display: flex;

    .ant-btn {
      width: 58px;
      height: 38px;
      margin: 0;
      border: none;
      box-shadow: none;
      background-color: transparent;
      padding: 0;
    }

    i {
      cursor: pointer;
      font-size: 18px;
      padding: 10px 20px;
    }

    .icon-right {
      transform: rotate(0deg);
      transition: transform 0.25s;
    }

    .icon-down {
      transform: rotate(90deg);
      transition: transform 0.25s;
    }
  }

  .code-palce-container {
    width: 100%;
    height: 0;
    transition: 0.22s;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;

    &.show-code {
      height: 100%;
      transition: 0.22s;
      opacity: 1;
      transform: scaleY(1);
    }
  }
}

:deep(.hljs) {
  padding: 0 20px;
  line-height: 25px;
}

:deep(.hljs-tag) {
  color: #3182bd;
}

:deep(.hljs-tag .hljs-name, .hljs-tag .hljs-attr) {
  color: #3182bd;
}
</style>
