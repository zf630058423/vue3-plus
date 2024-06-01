<template>
  <div class="container">
    <!-- 第一组 -->
    <p class="group-title">普通增减</p>
    <div class="btn-group">
      <el-button class="btn" @click="num--">-</el-button>
      <!-- 这里我们希望这个数据来源于状态仓库 -->
      <div class="num">{{ num }}</div>
      <el-button class="btn" @click="increment">+</el-button>
    </div>
    <!-- 第二组 关于getters -->
    <p class="group-title">Getters数据</p>
    <div class="btn-group">
      <el-button class="btn" @click="num--">-</el-button>
      <!-- 这里我们希望这个数据来源于状态仓库 doubleCount双倍计算 -->
      <div class="num">{{ doubleCount }}</div>
      <el-button class="btn" @click="increment">+</el-button>
    </div>
    <!-- 第三组 异步的增减 -->
    <p class="group-title">异步的增减</p>
    <div class="btn-group">
      <el-button class="btn" @click="asyncDecrement">-</el-button>
      <!-- 这里我们希望这个数据来源于状态仓库 异步的增减 -->
      <div class="num">{{ num }}</div>
      <el-button class="btn" @click="asynIncrement">+</el-button>
    </div>
    <!-- 第四组  将state重置-->
    <p class="group-title">store.$reset</p>
    <div class="btn-group">
      <el-button class="btn" @click="store.$reset">重置</el-button>
    </div>
    <!-- 第五组  store.$patch方法-->
    <p class="group-title">store.$patch方法改变值</p>
    <div class="btn-group">
      <el-input class="numInput" type="text" v-model="newnum"></el-input>
      <el-button class="btn" @click="setHandle">设置</el-button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/store/userCounterStore'

const newnum = ref('')
const store = useCounterStore() //拿到仓库
// 接下来我们可以从仓库中结构数据出来，并且要是响应式的(需要使用：storeToRefs)
// getters(doubleCount)也需要响应式storeToRefs
const { num, doubleCount } = storeToRefs(store)
//从仓库将方法解构出来,方法不需要storeToRefs
const { increment, asynIncrement, asyncDecrement } = store

//拿到用户输入的值，设置仓库的值
const setHandle = () => {
  store.$patch({
    num: ~~newnum.value,
  })
  newnum.value = ''
}
</script>
<style lang="scss" scoped>
.container > .btn-group {
  width: 280px;
  margin: 5px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.num {
  font-size: 32px;
  font-weight: 300;
}

.btn {
  height: 30px;
  outline: none;
  font-size: 16px;
  font-weight: 100;
  cursor: pointer;
  padding: 0 10px;
}

.numInput {
  width: 200px;
  height: 30px;
  margin-right: 10px;
}

.grout-title {
  text-align: center;
  margin-bottom: 0;
  font-weight: 200;
}
</style>
