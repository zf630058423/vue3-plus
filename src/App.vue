<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <el-button type="primary">Primary</el-button>
    <div class="wrapper">
      <Zf-Icon icon="user"/>
      <Zf-Icon icon="user-secret" size="xl"/>
      <Zf-Icon icon="user-secret" size="xl" type="primary"/>
      <Zf-Icon icon="user-secret" size="xl" type="primary" color="skyblue"/>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <!-- <RouterView /> -->
  <router-view></router-view>
</template>

<style scoped></style>
