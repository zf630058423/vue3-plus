<template>
  <div class="design-patterns content_overflow">
    <h2 class="ordinary-head">JS设计模式</h2>
    <RowLayout
      v-for="item in dataList"
      :key="item.id"
      :title="`${item.id}、${item.title}`"
      :remark="item.remark"
      :source="item.code"
    ></RowLayout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RowLayout from '@/layouts/rowLayout/index.vue'
import singlePatternCode from './patternJs/single-pattern.js?raw' //单例模式
import commonPatternCode from './patternJs/common-pattern.js?raw' //命令模式
import strategyPatternCode from './patternJs/strategy-pattern.js?raw' //策略模式
import observerPatternCode from './patternJs/observer-pattern.js?raw' //观察者模式
import publishSubscriberPatternCode from './patternJs/publish-subscriber-pattern.js?raw' //发布订阅者模式
import proxyPatternCode from './patternJs/proxy-pattern.js?raw' //代理模式

const remark = ref('右下角查看代码 →')
const dataArray = ref([])
const dataList = ref([
  { id: 1, title: '单例模式', remark, code: singlePatternCode },
  { id: 2, title: '命令模式', remark, code: commonPatternCode },
  { id: 3, title: '策略模式', remark, code: strategyPatternCode },
  { id: 4, title: '观察者模式', remark, code: observerPatternCode },
  {
    id: 5,
    title: '发布订阅者模式',
    remark,
    code: publishSubscriberPatternCode,
  },
  { id: 6, title: '代理模式', remark, code: proxyPatternCode },
])
</script>
