<template>
  <div class="row-layout content_overflow">
    <RowLayout title="1、fromTitle组件：表单标题" :remark="remark" :source="formTitleCode">
      <FormTitle></FormTitle>
    </RowLayout>
    <RowLayout
      title="2、colLayout组件：表单列分割"
      :remark="remark"
      :source="colLayoutCode"
    ></RowLayout>
    <RowLayout title="3、一行三列，包含标题" :remark="remark" :source="colLayoutCode">
      <Col3Layout></Col3Layout>
    </RowLayout>

    <RowLayout
      title="4、一行三列，包含标题，第二、三列合并成一列"
      :remark="remark"
      :source="col3TtLayoutCode"
    >
      <Col3TtLayout></Col3TtLayout>
    </RowLayout>

    <RowLayout title="5、一行四列，不包含标题" :remark="remark" :source="col4LayoutCode">
      <Col4Layout></Col4Layout>
    </RowLayout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RowLayout from '@/components/rowLayout/index.vue'
import FormTitle from './formTitle.vue'
import Col3Layout from './col3Layout.vue'
import Col3TtLayout from './col3TtLayout.vue'
import Col4Layout from './col4Layout.vue'
import formTitleCode from '!!raw-loader!./formTitle.vue'
import colLayoutCode from '!!raw-loader!./colLayout.vue'
import col3LayoutCode from '!!raw-loader!./col3Layout.vue'
import col3TtLayoutCode from '!!raw-loader!./col3TtLayout.vue'
import col4LayoutCode from '!!raw-loader!./col4Layout.vue'

const remark = ref('右下角查看代码 →')
const dataForm = ref({
  code: '',
  projectNumber: '',
  projectName: '',
  projectAddress: '',
})

// const formTitleCode = ref(formTitleCode)
// const col3LayoutCode = ref(col3LayoutCode)
// const colLayoutCode = ref(colLayoutCode)
// const col3TtLayoutCode = ref(col3TtLayoutCode)
// const col4LayoutCode = ref(col4LayoutCode)
</script>
