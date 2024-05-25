<template>
  <div class="container">
    <el-checkbox class="border-style" v-model="check">边框</el-checkbox>
    <el-checkbox class="border-style" v-model="checkIcon">图标</el-checkbox>
    <el-checkbox class="border-style" v-model="checkPwd">密码</el-checkbox>
    <div :class="{ radius: check }" class="account" :style="accountStyle">
      <i class="el-icon-user account_icon" type="el-icon-user" v-if="checkIcon"></i>
      <span class="account_text" v-else>{{ text }}：</span>
      <el-input
        class="account_input"
        :type="getType"
        v-model="value"
        :style="style"
        :placeholder="placeholder"
      ></el-input>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const value = ref('')
const check = ref(false)
const checkIcon = ref(false)
const checkPwd = ref(false)

const props = defineProps({
  text: {
    type: String,
    default: '账号',
  },
  type: {
    type: String,
    default: 'text',
  },
  width: {
    type: Number,
    default: 280,
  },
  height: {
    type: Number,
    default: 40,
  },
  placeholder: {
    type: String,
    default: '请输入',
  },
  radius: {
    type: Number,
    default: 24,
  },
})

const getType = computed(() => (checkPwd.value ? 'password' : 'text'))

const accountStyle = computed(() => {
  return {
    width: `${props.width}px`,
    height: `${props.height}px`,
  }
})

const style = computed(() => {
  return {
    width: `${props.width - 90}px`,
    height: `${props.height - 6}px`,
  }
})
</script>

<style lang="scss" scoped>
.border-style {
  margin: 8px;
}

.account {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #d8d8d8;
  width: 280px;
  font-size: 14px;

  &_icon {
    font-size: 20px;
    margin-left: 24px;
    margin-right: 8px;
  }

  &_text {
    width: 60px;
    margin-left: 18px;
    display: inline-block;
  }

  &_input {
    margin-bottom: 6px;
  }
}

.radius {
  border: 1px solid #d8d8d8;
  border-radius: 24px;
}

:deep(.el-input__inner) {
  border: 0;
}
</style>
