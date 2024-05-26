<template>
  <div class="content_overflow">
    <RowLayout title="1、线性渐变 文字随背景渐变" :remark="remark" :source="linearGradientCode">
      <LinearGradient></LinearGradient>
    </RowLayout>

    <RowLayout title="2、径向渐变" :remark="remark" :source="radialGradientCode">
      <RadialGradient></RadialGradient>
    </RowLayout>

    <RowLayout title="3、锥形渐变 conic-gradient" :remark="remark" :source="conicGradientCode">
      <ConicGradient></ConicGradient>
    </RowLayout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RowLayout from '@/components/rowLayout/index.vue'
import LinearGradient from './linearGradient.vue'
import RadialGradient from './radialGradient.vue'
import ConicGradient from './conicGradient.vue'
import linearGradientCode from './linearGradient.vue?raw'
import radialGradientCode from './radialGradient.vue?raw'
import conicGradientCode from './conicGradient.vue?raw'

const remark = ref('右下角查看代码 →')
</script>
