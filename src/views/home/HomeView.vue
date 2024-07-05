<template>
  <el-container>
    <el-aside>
      <!-- 侧边导航菜单 -->
      <el-row class="tac">
        <el-col :span="12">
          <img :src="require('@/assets/logo3.png')" />
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template v-slot:title>
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template v-slot:title>分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template v-slot:title>选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <template v-slot:title>
                <span>导航二</span>
              </template>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <template v-slot:title>
                <span>导航三</span>
              </template>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <template v-slot:title>
                <span>导航四</span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>

    <!-- 主体部分 -->
    <el-container>
      <el-header style="height: 120px">
        <!-- 头部搜索框 -->
        <!-- <el-aside>
       <img :src="require('@/assets/logo3.png')" />
      </el-aside>
      <el-main> -->
        <div class="group">
          <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
            <g>
              <path
                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
              ></path>
            </g>
          </svg>
          <input class="input" type="search" placeholder="Search" />
        </div>
        <router-link :to="isLogin ? '/login' : 'mine'">
          <button @click="isLogin">
            <img
              :src="require('@/assets/用户.png')"
              style="width: 20px; height: 20px"
            />
          </button>
        </router-link>
        <router-link :to="{ name: 'login' }">
          <button>登录</button>
        </router-link>
        <!-- <router-link :to="{name:'login'}">登录</router-link> -->
        <!-- <router-link :to="{name:'login'}">登录</router-link> -->
        <!-- <router-link :to="{name:'login'}">登录</router-link> -->
      </el-header>
      <el-main>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(image, index) in images" :key="index">
        <div class="card-container">
          <el-card :body-style="{ padding: '0px', margin: '10px' }">
            <img :src="getImagePath(image)" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      input: "",
      images: [
        "Boghossian Kissing Air 帕拉伊巴钻石珠宝套装 (2).jpg",
        "Boucheron Chromatique 花朵珠宝套装 (1).jpg",
        "Boucheron Chromatique 花朵珠宝套装 (3).jpg",
        "Chopard Floral 黑欧泊戒指.jpg",
        "Dior Dentelle Satin Émeraude 祖母绿戒指.jpg",
        "Van Cleef & Arpels 梵克雅宝 Panache Mystérieux 白金胸针.jpg",
        "Van Cleef & Arpels 梵克雅宝 Secret des Amoureux 胸针.jpg",
      ],
      currentDate: new Date(),
      isLogin: false,
    };
  },
  mounted() {},
  methods: {
    getImagePath(image) {
      // 使用 require 动态加载图片
      return require(`@/assets/${image}`);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style>
.card {
  margin-bottom: 50px;
}
.card2 {
  margin-bottom: 50px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.group {
  display: flex;
  line-height: 40px;
  align-items: center;
  position: relative;
  max-width: 490px;
}

.input {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 1rem;
  padding-left: 2.5rem;
  border: 2px solid transparent;
  margin-top: 50px;
  border-radius: 8px;
  outline: none;
  background-color: #f3f3f4;
  color: #0d0c22;
  transition: 0.3s ease;
}

.input::placeholder {
  color: #9e9ea7;
}

.input:focus,
input:hover {
  outline: none;
  border-color: rgba(0, 48, 73, 0.4);
  background-color: #fff;
  box-shadow: 0 0 0 4px rgb(0 48 73 / 10%);
}

.icon {
  margin-top: 50px;
  position: absolute;
  left: 1rem;
  fill: #9e9ea7;
  width: 1rem;
  height: 1rem;
}

button {
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  float: right;
}

button:hover {
  background-color: #23c483;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

button:active {
  transform: translateY(-1px);
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.card {
  margin-top: 20px;
  width: 190px;
  height: 254px;
  border-radius: 20px;
  transition: all 0.3s;
}

.card2 {
  width: 190px;
  height: 254px;
  border-radius: 20%;
  transition: all 0.2s;
}

.card2:hover {
  transform: scale(0.98);
  border-radius: 20px;
}

.card:hover {
  box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.3);
}
</style>