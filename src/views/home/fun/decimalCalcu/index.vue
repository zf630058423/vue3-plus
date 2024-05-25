<template>
  <div class="fun-compontent content_overflow">
    <RowLayout title="两位小数加减乘除" remark="默认保留两位小数" :source="decimalCalcuCode">
      <DecimalCalcu></DecimalCalcu>
    </RowLayout>
  </div>
</template>

<script setup>
import RowLayout from '@/components/rowLayout/index.vue'
import DecimalCalcu from './decimalCalcu.vue'
import decimalCalcuCode from '!!raw-loader!./decimalCalcu.js'
</script>
