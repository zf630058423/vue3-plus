//仓库文件
import { defineStore } from 'pinia'

//第二个参数支持两种风格： options api 以及composition api
//下面这个是options api
export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      num: 0
    }
  },
  getters: {
    //针对上面state数据进行二次计算，可以看做是计算属性
    doubleCount: (state) => state.num * 2
  },
  actions: {
    //同步方法 增
    increment() {
      this.num++
    },
    //同步 减
    decrement() {
      this.num--
    },
    //异步方法 异步增
    async asynIncrement() {
      //等待一秒钟
      await new Promise((resolve) => setTimeout(resolve, 1000))
      this.increment()
    },
    //异步减
    async asyncDecrement() {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      this.decrement()
    }
  }
})