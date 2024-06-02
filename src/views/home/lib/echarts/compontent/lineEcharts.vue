<template>
  <div class="item" ref="lineChartRef"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const lineChartRef = ref(null)

onMounted(() => {
  const myChart = echarts.init(lineChartRef.value)

  const option = {
    // ECharts 配置项
    title: {
      text: 'ECharts 折线图', //图表标题
    },
    tooltip: {}, //配置了该项，则鼠标移动上去后会有提示
    legend: {
      //配置图例
      data: ['手机销量', '平板销量'],
    },
    xAxis: {
      //配置横坐标
      data: Array(12)
        .fill(0)
        .map((it, i) => `${i + 1}月`),
      // data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {}, //纵坐标让其自动生成
    series: [
      {
        name: '手机销量',
        type: 'line', //类型： 线图
        //数据配置
        data: Array(12)
          .fill(0)
          .map(() => Math.floor(Math.random() * 1000 + 300)),
        // smooth:true,  //添加此项可以让曲线变得平滑
      },
      {
        name: '平板销量',
        type: 'line', //类型： 线图
        //数据配置
        data: Array(12)
          .fill(0)
          .map(() => Math.floor(Math.random() * 1000 + 300)),
        smooth: true, //添加此项可以让曲线变得平滑
      },
    ],
  }

  myChart.setOption(option)
})
</script>
<style lang="scss" scoped>
.item {
  background: #eee;
  width: 500px;
  height: 400px;
}
</style>
