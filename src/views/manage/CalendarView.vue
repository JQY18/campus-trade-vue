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
          
          <div id="main" ref="main" style="width: 800px; height: 600px;"></div>
        </div>
      </el-main>
    </el-container>
  </template>
  
  <script>
import * as echarts from 'echarts';

export default {
  name: 'EChartsCalendarExample',
  data() {
    return {
      myChart: null,
      option: {
        tooltip: {
          position: 'top'
        },
        visualMap: [
          {
            min: 0,
            max: 1000,
            calculable: true,
            seriesIndex: [2, 3, 4],
            orient: 'horizontal',
            left: '55%',
            bottom: 20
          },
          {
            min: 0,
            max: 1000,
            inRange: {
              color: ['grey'],
              opacity: [0, 0.3]
            },
            controller: {
              inRange: {
                opacity: [0.3, 0.6]
              },
              outOfRange: {
                color: '#ccc'
              }
            },
            seriesIndex: [1],
            orient: 'horizontal',
            left: '10%',
            bottom: 20
          }
        ],
        calendar: [
          {
            orient: 'vertical',
            yearLabel: {
              margin: 40
            },
            monthLabel: {
              nameMap: 'cn',
              margin: 20
            },
            dayLabel: {
              firstDay: 1,
              nameMap: 'cn'
            },
            cellSize: 40,
            range: '2017-02'
          },
          {
            orient: 'vertical',
            yearLabel: {
              margin: 40
            },
            monthLabel: {
              margin: 20
            },
            cellSize: 40,
            left: 460,
            range: '2017-01'
          },
          {
            orient: 'vertical',
            yearLabel: {
              margin: 40
            },
            monthLabel: {
              margin: 20
            },
            cellSize: 40,
            top: 350,
            range: '2017-03'
          },
          {
            orient: 'vertical',
            yearLabel: {
              margin: 40
            },
            dayLabel: {
              firstDay: 1,
              nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            },
            monthLabel: {
              nameMap: 'cn',
              margin: 20
            },
            cellSize: 40,
            top: 350,
            left: 460,
            range: '2017-04'
          }
        ],
        series: [
          {
            type: 'graph',
            edgeSymbol: ['none', 'arrow'],
            coordinateSystem: 'calendar',
            links: this.links,
            symbolSize: 10,
            calendarIndex: 0,
            data: this.graphData
          },
          {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: this.getVirtualData('2017')
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'calendar',
            calendarIndex: 1,
            symbolSize: function (val) {
              return val[1] / 40;
            },
            data: this.getVirtualData('2017')
          },
          {
            type: 'scatter',
            coordinateSystem: 'calendar',
            calendarIndex: 2,
            symbolSize: function (val) {
              return val[1] / 60;
            },
            data: this.getVirtualData('2017')
          },
          {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 3,
            data: this.getVirtualData('2017')
          }
        ]
      }
    };
  },
  methods: {
    goTo(name) {
      this.$router.push({ name: name }).catch((err) => {
        err;
      });
    },
    getVirtualData(year) {
      const date = +echarts.time.parse(year + '-01-01');
      const end = +echarts.time.parse(+year + 1 + '-01-01');
      const dayTime = 3600 * 24 * 1000;
      const data = [];
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          Math.floor(Math.random() * 1000)
        ]);
      }
      return data;
    }
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
/* Optional: Add any custom styles for your chart container */
#main {
  width: 100%;
  height: 600px; /* Adjust height as needed */
}
</style>