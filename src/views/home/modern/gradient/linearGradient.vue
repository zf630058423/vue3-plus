<template>
  <div class="container">
    <h5>设置文字随背景渐变</h5>
    <div class="box">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam eos quisquam et
    </div>
    <h5>重复渐变</h5>
    <div class="box1"></div>
    <!-- 边框渐变 -->
    <h5>边框渐变</h5>
    <div class="box2"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
/***
一、线性渐变 linear-gradient
基本语法： linear-gradient(渐变方向，颜色1，颜色2，变化区间，。。。，颜色n变化区间)
渐变方向： to+方向(top,bottom,right,left), to left, to top, to top left, to left top
角度： 50deg
默认值： 自上而下， to bottom, 180deg
变化区间(渐变断点)：
一个值：作为颜色变化的边界
两个值：作为区间的开始以及终止
重复线性渐变： repeating-linear-gradient();
注意： 渐变区间的大小指的是渐变方向的大小
element{
  backgournd-image: linear-gradient(45deg, #fff 100px, skyblue 100px 200px, #fff 200px)
}
二、径向渐变 radial-gradient
基本语法： radial-gradient(形状 半径大小 at 原点位置，渐变颜色1 边界， 渐变颜色2 边界，。。。。，渐变颜色n, 边界n)
位置： at+background-postion的属性值
       at+关键字  center(默认值) to left right bottom 可组合 at left at left top
三、
*/

h5 {
  margin: 8px 0 4px 0;
}

//设置文字随背景渐变
.box {
  width: 300px;
  height: 200px;
  border: 2px solid #fac;
  background-image: linear-gradient(to right, #ffffff, #6dd5fa, #2980b9);
  -webkit-background-clip: text;
  color: transparent;
}

//重复渐变
.box1 {
  margin: 8px 0;
  border: 1px solid;
  width: 300px;
  height: 200px;
  //渐变 从0到10px是白色  10px到20px是蓝色  重复
  // background-image: repeating-linear-gradient(#fff 0 10px, skyblue 10px 20px);

  //网格样式
  background-image: repeating-linear-gradient(transparent 0 10px, skyblue 10px 20px),
    repeating-linear-gradient(90deg, #fac 0 10px, transparent 10px 20px);
}

.box2 {
  width: 300px;
  height: 150px;
  border: 10px solid;
  border-image: repeating-linear-gradient(45deg, transparent 0 10px, skyblue 10px 20px) 20;
}
</style>
