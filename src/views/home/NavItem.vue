<template>
  <!-- 无子集 -->
  <el-menu-item :index="props.basePath" v-if="!item.children">
    <el-icon></el-icon>
    <span>{{ props.item.title }}</span>
  </el-menu-item>
  <!-- 有子集 -->
  <el-sub-menu :index="props.basePath" v-else>
    <template #title>
      <el-icon></el-icon>
      <span>{{ props.item.title }}</span>
    </template>
    <NavItem v-for="sub in props.item.children" :key="sub.url" :basePath="sub.url" :item="sub" />
  </el-sub-menu>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  item: {
    type: Object,
  },
  basePath: {
    type: String,
  },
})
</script>
