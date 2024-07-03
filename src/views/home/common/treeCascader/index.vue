<template>
  <div class="text-input content_overflow">
    <RowLayout
      title="select-tree多级下拉"
      remark="鼠标移入自动展示下一级"
      :source="treeCascaderCode"
      :childSource="treePanesCode"
      :componentName="comName"
      :childComName="childComName"
    >
      <TreeCascader @activeItemClick="activeItemClick" />
    </RowLayout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RowLayout from '@/layouts/rowLayout/index.vue'
import TreeCascader from './components/TreeCascader'
import treeCascaderCode from './components/TreeCascader?raw'
import treePanesCode from './components/TreePanes?raw'

const comName = ref('父组件TreeCascader')

const childComName = ref('子组件TreePanes')

const activeItemClick = (item) => {
  console.log('activeItemClick', item)
}
</script>

<style lang="scss" scoped>
</style>