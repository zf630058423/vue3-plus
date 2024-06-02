<template>
  <div class="container">
    <div class="input-container">
      <p class="numInput">自己仓库deGetters数据： {{ doubleCounter }}</p>
      <el-button class="btn" @click="list.counter++">+1</el-button>
    </div>
    <div class="input-container">
      <p class="numInput">其他仓库deGetters数据： {{ otherCounter }}</p>
    </div>
    <!-- 添加新的待办事项 -->
    <div class="input-container">
      <el-input type="text" class="numInput" v-model="newItem"></el-input>
      <el-button class="btn" @click="addHandle">添加</el-button>
    </div>
    <!-- 待办事项列表 -->
    <div class="list">
      <div v-for="(it, index) in list.items" :key="index" class="item">
        <!-- 内容 -->
        <div :class="it.isCompleted ? 'del' : ''" @click="compltedHandle(index)">{{ it.text }}</div>
        <!-- 删除 -->
        <div class="close" @click="deleteHandle(index)">X</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { userListStore } from '@/store/userListStore'
import { storeToRefs } from 'pinia'

const newItem = ref('')
//获取到仓库
const store = userListStore()
//从仓库中解构数据
const { list, doubleCounter, otherCounter } = storeToRefs(store)
//从仓库解构方法出来
const { addItem, compltedHandle, deleteItem } = store

//添加新的待办事项
const addHandle = () => {
  //首先拿到用户的输入，添加到状态仓库里面
  //通过newItem.value就可以拿到用户所输入的值
  if (newItem.value) {
    addItem(newItem.value)
    newItem.value = ''
  } else {
    window.alert('请填写新增项目')
  }
}

const deleteHandle = (index) => {
  if (
    window.confirm(`
    是否要删除当前的额项目：\n
    ${list.value.items[index].text} \n
    完成状态${list.value.items[index].isCompleted ? '已完成' : '未完成'}`)
  ) {
    deleteItem(index)
  }
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
