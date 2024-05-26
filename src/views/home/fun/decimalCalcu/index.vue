<template>
  <div class="fun-compontent content_overflow">
    测试2
    <RowLayout title="两位小数加减乘除" remark="默认保留两位小数" :source="decimalCalcuCode">
      <DecCalcu></DecCalcu>
    </RowLayout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RowLayout from '@/components/rowLayout/index.vue'
import DecCalcu from './decCalcu.vue'
// import decimalCalcu from './index2.vue'
import decimalCalcuCode from './decimalCalcu.js?raw'
</script>
