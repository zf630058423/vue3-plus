<template>
  <div class="text-input content_overflow">
    <RowLayout title="图片上传" remark="简易图片上传" :source="ImageUploadCode">
      <ImageUpload></ImageUpload>
    </RowLayout>
  </div>
</template>

<script>
import RowLayout from '@/components/rowLayout/index.vue'
import ImageUpload from './compontent/imageUpload.vue'

//导出为模版字符串
import ImageUploadCode from './compontent/imageUpload.vue?raw'

export default {
  name: 'upLoad',
  components: {
    RowLayout,
    ImageUpload,
  },
  data() {
    return {
      ImageUploadCode, //金额组件代码
    }
  },
}
</script>
<style lang="scss" scoped>
.row_line {
  margin: 8px 16px;
}
.row {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid #dcdfe6;
  padding: 8px 0;

  &_title {
    font-weight: bold;
  }

  &_remark {
    font-size: 14px;
  }
}
</style>
