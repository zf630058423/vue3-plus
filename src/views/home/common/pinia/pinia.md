### 安装 pinia

#### 首先第一步，需要安装 Pinia,可以通过下面的命令进行安装

```
pnpm i pinia
```

#### 安装完毕后需要在 Vue 应用中挂载 Pinia

```
import { createPinia } from 'pinia'
//创建pnia实例
const pinia = createPinia()
//挂载
app.use(createPinia())
```

#### 在 src 目录下面创建仓库目录 store,在该目录下面创建对应的仓库文件，注意名字一般是 useXXXStore，在仓库文件中我们可以通过 defineStore 中来创建一个 pinia 仓库，如下：

```
export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      num: 0
    }
  }
})
```

#### 创建的时候支持两种风格，选项式 API 以及组合式 API

### 选项式风格

#### 该风格基本上和之前的 Vuex 是非常相似的，只不过没有了 mutation 了，无论是同步的方法还是异步方法，都写在 actions 里面

```
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
```

#### 在组件中使用仓库数据时，首先引入仓库方法，并执行该方法

```
import { useCounterStore } from '@/store/userCounterStore'
const store = useCounterStore() //拿到仓库
```

#### 在组件中使用仓库数据时，如果是要获取数据，为了保持数据的响应式，应该使用 storeToRefs 方法

```
import { storeToRefs } from 'pinia'
const { num, doubleCount } = storeToRefs(store)
```

#### 如果是获取方法，直接从 store 里面解构出来

```
//从仓库将方法解构出来,方法不需要storeToRefs
const { increment, asynIncrement, asyncDecrement } = store
```

#### 另外，仓库还提供了两个好用的 api:

```
store.$reset: 重置state
store.$patch: 变更state
```
