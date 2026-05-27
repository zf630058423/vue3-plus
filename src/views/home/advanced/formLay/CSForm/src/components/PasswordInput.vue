<template>
  <ElInput
    :id="componentId"
    ref="PasswordInputRef"
    v-model="newPwd"
    :placeholder="placeholder"
    type="text"
    @input="newPasswordInput"
    @paste="paste"
    @blur="onBlur"
  >
    <template #suffix>
      <Icon
        :icon="isOpen ? Hide : View"
        style="cursor: pointer"
        color="#a8abb2"
        @click="iconClick(!isOpen)"
      />
    </template>
  </ElInput>
</template>

<script setup>
import { ref } from 'vue'
import { ElInput } from 'element-plus'
import { Hide, View } from '@element-plus/icons-vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'blur'])
const PasswordInputRef = ref()
const newPwd = ref('')
const isOpen = ref(true)
const res = ref('')
const starStr = ref('')
const componentId = `PasswordInput${new Date().getTime()}`

// 禁止复制
const paste = (e) => {
  e.preventDefault()
  return ''
}

const newPasswordInput = (e) => {
  if (!e) {
    emit('update:modelValue', '')
  }
  if (isOpen.value) {
    let value = e // 当前的值
    let oldVal = props.modelValue // 之前的值
    let passwordShow = '' // 当前输入下需要显示的值，及n个*的字符串
    let text = '' // 当前input事件输入的值，如果是删除就没有值
    let startPoint = document.getElementById(componentId).selectionStart
    let tempStr = ''
    if (!value) {
      tempStr = ''
      newPwd.value = ''
      return
    }
    let leftNum = 0 // 输入后左边保留多少
    let rightNum = 0 // 输入后右边保留多少
    let isLeft = true
    for (let i = 0; i < value.length; i++) {
      passwordShow += '*'
      if (value[i] == '*') {
        if (isLeft) {
          leftNum++
        } else {
          rightNum++
        }
        continue
      }
      text += value[i]
      isLeft = false
    }
    if (text) {
      tempStr = oldVal.slice(0, leftNum) + text + oldVal.slice(oldVal.length - rightNum)
    } else {
      tempStr =
        oldVal.slice(0, startPoint) + oldVal.slice(oldVal.length - leftNum - rightNum + startPoint)
    }
    newPwd.value = passwordShow
    res.value = tempStr
    starStr.value = passwordShow
    emit('update:modelValue', tempStr)
  } else {
    res.value = newPwd.value
    let len = newPwd.value.length
    starStr.value = ''
    for (let i = 0; i < len; i++) {
      starStr.value += '*'
    }
    emit('update:modelValue', res.value)
  }
}

const iconClick = (val) => {
  isOpen.value = val
  if (!val) {
    newPwd.value = res.value
  } else {
    newPwd.value = starStr.value
  }
}

const onBlur = () => {
  emit('blur')
}
</script>
