<template>
  <div class="border-radius">
    <div class="box"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: #fac;
  border-radius: 50%;
  // margin: 上右下左
  // border-radius: 左上、右上、右下、左下
  // border-top-left-radius: 30px;  //左上
  // border-top-left-radius: 30px 40px;  //水平半径 垂直半径
}
</style>
