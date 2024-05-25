<template>
  <div class="container">
    <h5>锥形渐变</h5>
    <div class="box"></div>

    <h5>锥形渐变 棋格</h5>
    <div class="box1"></div>

    <h5>锥形渐变 转向盘</h5>
    <div class="box2"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
/***
三、锥形渐变 conic-gradient
基本语法： conic-gradient(from 起始角度 at 中心位置， 角渐变断点)
角渐变断点：只需要提供角度就可以
*/

h5 {
  margin: 16px 0 4px 0;
}

//设置文字随背景渐变
.box {
  width: 300px;
  height: 300px;
  // 原点： 位置 同 background-position;
  // background-image: conic-gradient(at top left, red, green, blue);
  // 起始角度： from + 角度
  background-image: conic-gradient(from 45deg at center, red, green, blue);
  border-radius: 50%;
}

.box1 {
  width: 300px;
  height: 300px;
  background-size: 40px 40px;
  // background-repeat: no-repeat;
  background-image: conic-gradient(
    #fff 0 90deg,
    #000 90deg 180deg,
    #fff 180deg 270deg,
    #000 270deg 360deg
  );
}

//转向盘
.box2 {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-image: conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f00);
}
</style>
