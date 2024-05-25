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
import { ref } from 'vue'
import RowLayout from '@/components/rowLayout/index.vue'
import AmountInput from './compontent/amountInput.vue'
import PercenInput from './compontent/percenInput.vue'
import LinkInput from './compontent/linkInput.vue'
import AccountInput from './compontent/accountInput.vue'
//导出为模版字符串
import amountInputCode from '!!raw-loader!./compontent/amountInput.vue'
import percenInputCode from '!!raw-loader!./compontent/percenInput.vue'
import linkInputCode from '!!raw-loader!./compontent/linkInput.vue'
import accountInputCode from '!!raw-loader!./compontent/accountInput.vue'

// const amountInputCode = ref(amountInputCode)
// const percenInputCode = ref(percenInputCode)
// const linkInputCode = ref(linkInputCode)
// const accountInputCode = ref(accountInputCode)
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
