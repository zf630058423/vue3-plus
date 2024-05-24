<template>
  <el-aside width="200px" class="aside">
    <el-menu :default-active="route.path" exact class="el-menu-vertical-demo" router>
      <!-- 无子集 -->
      <!-- <el-menu-item :index="v.url" v-for="v in navData" :key="v.url">
        <el-icon></el-icon>
        <span>{{ v.title }}</span>
      </el-menu-item> -->
      <!-- 有子集 -->
      <!-- <el-sub-menu index="">
        <template #title>
          <el-icon></el-icon>
          <span>item</span>
        </template>
        <el-menu-item index="">
          <el-icon></el-icon>
          <span>item one</span>
        </el-menu-item>
      </el-sub-menu> -->
      <NavItem v-for="v in navData" :key="v.url" :basePath="v.url" :item="v" />
    </el-menu>
  </el-aside>
</template>
<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NavItem from './NavItem.vue'

const router = useRouter()
const route = useRoute()

const navData = reactive([
  { title: '首页', url: '/index' },
  { title: '统计管理', url: '/census' },
  {
    title: '订单管理',
    url: '/order',
    children: [{ title: '列表管理', url: '/order/list' }],
  },
  {
    title: '用户管理',
    url: '/user',
    children: [
      { title: '用户统计', url: '/user/stats' },
      { title: '角色统计', url: '/user/role' },
    ],
  },
])
</script>
