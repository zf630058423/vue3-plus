<template>
  <div class="text-input content_overflow">
    <row-layout
      title="图片上传"
      remark="简易图片上传"
      :source="ImageUploadCode"
    >
      <image-upload></image-upload>
    </row-layout>
  </div>
</template>

<script>
import RowLayout from "../../../compontent/rowLayout/rowLayout.vue";
import ImageUpload from "./compontent/imageUpload.vue";

//导出为模版字符串
import ImageUploadCode from "!!raw-loader!./compontent/imageUpload.vue";

export default {
  name: "upLoad",
  components: {
    RowLayout,
    ImageUpload,
  },
  data() {
    return {
      ImageUploadCode, //金额组件代码
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/contentFlow.scss"; // 引入scss文件
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
