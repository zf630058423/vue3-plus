<template>
  <div class="item" ref="chinaChartRef"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import chinaGeojson from './chinaGeojson.json'
import user from './user.json'

const chinaChartRef = ref(null)

onMounted(async () => {
  const myChart = echarts.init(chinaChartRef.value)
  myChart.showLoading()
  echarts.registerMap('China', chinaGeojson)

  const option = {
    // ECharts 配置项
    title: {
      text: 'ECharts 用户地图', //图表标题
    },
    tooltip: { formatter: '{b} 注册用户{c}人' }, //配置了该项，则鼠标移动上去后会有提示
    visualMap: {
      //虚拟地图，一般用户设置不同颜色来展现数据的差异
      left: 'right', //虚拟地图显示的位置
      min: 0, //区间的最小值
      max: 10000, //区间数据的最大值
      text: ['高', '低'], //文本，默认为数值文本
      calculable: true, //是否允许控制区间
    },
    series: [
      {
        type: 'map', //类型： 地图
        map: 'China', //使用注册的地图
        roam: true, //是否开启鼠标缩放和平移漫游
        scaleLimit: {
          //缩放比例控制
          min: 0.7, //最小缩放到0.7
          max: 3, //最大缩放到3倍
        },
        data: user,
        // data: users.data,
      },
    ],
  }

  myChart.setOption(option)

  myChart.hideLoading()
})
</script>
<style lang="scss" scoped>
.item {
  background: #eee;
  width: 500px;
  height: 400px;
}
</style>
