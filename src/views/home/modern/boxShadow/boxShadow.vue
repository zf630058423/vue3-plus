<template>
  <div class="container">
    <div class="water"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
// box-shadow: 内边距(inset) 水平偏移量 垂直偏移量 模糊半径  扩张半径;
.container {
  width: 300px;
  height: 300px;
  // background-color: aqua;
}
.water {
  margin: 50px auto;
  width: 200px;
  height: 200px;
  background-color: #afc;
  border-radius: 34% 66% 70% 30% / 30% 30% 70% 70%;
  box-shadow: inset 10px 10px 20px rgb(0, 0, 0, 0.2),
    inset -20px -20px 20px rgba(255, 255, 255, 0.5), 10px 10px 15px rgba(0, 0, 0, 0.3);
  position: relative;
}

.water::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 44% 56% 52% 48% / 43% 38% 62% 57%;
  top: 20%;
  left: 40%;
}

.water::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #fff;
  border-radius: 44% 56% 52% 48% / 43% 38% 62% 57%;
  top: 40%;
  left: 30%;
}
</style>
