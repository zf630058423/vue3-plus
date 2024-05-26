<template>
  <div class="container">
    <ElButton @click="addNumber">add number</ElButton>
    <ElButton @click="delNumber">del number</ElButton>
    <ElButton @click="shuffle">随机排序</ElButton>
    <transition-group tag="ul" name="nums">
      <li v-for="item in nums" :key="item">{{ item }}</li>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const nums = reactive([1, 2, 3, 4, 5, 6])

const next = ref(7)

const getRandomIndex = () => {
  return Math.floor(Math.random() * nums.length)
}

const addNumber = () => {
  const index = getRandomIndex()
  nums.splice(index, 0, next.value)
  next.value++
}

const delNumber = () => {
  const index = getRandomIndex()
  nums.splice(index, 1)
  next.value--
}

const shuffle = () => {
  nums.sort(() => Math.random() - 0.5)
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.nums-enter,
.nums-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.nums-enter-active,
.nums-leave-active,
.nums-move {
  transition: 0.5s;
}
.nums-leave-active {
  position: absolute;
}
</style>
