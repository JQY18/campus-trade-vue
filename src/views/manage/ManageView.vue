<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1" @click="goTo('line')">选项1</el-menu-item>
          <el-menu-item index="2-2" @click="goTo('column')">选项2</el-menu-item>
          <el-menu-item index="2-3" @click="goTo('manage')">选项3</el-menu-item>
          <el-menu-item index="2-4" @click="goTo('radar')">选项4</el-menu-item>
          <el-menu-item index="2-5" @click="goTo('calendar')">选项5</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <div>
        
        <div id="pieChart" style="width: 600px; height: 400px;"></div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import * as echarts from 'echarts';

export default {
  mounted() {
    this.renderPieChart();
  },
  methods: {
    goTo(name) {
      this.$router.push({ name: name }).catch((err) => {
        err;
      });
    },
    
    renderPieChart() {
      var chartDom = document.getElementById('pieChart');
      var myChart = echarts.init(chartDom);

      var option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      };

      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
/* 可选的样式 */
</style>