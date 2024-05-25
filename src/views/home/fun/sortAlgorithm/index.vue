<template>
  <div class="sort-algorithm content_overflow">
    <h2 class="ordinary-head">10种常规排序算法</h2>
    <row-layout
      v-for="item in dataList"
      :key="item.id"
      :title="`${item.id}、${item.title}`"
      :remark="item.remark"
      :source="item.code"
    ></row-layout>
  </div>
</template>

<script setup>
import RowLayout from '@/components/rowLayout/index.vue'

import bubbleSortCode from '!!raw-loader!./sortJs/bubble-sort' //冒泡排序
import quickSortCode from '!!raw-loader!./sortJs/quick-sort' //快速排序
import selectSortCode from '!!raw-loader!./sortJs/select-sort' //选择排序
import insertSortCode from '!!raw-loader!./sortJs/insert-sort' //插入排序
import mergeSortCode from '!!raw-loader!./sortJs/merge-sort' //归并排序
import radixSortCode from '!!raw-loader!./sortJs/radix-sort' //基数排序
import countSortCode from '!!raw-loader!./sortJs/count-sort' //计数排序
import shellSortCode from '!!raw-loader!./sortJs/shell-sort' //希尔排序
import bucketSortCode from '!!raw-loader!./sortJs/bucket-sort' //桶排序
import heapSortCode from '!!raw-loader!./sortJs/heap-sort' //堆排序

const remark = ref('右下角查看代码 →')

const dataArray = ref([])

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
