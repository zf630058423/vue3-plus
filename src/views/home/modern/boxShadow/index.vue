<template>
  <div class="container">
    <RowLayout title="border-shadow阴影：小水滴" :remark="remark" :source="boxShadowCode">
      <BoxShadow></BoxShadow>
    </RowLayout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RowLayout from '@/layouts/rowLayout/index.vue'
import BoxShadow from './boxShadow.vue'
import boxShadowCode from './boxShadow.vue?raw'

const remark = ref('右下角查看代码 →')
// const boxShadowCode = ref(boxShadowCode)
</script>
