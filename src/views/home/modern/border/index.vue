<template>
  <div class="border-com content_overflow">
    <RowLayout title="1、border-radius圆角" :remark="remark" :source="bordeRadiusCode">
      <BorderRadius></BorderRadius>
    </RowLayout>
    <RowLayout title="2、border-radius:异形头像" :remark="remark" :source="borderBox1Code">
      <BorderBox1></BorderBox1>
    </RowLayout>
    <RowLayout title="3、border-radius:异形相框" :remark="remark" :source="borderBox2Code">
      <BorderBox2></BorderBox2>
    </RowLayout>
    <RowLayout title="4、border-radius:标题角标" :remark="remark" :source="borderBox3Code">
      <BorderBox3></BorderBox3>
    </RowLayout>
    <RowLayout title="5、border-radius:多边形" :remark="remark" :source="borderBox4Code">
      <BorderBox4></BorderBox4>
    </RowLayout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RowLayout from '@/components/rowLayout/index.vue'
import BorderRadius from './borderRadius.vue'
import BorderBox1 from './borderBox1.vue'
import BorderBox2 from './borderBox2.vue'
import BorderBox3 from './borderBox3.vue'
import BorderBox4 from './borderBox4.vue'
import bordeRadiusCode from '!!raw-loader!./borderRadius.vue'
import borderBox1Code from '!!raw-loader!./borderBox1.vue'
import borderBox2Code from '!!raw-loader!./borderBox2.vue'
import borderBox3Code from '!!raw-loader!./borderBox3.vue'
import borderBox4Code from '!!raw-loader!./borderBox4.vue'

const remark = ref('右下角查看代码 →')
// const bordeRadiusCode = ref(bordeRadiusCode)

// const borderBox1Code = ref(borderBox1Code)
// const borderBox2Code = ref(borderBox2Code)
// const borderBox3Code = ref(borderBox3Code)
// const borderBox4Code = ref(borderBox4Code)
</script>

<style lang="scss" scoped>
@import '@/styles/contentFlow.scss'; // 引入scss文件
</style>
