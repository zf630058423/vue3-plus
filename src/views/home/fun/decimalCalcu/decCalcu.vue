<template>
  <div class="dicimal">
    <div class="dicimal_content">
      <span class="dicimal_span">
        <span>保留：</span>
        <ElInputNumber
          style="height: 31px; line-height: 31px; width: 130px"
          v-model="num"
          @change="handleChange"
          :min="1"
          :max="20"
          label="描述文字"
        ></ElInputNumber>
        位
      </span>
    </div>
    <div class="dicimal_content">
      <span>计算：</span>
      <AmountInput
        :value="num1"
        :width="width"
        @change="num1Change"
        :decimalNum="num"
      ></AmountInput>
      <ElSelect class="dicimal_select" v-model="selValue" @change="change">
        <ElOption v-for="op in options" :value="op.value" :label="op.label" :key="op.id">{{
          op.label
        }}</ElOption>
      </ElSelect>
      <AmountInput
        :value="num2"
        :width="width"
        @change="num2Change"
        :decimalNum="num"
      ></AmountInput>
      <span class="dicimal_total">{{ total }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import inputFun from '@/utils/fun.js'
import AmountInput from '../../common/text/compontent/amountInput.vue'
import { math } from './math'
import { ElInputNumber, ElOption, ElSelect } from 'element-plus'

const width = ref(100)
const num = ref(2)
const num1 = ref('')
const num2 = ref('')
const total = ref('')
const selValue = ref(1)
const options = ref([
  { id: 'add', label: '+', value: 1 },
  { id: 'sub', label: '-', value: 2 },
  { id: 'multi', label: '*', value: 3 },
  { id: 'division', label: '/', value: 4 },
])

const handleChange = (value) => {
  num.value = value
  totalMethods(selValue.value)
}

const num1Change = (e) => {
  num1.value = e
  totalMethods(selValue.value)
}

const num2Change = (e) => {
  num2.value = e
  totalMethods(selValue.value)
}

const change = (e) => {
  selValue.value = e
  totalMethods(selValue.value)
}

const totalMethods = (e) => {
  const decimalData = {
    1: math.add(num1.value, num2.value),
    2: math.sub(num1.value, num2.value),
    3: math.mul(num1.value, num2.value),
    4: math.div(num1.value, num2.value),
  }
  total.value = inputFun.getTofixed(decimalData[e], num.value)
}
</script>

<style lang="scss" scoped>
:deep(.el-input__inner) {
  height: 32px;
}

:deep(.el-input__icon) {
  line-height: 32px;
}

.dicimal {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &_span {
    margin-right: 16px;
    display: flex;
    flex-direction: row;
  }

  &_content {
    display: flex;
    flex-direction: row;
    height: 32px;
    line-height: 32px;
    margin: 8px 0;
  }

  &_select {
    width: 80px;
    margin: 0 6px;
    height: 32px;
  }

  &_total {
    display: inline-block;
    line-height: 32px;
    margin-left: 8px;
  }
}
</style>
