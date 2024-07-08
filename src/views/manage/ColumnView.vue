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
    name: 'WeeklyBarChart',  // 更具描述性的多单词组件名称
    data() {
      return {
        myChart: null,
        option: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
        }
      };
    },
    methods:{
      goTo(name) {
      this.$router.push({ name: name }).catch((err) => {
        err;
      });
    },
    },
    mounted() {
      this.myChart = echarts.init(this.$refs.main);
      if (this.option && typeof this.option === 'object') {
        this.myChart.setOption(this.option);
      }
    }
  };
  </script>
  
  <style>
  #main {
    width: 100%;
    height: 100%;
  }
  </style>
  
  