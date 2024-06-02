<template>
  <div class="item" ref="kChartRef"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const kChartRef = ref(null)

onMounted(() => {
  const myChart = echarts.init(kChartRef.value)

  const option = {
    // ECharts 配置项
    title: {
      text: 'ECharts K线图(蜡烛图)', //图表标题
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
        type: 'k', //类型： k线图
        //数据配置
        data: [
          //每个数组为一根k线，数值含义为[开盘价，收盘价，最高价，最低价]
          [20, 34, 38, 10],
          [34, 35, 50, 30],
          [35, 38, 44, 33],
          [38, 33, 40, 30],
          [33, 27, 32, 22],
          [26, 27, 28, 25],
          [27, 33, 34, 32],
          [33, 37, 44, 32],
          [37, 30, 39, 28],
          [30, 26, 28, 25],
        ],
        encode: {
          //设置提示对应的dimensions索引
          tooltip: [1, 2, 3, 4],
        },
        //设置五个维度的名称
        //含义分别为 日期、开盘价、收盘价、最高价、最低价
        dimensions: [null, '开盘价', '收盘价', '最高价', '最低价'],
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
