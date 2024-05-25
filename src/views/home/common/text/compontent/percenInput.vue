<template>
  <div>
    <el-input
      v-model="currentValue"
      :placeholder="placeholder"
      size="small"
      :disabled="disabled"
      @focus="focusHandler"
      @blur="blurHandler"
      :style="{ width: props.width + 'px' }"
    >
    </el-input>
  </div>
</template>
<script setup>
import { ref, watch, defineEmits } from 'vue'
import inputFun from '@/utils/fun.js'

const emit = defineEmits(['change'])
const currentValue = ref('')

const props = defineProps({
  decimalNum: {
    type: Number,
    default: 2,
  },
  width: {
    type: Number,
    default: 200,
  },
  placeholder: {
    type: String,
    default: '请输入',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: '',
  },
  // 最小值设置 -1无限小
  minValue: {
    type: Number,
    default: -1,
  },
})

watch(
  () => props.value,
  (newVal, oldVal) => {
    if (!newVal) {
      currentValue.value = ''
      return
    }
    let val = newVal
    if (val && typeof val === 'number') {
      val = val.toString()
    }
    const newNal = inputFun.getTofixed(val, props.decimalNum + 2)
    currentValue.value = inputFun.getTofixed(newNal * 100, props.decimalNum) + '%'
  },
  {
    immediate: true,
  }
)

const focusHandler = (e) => {
  const val = e.target.value
  const value = val.replaceAll('%', '')
  if (value) currentValue.value = inputFun.getTofixed(value, props.decimalNum)
}

const blurHandler = (e) => {
  const val = e.target.value
  if (isNaN(val) || !val) {
    emit('change', '')
    currentValue.value = ''
  } else {
    let newNal = inputFun.getTofixed(val / 100, props.decimalNum + 2)
    console.log('xxx', newNal, props.minValue != -1 && newNal < 0)
    if (props.minValue != -1 && newNal < 0) newNal = '0'
    emit('change', newNal)
    currentValue.value = inputFun.getTofixed(newNal * 100, props.decimalNum) + '%'
  }
}
</script>
