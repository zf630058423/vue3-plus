<template>
  <div class="container">
    <div class="btns">
      <el-button @click="prev">上一张</el-button>
      <el-button @click="next">下一张</el-button>
    </div>
    <Transition :name="`${direction}-image`">
      <img class="image" :src="curImage" :key="curIndex" />
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import imgTest1 from '../../../assets/img/test1.jpg'
import imgTest2 from '../../../assets/img/test2.jpg'
import imgTest3 from '../../../assets/img/test3.jpg'
import imgTest4 from '../../../assets/img/test4.jpg'
import imgTest5 from '../../../assets/img/test5.jpg'
import imgTest6 from '../../../assets/img/test6.jpg'
import imgTest7 from '../../../assets/img/test7.jpg'
import imgTest8 from '../../../assets/img/test8.jpg'
/**
 * 备注：
 * 1.如果transition 上没有定义name,则类名微v-xxxx
 * 2.如果transition上定义了name, 则类名为${name}-xxxx
 * 3.如果指定了类名，直接使用指定的类名
 * enter-class
 * in-out:先进入再消失
 * out-in:先消失再进入
 */

const direction = ref('next')
const curIndex = ref(0)
const images = reactive([
  imgTest1,
  imgTest2,
  imgTest3,
  imgTest4,
  imgTest5,
  imgTest6,
  imgTest7,
  imgTest8,
])

const curImage = computed(() => images[curIndex.value])

const maxIndex = computed(() => images.length - 1)

const prev = () => {
  curIndex.value--
  if (curIndex.value < 0) {
    curIndex.value = maxIndex.value
  }
  direction.value = 'prev'
}

const next = () => {
  curIndex.value++
  if (curIndex.value > maxIndex.value) {
    curIndex.value = 0
  }
  direction.value = 'next'
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 290px;
  .btns button {
    margin: 1em 0.5em;
  }
}
.image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  margin-left: -100px;
  left: 50%;
}

.next-image-enter-active,
.next-image-leave-active,
.prev-image-enter-active,
.prev-image-leave-active {
  transition: 0.5s;
}

//离开最终的状态
.next-image-enter,
.next-image-leave-to,
.prev-image-enter,
.prev-image-leave-to {
  opacity: 0;
}
.next-image-enter,
.prev-image-leave-to {
  transform: translateX(200px);
}

.next-image-leave-to,
.prev-image-enter {
  transform: translateX(-200px);
}
</style>
