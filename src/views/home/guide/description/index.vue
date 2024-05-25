<template>
  <div class="descript-com">
    <h3>项目简介说明</h3>
    <h5>本项目仅供自己学习参考使用</h5>
    <div class="descript_content">
      <p>
        集成了ElementUI组件库，目前支持除table外的所有Element系列组件，使用方式几乎跟Element一样，因此这部分你完全可以参照
        <a target="_blank" href="https://element.eleme.cn/#/zh-CN/component/installation"
          >ElementUI官网</a
        >
      </p>
      <p>
        集成了css样式预处理器sass，可以参照
        <a href="https://www.sass.hk/" target="_blank">Sass中文网</a>
      </p>
      <p>
        集成了ECharts插件，可以参照
        <a href="https://echarts.apache.org/">ECharts官网</a>
      </p>
      <p class="p-tip">
        此项目目的方便以后开发的查阅和使用：<br />
        <span>1、组件分基本组件(常用组件)、高级组件，整合组件的可靠性、复用性；</span>
        <span>2、常用的类库，共用性；</span>
        <span>3、一些公共函数：常用普通函数、高阶函数、函数柯里化；</span>
        <span>4、数据结构、算法等等。</span>
      </p>
      <p>
        扩展的组件，都来源于曾经公司已有的项目中，只有可复用性的才有组件化的必要。这部分的演示demo和API，在本网站中查阅即可，此项目还在开发阶段，文档有不完善的地方，你有任何宝贵的建议都可以向本人提出。
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.descript-com {
  text-align: left;

  h5 {
    margin: 8px 0;
  }

  .descript_content {
    margin: 32px 8px;

    p {
      margin: 8px 0;
    }

    .p-tip {
      margin-top: 16px;

      span {
        display: block;
        margin: 8px 0;
      }
    }
  }
}
</style>
