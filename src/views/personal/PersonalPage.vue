<template>
  <el-container>
    <el-aside>
      <el-row class="tac">
        <el-col :span="8">
          <img :src="require('@/assets/logo3.png')" />
          <el-menu
            default-active="2"
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
    <el-container>
      <el-header>
        <div style="margin-top: 15px; width: 600px">
          <el-input
            placeholder="请输入内容"
            v-model="search"
            class="input-with-select"
          >
            <el-select
              v-model="select"
              slot="prepend"
              placeholder="请选择"
              @change="handleChange"
            >
              <el-option
                v-for="(item, index) in Category[0].category"
                :key="index"
                :label="item"
                :value="index"
              ></el-option>
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchData"
            ></el-button>
          </el-input>
        </div>

        <!-- <router-link :to="{ name: 'login' }"><button>登录</button></router-link> -->
        <button v-if="this.userId == this.ownerInfo.id" @click="logout">
          退出登录
        </button>

        <div class="div1">
          <div class="div2">
            <img
              :src="ownerInfo.avatar"
              class="user_person"
              height="150px"
              width="150px"
            />
          </div>

          <div class="div3">
            <p id="userName">用户名:</p>
            &nbsp;&nbsp;&nbsp;{{ ownerInfo.username }}
            <p id="nickname">昵称:{{ ownerInfo.nickname }}</p>
            <p id="school">学校:{{ ownerInfo.school }}</p>
          </div>

          <router-link
            v-if="this.userId == this.ownerInfo.id"
            :to="{ name: 'profile' }"
          >
            <button id="button_concern">完善资料</button>
          </router-link>
        </div>
      </el-header>

      <div class="hr">
        <el-divider> 我发布的帖子 </el-divider>
      </div>

      <el-main style="margin-top: 30px">
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
import * as Category from "@/utils/category";
import request from "@/utils/axiosInstance";
export default {
  data() {
    return {
      Category: [],
      userId: 1, //当前会话的用户id
      search: "",
      select: "",
      selectedValue: "0",
      dataList: [
        {
          id: -1, //帖子的主键id
          userId: 1, //帖子的主人id
          category: 0, // 帖子的分类
          title: "", //帖子标题
          content: "", //内容
          createTime: "", //发布时间
          images: [], //图片
        },
      ],
      // 当前主页的主人的信息
      ownerInfo: {
        id: 1, //当前主页的主人的id
        username: "user1",
        nickname: "昵称1",
        school: "学校1",
        avatar: "",
      },
    };
  },
  methods: {
    handleChange(value) {
      console.log("选中的值为:", value);
      // 可以将选中的值赋给组件中的一个变量
      this.selectedValue = value;

      // 根据具体需求做相应的逻辑处理
      // 例如根据不同的选项值，展示不同的内容或者触发不同的操作
    },
    // 获取登录的userId
    getUserId() {
      request
        .get("/user/authentic")
        .then((res) => {
          this.userId = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //初始化主页所属用户的信息
    getUserInfo(id) {
      request
        .get("/user/info", { params: { postUserId: id } })
        .then((response) => {
          this.ownerInfo = response.data.data;
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
    getImagePath(image) {
      // 使用 require 动态加载图片
      return require(`@/assets/${image}`);
    },
    toDetail(item) {
      // this.$router.push({name:"post",params:{postItem: item}});
      this.$router.push({
        name: "post",
        query: { id: item.id },
      });
    },
    getData() {
      request
        .get("/post/all", { params: { userId: this.ownerInfo.id } })
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
        .get("/post/search", {
          params: {
            userId: this.ownerInfo.id,
            category: this.selectedValue,
            title: this.search,
            content: this.search,
          },
        })
        .then((res) => {
          this.dataList = res.data.data;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //退出登录
    logout() {
      // 删除token
      localStorage.removeItem("token");
    
      this.$router.push({ name: "login" });
    },
  },
  created() {
    //从查询串中获取当前主页的主人的id
    this.ownerInfo.id = this.$route.query.id;
    // 从session会话中获取当前登录的用户id
    this.getUserId();
    //this.userId = 1;
    //this.ownerInfo.id = 1;
    this.getUserInfo(this.ownerInfo.id);
    this.getData();
  },
  mounted() {
    this.Category = Category.comment.data;
  },
};
</script>

<style scoped>
.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

#userName {
  font-weight: bolder;
  margin-top: 0px;
  margin-bottom: 0px;
}

#id {
  font-size: 1ch;
}

#adress {
  font-size: 1ch;
}

#button_concern {
  background-color: #017371;
  color: #fff;
  font-family: 微软雅黑；;
  font-size: 1ch;
}

.hr {
  margin-top: 300px;
}

.div1 {
  float: left;
  height: 150px;
  width: 650px;
  margin-top: 50px;
}

.div2 {
  width: 150px;
  height: 150px;
  margin-left: 0px;
  margin-top: 0px;
  float: left;
}

.div3 {
  margin-left: 50px;
  float: left;
  width: 100px;
  height: 100px;
}

.user_person {
  height: 150px;
  width: 150px;
  border-radius: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
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

button:hover {
  background-color: #23c483;
  /* box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4); */
  color: #fff;
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

.card-container {
  margin-bottom: 20px;
}

.image {
  width: 100%;
  display: block;
}

.card {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
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
  margin-bottom: 20px;
}
</style>