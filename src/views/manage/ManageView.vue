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
      <div id="main" ref="main" style="width: 900px; height: 600px"></div>
    </el-main>
  </el-container>
</template>

<script>
import * as echarts from "echarts";
import request from "@/utils/axiosInstance";

export default {
  data() {
    return {
      activeIndex: "2-1", // 设置默认激活项
      option: null, // 定义 option 对象
    };
  },
  mounted() {
    this.renderPieChart(); // 初始化图表
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
    goTo(name) {
      this.$router.push({ name: name }).catch((err) => {
        console.error(err);
      });
    },
    renderPieChart() {
      this.myChart = echarts.init(this.$refs.main);
      this.option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "湖南师大" },
              { value: 735, name: "中南" },
              { value: 580, name: "湖大" },
              { value: 484, name: "长沙理工" },
              { value: 300, name: "师大附中" },
            ],
          },
        ],
      };
      this.myChart.setOption(this.option);
    },
  },
};
</script>

<style scoped>
#main {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
</style>
