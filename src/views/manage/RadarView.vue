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
            >用户热点分布图</el-menu-item
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
        <div id="main" ref="main" style="width: 720px; height: 640px"></div>
      </div>
    </el-main>
  </el-container>
</template>
  
  
  <script>
import * as echarts from "echarts";
import request from "@/utils/axiosInstance";

export default {
  name: "EChartsRadarExample",
  data() {
    return {
      myChart: null,
      option: {
        title: {
          text: "不同性别用户的购物倾向 ",
        },
        legend: {
          data: ["女", "男"],
        },
        radar: {
          indicator: [
            { name: "学习资料", max: 6500 },
            { name: "运动装备", max: 16000 },
            { name: "文具手帐", max: 30000 },
            { name: "宿舍好物", max: 38000 },
            { name: "交通工具", max: 52000 },
            { name: "课外书籍", max: 25000 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              { value: [5000, 3000, 28000, 35000, 42000, 18000], name: "女" },
              { value: [4200, 14000, 20000, 26000, 42000, 21000], name: "男" },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.main);
    if (this.option && typeof this.option === "object") {
      this.myChart.setOption(this.option);
    }
  },
  methods: {
    goTo(name) {
      this.$router.push({ name: name }).catch((err) => {
        err;
      });
    },
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
  },
  created() {
    this.getAdminId();
  },
};
</script>
  
  <style>
/* Optional: Add any custom styles for your chart container */
#main {
  width: 100%;
  height: 400px; /* Adjust height as needed */
}
</style>
  