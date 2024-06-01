import { defineStore } from 'pinia'
import { reactive } from 'vue'

//组合api风格
export const userListStore = defineStore('list', () => {
  //创建仓库数据，类似于state
  const list = reactive({
    items: [
      { text: '学习pinia', isCompleted: true },
      { text: '打羽毛球', isCompleted: false },
      { text: '玩游戏', isCompleted: true },
    ]
  })

  return {
    list
  }
})