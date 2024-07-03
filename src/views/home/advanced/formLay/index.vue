<template>
  <div class="form-layout content_overflow">
    <RowLayout title="1、动态生成表单" :remark="remark" :source="fromItemsCode">
      <FromItems
        :formItems="formItems"
        :rules="rules"
        ref="FormItems"
        :form_Data="form_Data"
      ></FromItems>
    </RowLayout>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import RowLayout from '@/layouts/rowLayout/index.vue'
import FromItems from './fromItems.vue'
import fromItemsCode from './fromItems.vue?raw'

const remark = ref('右下角查看代码 →')

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

const form_Data = ref({
  cityName: '',
  time1: '',
  city: '',
  sports: '',
})

const rules = ref({
  cityName: [{ required: true, message: '请输入cityName', trigger: 'blur' }],
})
</script>
