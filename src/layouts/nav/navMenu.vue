<template>
  <el-aside width="200px" class="aside">
    <el-menu :default-active="route.path" exact class="el-menu-vertical-demo" router>
      <NavItem v-for="v in navData" :key="v.url" :basePath="v.url" :item="v" />
    </el-menu>
  </el-aside>
</template>
<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NavItem from './NavItem.vue'
import { menuList } from '../navMenuList'
const router = useRouter()
const route = useRoute()
const navData = reactive(menuList)
</script>
<style lang="scss" scoped>
.el-menu {
  height: 100%;
}
</style>
