<template>
  <div class="row-layout">
    <div class="row-layout_title row_line">{{ props.title }}</div>
    <div class="row-layout_remark row_line" v-if="props.remark">备注： {{ props.remark }}</div>
    <div class="row-layout_compontent row_content">
      <slot></slot>
      <slot name="content"></slot>
      <CodeReview :code="props.source" :componentName="props.componentName"></CodeReview>
      <CodeReview
        v-if="props.childSource"
        :componentName="props.childComName"
        :code="props.childSource"
      ></CodeReview>
    </div>
  </div>
</template>

<script setup>
import CodeReview from '@/layouts/codeReview/code-review.vue'

const props = defineProps({
  componentName: {
    type: String,
    default: '',
  },
  childComName: {
    type: String,
    default: '',
  },
  source: {
    type: String,
    default: '',
  },
  childSource: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '标题',
  },
  remark: {
    type: String,
    default: '备注',
  },
})
</script>

<style lang="scss" scoped>
.row_line {
  margin: 8px 16px;
}
.row_content {
  display: flex;
  padding: 0 16px;
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  text-align: left;
}
.row-layout {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid #f2f2f2;
  margin: 8px 0;
  height: calc(100% - 16px);

  &_title {
    font-weight: bold;
  }

  &_remark {
    font-size: 14px;
  }
}

:deep(.el-main) {
  text-align: left;
}
</style>
