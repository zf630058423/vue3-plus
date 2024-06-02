import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'

//引入其他仓库
import { useCounterStore } from './userCounterStore'


//组合api风格
export const userListStore = defineStore('list', () => {
  const counterStore = useCounterStore()
  //创建仓库数据，类似于state
  const list = reactive({
    items: [
      { text: '学习pinia', isCompleted: true },
      { text: '打羽毛球', isCompleted: false },
      { text: '玩游戏', isCompleted: true },
    ],
    counter: 100
  })

  const doubleCounter = computed(() => {
    return list.counter * 2
  })

  //该getter使用的是其他仓库的数据
  const otherCounter = computed(() => {
    return counterStore.doubleCount * 3
  })

  //添加新的事项
  function addItem(newItem) {
    list.items.push({
      text: newItem,
      isCompleted: false
    })
  }

  //切换事项对应的完成状态
  const compltedHandle = (index) => {
    list.items[index].isCompleted = !list.items[index].isCompleted
  }


  //删除待办事项对应下标的某一项
  function deleteItem(index) {
    list.items.splice(index, 1)
  }


  return {
    list,
    doubleCounter,
    otherCounter,
    addItem,
    compltedHandle,
    deleteItem
  }
})