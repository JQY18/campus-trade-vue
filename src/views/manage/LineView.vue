<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1" disabled>处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">数据统计</template>
          <el-menu-item index="2-1" @click="goTo('line')"
            >日增用户数量</el-menu-item
          >
          <el-menu-item index="2-2" @click="goTo('column')"
            >每日帖子发布数量</el-menu-item
          >
          <el-menu-item index="2-3" @click="goTo('manage')"
            >用户占比分布</el-menu-item
          >
          <el-menu-item index="2-4" @click="goTo('radar')"
            >用户个性化倾向</el-menu-item
          >
          <el-menu-item index="2-5" @click="goTo('calendar')"
            >每月用户热点分布图</el-menu-item
          >
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4" disabled
          ><a href="https://www.ele.me" target="_blank"
            >订单管理</a
          ></el-menu-item
        >
      </el-menu>
    </el-header>
    <el-main>
      <div>
        <h1>日增用户数量</h1>

        <div id="main" style="width: 730px; height: 500px"></div>
      </div>
    </el-main>
  </el-container>
</template>
  
  
  <script>
import * as echarts from "echarts";
import request from "@/utils/axiosInstance";

export default {
  mounted() {
    this.renderChart();
  },
  created() {
    this.getAdminId();
  },
  methods: {
    getAdminId() {
      request
        .get("/admin/authentic")
        .then((res) => {
          if (res.data.code === 0) {
            this.$router.replace({ name: "managelogin" });
          }
        })
        .catch((err) => {
          console.info(err);
        });
    },
    renderChart() {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);

      var option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };

      option && myChart.setOption(option);
    },
    goTo(name) {
      this.$router.push({ name: name }).catch((err) => {
        err;
      });
    },
  },
};
</script>
  
  <style scoped>
/* 可选的样式 */
</style>
  