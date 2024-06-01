<template>
  <div class="container">
    <!-- 添加新的待办事项 -->
    <div class="input-container">
      <el-input type="text" class="numInput"></el-input>
      <el-button class="btn" @click="addHandle">添加</el-button>
    </div>
    <!-- 待办事项列表 -->
    <div class="list">
      <div v-for="(it, index) in list.items" :key="index" class="item">
        <!-- 内容 -->
        <div :class="it.isCompleted ? 'del' : ''">{{ it.text }}</div>
        <!-- 删除 -->
        <div class="close">X</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { userListStore } from '@/store/userListStore'
import { storeToRefs } from 'pinia'

const numInput = ref('')
//获取到仓库
const store = userListStore()
//从仓库中解构数据
const { list } = storeToRefs(store)

//添加新的待办事项
const addHandle = () => {
  //首先拿到用户的输入，添加到状态仓库里面
}
</script>
<style lang="scss" scoped>
.container {
  width: 300px;
  margin: 20px auto;
}
.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.numInput {
  width: 75%;
  height: 30px;
}
.btn {
  width: 20%;
  cursor: pointer;
}
.list {
  margin-top: 20px;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  font-size: 20px;
  padding: 0 10px;
  box-sizing: border-box;
  cursor: pointer;
}
.close {
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  border-radius: 4px;
  background-color: rgb(243, 83, 83);
  color: #fff;
  font-weight: 400;
  cursor: pointer;
}

.del {
  text-decoration: line-through;
}
</style>
