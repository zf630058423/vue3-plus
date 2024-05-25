<template>
  <div class="container">
    <h5>径向渐变</h5>
    <div class="box"></div>

    <h5>实心圆径向渐变</h5>
    <div class="box1"></div>

    <h5>重复径向渐变</h5>
    <div class="box2"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
/***
二、径向渐变 radial-gradient
基本语法： radial-gradient(形状 半径大小 at 原点位置，渐变颜色1 边界， 渐变颜色2 边界，。。。。，渐变颜色n, 边界n)
位置： at+background-postion的属性值
       at+关键字  center(默认值) to left right bottom, 可组合 at left at left top
       at+位置：at 0 0,at left 0 top 20px
形状：circle, ellipse
半径大小：
一个值：以圆的方式
两个值：以椭圆的方式
重复径向渐变： repeating-radial-gradient();
三、锥形渐变
*/

h5 {
  margin: 8px 0 4px 0;
}

//设置文字随背景渐变
.box {
  width: 300px;
  height: 300px;
  // background-image: radial-gradient(red, blue);  //默认中心圆渐变
  // background-image: radial-gradient(at left top, red, blue); //右上
  background-image: radial-gradient(50px circle at center, red, blue); //径向渐变 半径50像素
  // 圆心：位置
  // 半径：渐变半径
  // 形状： 圆形  椭圆
}

.box1 {
  width: 300px;
  height: 100px;
  background-image: radial-gradient(
    closest-side at left 30px top 50px,
    red 0 10px,
    blue 10px 20px,
    green 20px
  );
}

.box2 {
  width: 300px;
  height: 300px;
  background-image: repeating-radial-gradient(skyblue 0 10px, #fff 10px 20px);
}
</style>
