<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="v in lists" :key="v.path">
        <router-link :to="v.path">{{ v.meta.title }}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const lists = ref([]) //路由的数据

//路由监听
watch(route, (to, from) => {
  getBreadcrumb(to.matched)
})

onMounted(() => {
  getBreadcrumb(route.matched)
})

const getBreadcrumb = (matched) => {
  // if (matched.length && matched[1].name === 'index') {
  //   matched = [{ path: '/home', name: 'home', met: { title: '首页' } }]
  // }
  lists.value = matched
}
</script>
