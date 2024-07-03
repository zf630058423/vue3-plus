<template>
  <div class="ordinary-compontent">
    <h2 class="ordinary-head">JavaScript 常考手写题</h2>
    <div class="compontent-content">
      <el-input
        class="title-input"
        v-model="titleValue"
        placeholder="请输入标题关键字搜索"
        @input="titleInput"
      ></el-input>
      <div class="layout-content">
        <RowLayout
          v-for="item in dataArray"
          :title="`${item.id}、${item.title}`"
          :key="item.id"
          :remark="item.remark"
          :source="item.code"
        >
        </RowLayout>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import RowLayout from '@/layouts/rowLayout/index.vue'
import { debounce2 } from './funjs/debounce-throttle'
import noRepeatRandomCode from './funjs/no-repeat-random.js?raw'
import recursionCode from './funjs/recursion.js?raw'
import awaitAsyncCode from './funjs/async-await.js?raw'
import symmetryCode from './funjs/symmetry.js?raw'
import strmateCode from './funjs/strmate.js?raw'
import strRandomCode from './funjs/str-random.js?raw'
import arrayMaxValCode from './funjs/arry-max-value.js?raw'
import strLetterCountCode from './funjs/str-letter-count.js?raw'
import objectTwoEqualCode from './funjs/object-two-equal.js?raw'
import objectMergeCode from './funjs/object-merge.js?raw'
import treeToListCode from './funjs/tree-to-list.js?raw'
import listToTreeCode from './funjs/list-to-tree.js?raw'
import deepCloneCode from './funjs/deep-clone.js?raw'
import instanceofCode from './funjs/instanceof.js?raw'
import callApplyBindCode from './funjs/call-apply-bind.js?raw'
import debounceThrottleCode from './funjs/debounce-throttle.js?raw'
import packageLocalStroageCode from './funjs/package-localstroage.js?raw'
import setTimeoutAchieveIntervalCode from './funjs/setTimeout-achieve-setInterval.js?raw'
import systemCompensationSetTimoutCode from './funjs/system-compensation-settimeout.js?raw'
import onTimeSetTimeoutCode from './funjs/ontime-settimeout.js?raw'
import asyncDataStreamCode from './funjs/async-data-stream.js?raw'
import promiseCallBackCode from './funjs/promise-callback.js?raw'
import asyncImageLoadCode from './funjs/async-image-load.js?raw'
import promiseAjaxCode from './funjs/promise-ajax.js?raw'

const remark = ref('右下角查看代码 →')
const titleValue = ref('')
const dataArray = ref([]) //
const dataList = ref([
  {
    id: 1,
    title: '产生一个不重复的随机数组',
    remark,
    code: noRepeatRandomCode,
  },
  {
    id: 2,
    title: '递归完成1到100的累加',
    remark,
    code: recursionCode,
  },
  {
    id: 3,
    title: 'await async 如何实现',
    remark,
    code: awaitAsyncCode,
  },
  {
    id: 4,
    title: '打印出 1~10000 以内的对称数',
    remark,
    code: symmetryCode,
  },
  {
    id: 5,
    title: '实现一个字符串匹配算法indexOf',
    remark,
    code: strmateCode,
  },
  {
    id: 6,
    title: '随机生成字符串',
    remark,
    code: strRandomCode,
  },
  {
    id: 7,
    title: '数组中的最大值',
    remark,
    code: arrayMaxValCode,
  },
  {
    id: 8,
    title: '数字符串中字母的出现次数',
    remark,
    code: strLetterCountCode,
  },
  {
    id: 9,
    title: '判断两个对象是否相等',
    remark,
    code: objectTwoEqualCode,
  },
  {
    id: 10,
    title: '对象的合并',
    remark,
    code: objectMergeCode,
  },
  {
    id: 11,
    title: '树形结构转成列表',
    remark,
    code: treeToListCode,
  },
  {
    id: 12,
    title: '列表结构转树形',
    remark,
    code: listToTreeCode,
  },
  {
    id: 13,
    title: '实现深拷贝',
    remark,
    code: deepCloneCode,
  },
  {
    id: 14,
    title: '手写instanceof',
    remark,
    code: instanceofCode,
  },
  {
    id: 15,
    title: '手写call apply bind',
    remark,
    code: callApplyBindCode,
  },
  {
    id: 16,
    title: '手写防抖、节流',
    remark,
    code: debounceThrottleCode,
  },
  {
    id: 17,
    title: '封装一个localstorage的setItem和getItem方法',
    remark,
    code: packageLocalStroageCode,
  },
  {
    id: 18,
    title: '使用setTimeout实现setInterval',
    remark,
    code: setTimeoutAchieveIntervalCode,
  },
  {
    id: 19,
    title: 'settimeout系统补偿时间',
    remark,
    code: systemCompensationSetTimoutCode,
  },
  {
    id: 20,
    title: 'setTimeout准时',
    remark,
    code: onTimeSetTimeoutCode,
  },
  {
    id: 21,
    title: 'JS异步数据流，实现并发异步请求，结果顺序输出',
    remark,
    code: asyncDataStreamCode,
  },
  {
    id: 22,
    title: 'Promise串行',
    remark,
    code: asyncDataStreamCode,
  },
  {
    id: 23,
    title: '使用 Promise 改写回调地狱',
    remark,
    code: promiseCallBackCode,
  },
  {
    id: 24,
    title: 'promise实现图片异步加载',
    remark,
    code: asyncImageLoadCode,
  },
  {
    id: 25,
    title: '使用Promise封装AJAX请求',
    remark,
    code: promiseAjaxCode,
  },
])

onMounted(() => {
  dataArray.value = dataList.value
})

const titleInput = debounce2(function (value) {
  dataArray.value = dataList.value.filter((el) => el.title.includes(value))
}, 500)
</script>

<style lang="scss" scoped>
.ordinary-compontent {
  overflow: hidden;
  position: relative;
  height: 100%;

  .ordinary-head {
    height: 60px;
    line-height: 60px;
  }
  .compontent-content {
    margin: 24px 0;
    text-align: left;
    position: relative;
    height: calc(100% - 60px);

    .title-input {
      width: 400px;
    }

    .layout-content {
      overflow: auto;
      height: calc(100% - 78px);
      margin-top: 8px;
      padding: 8px;
      border: 1px solid #f2f2f2;
    }
  }
}
</style>
