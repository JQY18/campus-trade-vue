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
          <div id="main" ref="main" style="width: 600px; height: 400px;"></div>
          
        </div>
      </el-main>
    </el-container>
  </template>
  
  
  <script>
import * as echarts from 'echarts';

export default {
  name: 'EChartsRadarExample',
  data() {
    return {
      myChart: null,
      option: {
        title: {
          text: 'Basic Radar Chart'
        },
        legend: {
          data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
          indicator: [
            { name: 'Sales', max: 6500 },
            { name: 'Administration', max: 16000 },
            { name: 'Information Technology', max: 30000 },
            { name: 'Customer Support', max: 38000 },
            { name: 'Development', max: 52000 },
            { name: 'Marketing', max: 25000 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              { value: [4200, 3000, 20000, 35000, 50000, 18000], name: 'Allocated Budget' },
              { value: [5000, 14000, 28000, 26000, 42000, 21000], name: 'Actual Spending' }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.main);
    if (this.option && typeof this.option === 'object') {
      this.myChart.setOption(this.option);
    }
  },
  methods: {
    goTo(name) {
      this.$router.push({ name: name }).catch((err) => {
        err;
      });
    },
  }
};
</script>
  
  <style>
  /* Optional: Add any custom styles for your chart container */
  #main {
    width: 100%;
    height: 400px; /* Adjust height as needed */
  }
  </style>
  