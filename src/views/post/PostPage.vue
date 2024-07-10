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
            <el-menu-item index="4">
              <i class="el-icon-setting" @click="goTo('judge')"></i>
              <template v-slot:title>
                <span>作者</span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
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
          <input
            class="input"
            type="search"
            placeholder="Search"
            v-model="search"
          />
        </div>

        <router-link :to="!isLogin ? '/mine' : '/login'">
          <button>
            <img
              :src="require('@/assets/用户.png')"
              style="width: 20px; height: 20px"
            />
          </button>
        </router-link>

        <router-link v-if="!isLogin" :to="{ name: 'login' }">
          <button>登录</button>
        </router-link>
        <!-- <router-link :to="{name:'login'}">登录</router-link> -->
        <!-- <router-link :to="{name:'login'}">登录</router-link> -->
        <!-- <router-link :to="{name:'login'}">登录</router-link> -->
      </el-header>
      <el-container>
        <el-aside style="width: 500px">
          <div>
            <el-carousel :interval="5000" arrow="always" height="700px">
              <el-carousel-item v-for="item in postItem.images" :key="item">
                <img :src="item" alt="图片" width="500" height="700" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-aside>

        <el-main>
          <div class="info">
            <img
              class="avatar"
              :src="this.ownerInfo.avatar"
              alt="头像"
              width="46"
              height="46"
              @click="clickAvatar"
            />
            <div class="right">
              <div class="name">昵称：{{ this.ownerInfo.nickname }}</div>
              <div class="date">发布时间：{{ this.postItem.createTime }}</div>
            </div>
          </div>
          <br />
          <span>
            <p>标题：{{ this.postItem.title }}</p>
          </span>
          <p>描述：{{ this.postItem.content }}</p>
          <div class="hr">
            <el-divider> 评论区 </el-divider>
          </div>
          <comments-page :id="postItem.postId"></comments-page>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import CommentsPage from "@/components/comments/CommentsPage.vue";
import request from "@/utils/axiosInstance";

export default {
  components: { CommentsPage },
  name: "PostPage",
  data() {
    return {
      //帖子用户的部分信息
      ownerInfo: {
        nickname: "",
        avatar: "",
      },

      //帖子对象
      postItem: {
        postId: -1, //帖子id
        userId: -1, //当前帖子的用户的id
        title: "", //标题
        content: "", //内容
        images: [], //图片列表
        createTime: "", //创建时间
      },
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goTo(name) {
      this.$router.push({ name: name });
    },
    //初始化帖子所属用户的信息
    getUserInfo(id) {
      //
      request
        .get("/user/info", { params: { postUserId: id } })
        .then((response) => {
          this.ownerInfo = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //根据帖子id获取帖子内容
    getPostInfo() {
      request
        .get("/post", { params: { id: this.postItem.postId } })
        .then((response) => {
          this.postItem = response.data.data;
          this.getUserInfo(this.postItem.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //点击头像跳转当前帖子主人的主页
    clickAvatar() {
      this.$router.push({ name: "mine", query: { id: this.postItem.userId } });
    },
  },
  created() {
    //获取到当前页面的帖子
    // this.postItem = this.$route.params.postItem;
    this.postItem.postId = this.$route.query.id; //获取上个页面传过来的帖子id
    //根据帖子id获取帖子内容
    this.getPostInfo();
  },
};
</script>

<style>
.info {
  display: flex;
  align-items: center;
}
.info .avatar {
  border-radius: 50%;
}
.info .right {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.info .right .name {
  font-size: 16px;
  color: #303133;
  margin-bottom: 5px;
  font-weight: 500;
}

.info .right .date {
  font-size: 12px;
  color: #909399;
}

.avatar {
  border-radius: 50%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
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
.hr {
  margin-top: 30px;
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
</style>