<template>
  <div class="item" ref="pieChartRef"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const pieChartRef = ref(null)

onMounted(() => {
  const myChart = echarts.init(pieChartRef.value)

  const option = {
    // ECharts 配置项
    title: {
      text: 'ECharts 饼图', //图表标题
    },
    tooltip: {}, //配置了该项，则鼠标移动上去后会有提示
    legend: {
      //配置图例
      data: ['视频广告', '联盟广告'],
    },
    series: [
      {
        name: '访问来源',
        type: 'pie', //类型： 饼图
        radius: '50%', //圆半径：最大半径的50%
        roseType: 'radius', //南丁格尔图的类型，若不设置此项，则为普通饼图
        //数据配置
        data: [
          { value: 235, name: '视频广告' },
          { value: 274, name: '联盟广告' },
          { value: 310, name: '邮件营销' },
          { value: 335, name: '直接访问' },
          { value: 400, name: '搜索引擎' },
        ],
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
