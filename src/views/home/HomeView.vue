<template>
  <el-container>
    <el-aside>
      <!-- 侧边导航菜单 -->
      <el-row class="tac">
        <el-col :span="8">
          <img :src="require('@/assets/logo3.png')" />
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="1" @click="goTo('home')">
              <i class="el-icon-menu"></i>
              <template v-slot:title>
                <span>发现</span>
              </template>
            </el-menu-item>
            

            <el-menu-item index="3" @click="goTo('publish')">
              <i class="el-icon-document"></i>
              <template v-slot:title>
                <span>发布</span>
              </template>
            </el-menu-item>

            <el-menu-item index="4" @click="goTo('judge')">
              <i class="el-icon-setting"></i>
              <template v-slot:title>
                <span>作者</span>
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
        <div style="margin-top: 15px; width: 600px;">
  <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="餐厅名" value="1"></el-option>
      <el-option label="订单号" value="2"></el-option>
      <el-option label="用户电话" value="3"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
</div>

        <router-link :to="!isLogin ? '/mine' : '/login'">
          <button class="userbtn">
            <img
              :src="require('@/assets/用户.png')"
              style="width: 20px; height: 20px"
            />
          </button>
        </router-link>

        <router-link v-if="!isLogin" :to="{ name: 'login' }">
          <button class="loginbtn">登录</button>
        </router-link>
      </el-header>

      <el-main>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in dataList" :key="index">
            <div class="card-container">
              <el-card
                :body-style="{ padding: '0px', margin: '10px' }"
                shadow="hover"
                class="rounded-card"
              >
                <img :src="item.images[0]" class="image" />
                <div style="padding: 14px">
                  <span>{{ item.title }}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ item.createTime }}</time>
                    <el-button
                      type="text"
                      class="button"
                      @click="toDetail(item)"
                      >查看详情</el-button
                    >
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
import request from "@/utils/axiosInstance";
export default {
  data() {
    return {
      input3: '',
      select: '',
      search: "",
      //帖子列表
      dataList: [
        {
          id: "", //帖子的主键id
          userId: "", //帖子的主人id
          title: "", //帖子标题
          content: "", //内容
          createTime: "", //发布时间
          images: [], //图片
        },
      ],
      defaultDataList: [],
      searchDataList: [],
      showModal: false,
    };
  },
  mounted() {},
  created() {
    this.getData();
  },
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
    // 点击详情页，进行跳转
    toDetail(item) {
      // this.$router.push({name:"post",params:{postItem: item}});
      this.$router.push({
        name: "post",
        query: { id: item.id },
      });
    },
    getData() {
      request
        .get("/post/all")
        .then((res) => {
          this.dataList = res.data.data;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchData() {
      // 在这里实现搜索逻辑
      request
        .get("/post/search", { params: { search: this.search } })
        .then((res) => {
          this.dataList = res.data.data;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goTo(name) {
      this.$router.push({ name: name }).catch((err) => {
        err;
      });
    },
  },
};
</script>
<style>
.el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
.userbtn,
.loginbtn {
  width: 110px;
  height: 40px;
  margin-right: 10px;
  padding: 0px;
  font-size: 1.5ch;
}

.rounded-card {
  border-radius: 50px; /* Adjust the border-radius as per your design */
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

.card-container {
  margin-bottom: 40px;
  margin-left: 40px;
  margin-top: 40px;
}
</style>