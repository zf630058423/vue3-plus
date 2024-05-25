<template>
  <div class="border-box4">
    <div class="box4"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.box4 {
  width: 200px;
  height: 200px;
  position: relative;
}

.box4::before {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  border-top: 2px solid #fac;
  border-left: 2px solid #fca;
  border-right: 2px solid #caf;
  border-bottom: 2px solid #cfa;
  border-radius: 0 100% 0 100%;
}

.box4::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  border-top: 2px solid #fac;
  border-left: 2px solid #fca;
  border-right: 2px solid #caf;
  border-bottom: 2px solid #cfa;
  border-radius: 100% 0 100% 0;
}
</style>
