<template>
  <div class="text-input content_overflow">
    <RowLayout title="金额输入框" remark="默认保留两位小数" :source="amountInputCode">
      <AmountInput placeholder="请输入金额"></AmountInput>
    </RowLayout>
    <RowLayout title="百分比输入框" remark="默认保留两位小数" :source="percenInputCode">
      <PercenInput placeholder="请输入数字"></PercenInput>
    </RowLayout>
    <RowLayout title="link输入框" remark="默认保留两位小数" :source="linkInputCode">
      <LinkInput placeholder="请输入文字" value=""></LinkInput>
    </RowLayout>
    <RowLayout title="账号密码框" remark="勾选查看样式" :source="accountInputCode">
      <AccountInput></AccountInput>
    </RowLayout>
  </div>
</template>

<script setup>
import RowLayout from '@/layouts/rowLayout/index.vue'
import AmountInput from './compontent/amountInput.vue'
import PercenInput from './compontent/percenInput.vue'
import LinkInput from './compontent/linkInput.vue'
import AccountInput from './compontent/accountInput.vue'
//导出为模版字符串
import amountInputCode from './compontent/amountInput.vue?raw'
import percenInputCode from './compontent/percenInput.vue?raw'
import linkInputCode from './compontent/linkInput.vue?raw'
import accountInputCode from './compontent/accountInput.vue?raw'
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
