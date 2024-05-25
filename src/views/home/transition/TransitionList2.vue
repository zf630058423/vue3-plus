<template>
  <div class="container">
    <div class="input-row">
      <el-input
        type="text"
        @change="addTodo"
        v-model="newTodoContent"
        class="todo-content"
        placeholder="请输入"
      ></el-input>

      <el-button class="shuffle" @click="shuffle">随机排序</el-button>
    </div>

    <transition-group tag="ul" name="todo" class="todo-container">
      <li v-for="item in todos" :key="item.id" class="todo">
        <span>{{ item.content }}</span>
        <el-button @click="finishTodo(item)">完成</el-button>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const newTodoContent = ref('')

const randomId = () => {
  return Math.random().toString(16).substr(2, 5)
}

const todos = ref([
  { id: randomId(), content: '学习Vue' },
  { id: randomId(), content: '学习React' },
  { id: randomId(), content: '学习A凝固了' },
])

const addTodo = () => {
  if (!newTodoContent.value) {
    return
  }
  todos.value.unshift({
    id: randomId(),
    content: newTodoContent.value,
  })
  newTodoContent.value = ''
}

const finishTodo = (item) => {
  todos.value = todos.value.filter((it) => it !== item)
}

const shuffle = () => {
  todos.value.sort(() => Math.random() - 0.5)
}
</script>

<style lang="scss" scoped>
.container {
  width: 600px;
  padding: 1.5em;
  border-radius: 5px;

  .input-row {
    display: flex;
    justify-content: flex-start;
  }

  .todo-container {
    list-style: none;
    padding: 0;
    margin: 1em 0;
  }
  .todo {
    padding: 0.5em 0;
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid #ccc;
  }
}
.todo-enter {
  opacity: 0;
  transform: translateX(-100%);
}
.todo-enter-active,
.todo-leave-active,
.todo-move {
  transition: 0.5s;
}

.toto-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.todo-leave-active {
  position: absolute;
}
</style>
