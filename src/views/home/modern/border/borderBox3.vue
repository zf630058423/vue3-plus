<template>
  <div class="border-box3">
    <!-- 标题角标 -->
    <div class="box3">
      <ul>
        <li>你真的很帅</li>
        <li>你真的很帅2</li>
        <li>你真的很帅3</li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.box3 li {
  width: 300px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  position: relative;
  margin: 8px 0;
}

.box3 li::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 0 0 100% 0;
  background-color: #fac;
  line-height: normal;
  color: #fff;
}

.box3 li:nth-of-type(1)::before {
  content: '1';
  line-height: 30px;
}
.box3 li:nth-of-type(2)::before {
  content: '2';
  line-height: 30px;
}
.box3 li:nth-of-type(3)::before {
  content: '3';
  line-height: 30px;
}
</style>
