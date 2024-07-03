<template>
  <div class="content_overflow">
    <RowLayout title="pinia的使用文档" remark="使用文档说明pinia.md" :source="piniaMdCode">
    </RowLayout>
    <RowLayout
      title="pinia演示"
      remark="pinia分为选项式风格和组合式风格两种写法，写法上有差异"
      :source="piniaCode"
    >
      <el-tabs v-model="activeName" @tab-click="taClick">
        <el-tab-pane label="计数器-选项式风格(options)" name="options">
          <Counter></Counter>
        </el-tab-pane>
        <el-tab-pane label="待办事项-组合式风格(composition)" name="composition">
          <ToDoList></ToDoList>
        </el-tab-pane>
      </el-tabs>
    </RowLayout>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import RowLayout from '@/layouts/rowLayout/index.vue'
import piniaMdCode from './pinia.md?raw'
import Counter from './compontent/counter.vue'
import piniaCode from './compontent/counter.vue?raw'
import ToDoList from './compontent/toDoList.vue'

const activeName = ref('options') //以及composition

const taClick = () => {}
</script>
