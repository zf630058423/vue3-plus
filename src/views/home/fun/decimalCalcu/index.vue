<template>
  <div class="fun-compontent content_overflow">
    <RowLayout title="两位小数加减乘除" remark="默认保留两位小数" :source="mathCode">
      <DecCalcu></DecCalcu>
    </RowLayout>
  </div>
</template>

<script setup>
import RowLayout from '@/layouts/rowLayout/index.vue'
import DecCalcu from './decCalcu.vue'
import mathCode from './math.js?raw'
</script>
