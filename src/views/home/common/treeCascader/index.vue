<template>
  <div class="text-input content_overflow">
    <RowLayout
      title="select-tree多级下拉"
      remark="鼠标移入自动展示下一级"
      :source="treeCascaderCode"
    >
      <TreeCascader />
    </RowLayout>
  </div>
</template>

<script setup>
import RowLayout from '@/components/rowLayout/index.vue'
import TreeCascader from './components/TreeCascader'
import treeCascaderCode from './components/TreeCascader?raw'
</script>

<style lang="scss" scoped>
</style>