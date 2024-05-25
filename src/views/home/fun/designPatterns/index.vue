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
import RowLayout from '@/components/rowLayout/index.vue'
import singlePatternCode from '!!raw-loader!./patternJs/single-pattern' //单例模式
import commonPatternCode from '!!raw-loader!./patternJs/common-pattern' //命令模式
import strategyPatternCode from '!!raw-loader!./patternJs/strategy-pattern' //策略模式
import observerPatternCode from '!!raw-loader!./patternJs/observer-pattern' //观察者模式
import publishSubscriberPatternCode from '!!raw-loader!./patternJs/publish-subscriber-pattern' //发布订阅者模式
import proxyPatternCode from '!!raw-loader!./patternJs/proxy-pattern' //代理模式

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
