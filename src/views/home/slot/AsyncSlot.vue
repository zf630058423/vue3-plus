<template>
  <!-- 作用域插槽 -->
  <div id="contentSlot">
    <!-- 3中情况 -->
    <!-- 情况1：正在加载中 -->
    <!-- 情况2：显示内容 -->
    <!-- 情况3：相识错误 -->
    <AsyncContent :contentPromise="fetchProducts()">
      <template #loading>加载中...</template>
      <template v-slot:default="{ content }">
        <ul>
          <li v-for="item in content" :key="item.id">
            商品：{{ item.name }} 库存：{{ item.stock }}
          </li>
        </ul>
      </template>
      <template v-slot:error="{ error }">
        <p style="color: red">{{ error.message }}</p>
      </template>
    </AsyncContent>
  </div>
</template>
<script setup>
import AsyncContent from './compontent/AsyncContent.vue'

//ajax模拟函数
const getProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve([
          { id: 1, name: 'xiaomi', stock: 50 },
          { id: 2, name: 'iphone', stock: 70 },
          { id: 3, name: 'huawei', stock: 60 },
        ])
      } else {
        reject(new Error('not found'))
      }
    }, 1000)
  })
}

const fetchProducts = async () => {
  return await getProducts()
}
</script>
