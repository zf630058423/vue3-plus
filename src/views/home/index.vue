<template>
  <div id="module">
    <el-container>
      <!-- <el-aside width="200px">Aside</el-aside> -->
      <!-- 左侧导航 -->
      <NavMenu />
      <!-- 右侧主题 -->
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <RouterView />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavMenu from './navMenu.vue'

const title = ref('首页')
</script>
