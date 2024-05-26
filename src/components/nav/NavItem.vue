<template>
  <!-- 无子集 -->
  <el-menu-item :index="props.basePath" v-if="!item.children">
    <!-- <i class="el-icon-menu"></i> -->
    <Zf-Icon icon="fa-list" />
    <span class="title">{{ props.item.name }}</span>
  </el-menu-item>
  <!-- 有子集 -->
  <el-sub-menu :index="props.basePath" v-else>
    <template #title>
      <!-- <i class="el-icon-menu"></i> -->
      <Zf-Icon icon="fa-navicon" />
      <span class="title">{{ props.item.name }}</span>
    </template>
    <NavItem v-for="sub in props.item.children" :key="sub.url" :basePath="sub.url" :item="sub" />
  </el-sub-menu>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
  },
  basePath: {
    type: String,
  },
})
</script>
<style lang="scss" scoped>
.el-submenu {
  text-align: left;
}
.el-menu-item {
  text-align: left;
  height: 46px;
  line-height: 46px;
}
.title {
  padding-left: 8px;
}
:deep(.el-sub-menu__title) {
  height: 46px;
  line-height: 46px;
}
</style>
