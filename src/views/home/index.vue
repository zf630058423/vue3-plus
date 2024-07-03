<template>
  <el-container>
    <!-- 左侧导航 -->
    <NavMenu />
    <!-- 右侧主体 -->
    <el-container>
      <el-header>
        <!-- 面包屑 -->
        <Breadcrumb />
        <!-- 退出按钮 -->
        <!-- <el-button class="exit" type="primary" @click="goBack()">退出</el-button> -->
        <RightHeader />
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import NavMenu from '@/layouts/nav/navMenu.vue'
import RightHeader from '@/layouts/header/rightHeader.vue'
import Breadcrumb from '@/layouts/breadCrumb/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const title = ref('首页')

const goBack = () => {
  router.push('/login')
}
</script>
<style lang="scss" scoped>
:deep(.el-header) {
  background: #cedff5;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-header,
.el-footer {
  background: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  overflow: hidden;
  padding: 8px;
  height: calc(100% - 120px);
}

.container-content {
  margin-bottom: 0;
  height: calc(100% - 60px);
}
</style>
