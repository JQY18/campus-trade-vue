<template>
    <div id="main" style="width: 600px;height:400px;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        // 基于准备好的dom，初始化echarts实例
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
  
        // 指定图表的配置项和数据
        var option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
            }
          ]
        };
  
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    }
  };
  </script>
  
  <style scoped>
  /* 可选的样式 */
  </style>
  