<template>
  <div class="sort-algorithm content_overflow">
    <h2 class="ordinary-head">10种常规排序算法</h2>
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

import bubbleSortCode from './sortJs/bubble-sort.js?raw' //冒泡排序
import quickSortCode from './sortJs/quick-sort.js?raw' //快速排序
import selectSortCode from './sortJs/select-sort.js?raw' //选择排序
import insertSortCode from './sortJs/insert-sort.js?raw' //插入排序
import mergeSortCode from './sortJs/merge-sort.js?raw' //归并排序
import radixSortCode from './sortJs/radix-sort.js?raw' //基数排序
import countSortCode from './sortJs/count-sort.js?raw' //计数排序
import shellSortCode from './sortJs/shell-sort.js?raw' //希尔排序
import bucketSortCode from './sortJs/bucket-sort.js?raw' //桶排序
import heapSortCode from './sortJs/heap-sort.js?raw' //堆排序

const remark = '右下角查看代码 →'

const dataList = ref([
  { id: 1, title: '冒泡排序', remark, code: bubbleSortCode },
  { id: 2, title: '快速排序', remark, code: quickSortCode },
  { id: 3, title: '选择排序', remark, code: selectSortCode },
  { id: 4, title: '插入排序', remark, code: insertSortCode },
  { id: 5, title: '归并排序', remark, code: mergeSortCode },
  { id: 6, title: '基数排序', remark, code: radixSortCode },
  { id: 7, title: '计数排序', remark, code: countSortCode },
  { id: 8, title: '希尔排序', remark, code: shellSortCode },
  { id: 9, title: '桶排序', remark, code: bucketSortCode },
  { id: 10, title: '堆排序', remark, code: heapSortCode },
])
</script>
