<template>
  <div class="transition content_overflow">
    <RowLayout title="1、transition随机添加删除" :remark="remark" :source="transitionListCode">
      <TransitionList></TransitionList>
    </RowLayout>
    <RowLayout
      title="2、transition列表随机添加删除"
      :remark="`输入后回车添加到列表，${remark}`"
      :source="transitionListCode2"
    >
      <TransitionList2></TransitionList2>
    </RowLayout>
    <RowLayout title="3、transition轮播图动画" :remark="remark" :source="transitionTestCode">
      <TransitionTest></TransitionTest>
    </RowLayout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RowLayout from '@/components/rowLayout/index.vue'
import TransitionList from './TransitionList.vue'
import TransitionList2 from './TransitionList2.vue'
import TransitionTest from './TransitionTest.vue'
import transitionListCode from './TransitionList.vue?raw'
import transitionListCode2 from './TransitionList2.vue?raw'
import transitionTestCode from './TransitionTest.vue?raw'

const remark = ref('右下角查看代码 →')
</script>
