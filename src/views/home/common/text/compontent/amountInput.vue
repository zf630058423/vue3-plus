<template>
  <el-input
    v-model="currentValue"
    :placeholder="placeholder"
    size="small"
    :disabled="disabled"
    @focus="focusHandler"
    @blur="blurHandler"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
  </el-input>
</template>
<script setup>
import { ref, watch, defineEmits } from 'vue'
/**
 * 金额组件
 */
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
  height: {
    type: Number,
    default: 32,
  },
  placeholder: {
    type: String,
    default: '请输入金额',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number],
    default: '',
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
    const newNal = inputFun.getTofixed(val, props.decimalNum)
    currentValue.value = newNal.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  {
    immediate: true,
  }
)

watch(
  () => props.decimalNum,
  (decimal, oldValue) => {
    if (decimal) {
      const newNal = inputFun.getTofixed(props.value, decimal)
      currentValue.value = newNal.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
)

const focusHandler = (e) => {
  const val = e.target.value
  currentValue.value = val.replaceAll(',', '')
}

const blurHandler = (e) => {
  const val = e.target.value.replaceAll(',', '')
  if (isNaN(val) || !val) {
    emit('change', '')
    currentValue.value = ''
  } else {
    const newNal = inputFun.getTofixed(val, props.decimalNum)
    emit('change', newNal)
    currentValue.value = newNal.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}
</script>
