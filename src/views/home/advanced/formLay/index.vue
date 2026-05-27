<template>
  <div class="form-layout content_overflow">
    <RowLayout title="1、动态生成表单" :remark="remark" :source="fromItemsCode">
      <CSForm v-model:formRef="formRef" :schema="schema" :model="formData" :span="8">
        <template #formItem-collectNum>
          <el-input type="text"></el-input>
        </template>
      </CSForm>
    </RowLayout>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import RowLayout from '@/layouts/rowLayout/index.vue'
import CSForm from './CSForm/src/index.jsx'
import fromItemsCode from './CSForm/src/index.jsx?raw'

const remark = ref('右下角查看代码 →')

const formRef = ref()

const formItems = ref([
  {
    label: '省份名称',
    type: 'ipt',
    model: 'cityName',
  },
  {
    label: '选择时间',
    type: 'date',
    model: 'time1',
    pickerDate: {
      type: 'date',
      formatValue: 'yyyy-MM-dd',
    },
  },
  {
    label: '选择城市',
    type: 'select',
    model: 'city',
    func: true,
    opts: [
      {
        label: '哈尔滨',
        value: '1',
      },
      {
        label: '齐齐哈尔',
        value: '2',
      },
      {
        label: '牡丹江',
        value: '3',
      },
      {
        label: '佳木斯',
        value: '4',
      },
    ],
  },
  {
    label: '喜欢的运动',
    type: 'checkbox',
    model: 'sports',
    array: [],
    opts: [
      {
        label: '篮球',
        value: '1',
        name: 'ball',
      },
      {
        label: '羽毛球',
        value: '2',
        name: 'ball',
      },
      {
        label: '足球',
        value: '3',
        name: 'ball',
      },
    ],
  },
])

const formData = ref({
  numCode: null,
  subPrintNum: null,
  poNum: null,
  collectNum: null,
  materialCode: null,
})

const schema = computed(() => {
  return [
    {
      component: 'Input',
      label: '单号',
      prop: 'numCode',
      componentProps: {
        disabled: true,
      },
    },
    {
      component: 'Input',
      label: '辅号',
      prop: 'subPrintNum',
      componentProps: { disabled: true },
    },
    {
      component: 'Input',
      label: '采购单号',
      prop: 'poNum',
      componentProps: { disabled: true },
    },
    {
      label: '领料单号',
      required: false,
      formItemProps: {
        slots: true,
      },
      prop: 'collectNum',
      componentProps: {
        disabled: false,
      },
    },
    {
      component: 'Input',
      label: '物料编码',
      required: true,
      prop: 'materialCode',
      componentProps: { disabled: true },
    },
  ]
})
</script>
