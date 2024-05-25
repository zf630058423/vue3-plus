<template>
  <div class="border-box1">
    <!-- 异形头像 -->
    <div class="box1"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.box1 {
  width: 100px;
  height: 100px;
  border-radius: 39% 61% 70% 30% / 41% 30% 70% 59%;
  background-image: url('@/assets/border/wechat.jpg');
  background-size: cover;
}
</style>
