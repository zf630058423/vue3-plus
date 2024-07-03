<template>
  <div class="content_overflow">
    <RowLayout title="折线图" remark="" :source="lineChartCode">
      <LineChart></LineChart>
    </RowLayout>
    <RowLayout title="柱状图" remark="" :source="barEchartsCode">
      <BarChart></BarChart>
    </RowLayout>
    <RowLayout title="饼图" remark="" :source="pieChartCode">
      <PieChart></PieChart>
    </RowLayout>
    <RowLayout title="K线图(蜡烛图)" remark="" :source="kChartCode">
      <KChart></KChart>
    </RowLayout>
    <RowLayout title="用户地图" remark="" :source="chinaEchartCode">
      <ChinaChart></ChinaChart>
    </RowLayout>
  </div>
</template>
<script setup>
import RowLayout from '@/layouts/rowLayout/index.vue'
import LineChart from './compontent/lineEcharts.vue'
import lineChartCode from './compontent/lineEcharts.vue?raw'

import BarChart from './compontent/barEcharts.vue'
import barEchartsCode from './compontent/barEcharts.vue?raw'

import PieChart from './compontent/pieEcharts.vue'
import pieChartCode from './compontent/pieEcharts.vue?raw'

import KChart from './compontent/kEcharts.vue'
import kChartCode from './compontent/kEcharts.vue?raw'

import ChinaChart from './compontent/chinaEcharts.vue'
import chinaEchartCode from './compontent/chinaEcharts.vue?raw'
</script>
