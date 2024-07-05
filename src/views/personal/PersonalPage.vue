<template>
  <el-row class="tac">
    <el-col :span="8">
          <img :src="require('@/assets/logo3.png')" />
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
          <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <template v-slot:title>
                <span>发现</span>
              </template>
            </el-menu-item>
            <el-submenu index="2">
              <template v-slot:title>
                <i class="el-icon-location"></i>
                <span>分类</span>
              </template>
              <!-- <el-menu-item-group> -->
                <!-- 无法选中的文字 -->
                <!-- <template v-slot:title>分组一</template> -->
                <!-- 可选的选项，如：精选，鞋类，潮服，数码，美妆，家居，手表，包袋，配饰，潮玩，女装 -->
                <el-menu-item index="1-1">鞋类</el-menu-item>
                <el-menu-item index="1-2">潮服</el-menu-item>
              

                <el-menu-item index="1-3">数码</el-menu-item>
              
              <el-submenu index="1-4">
                <template v-slot:title>美妆</template>
                <!-- <el-menu-item index="1-4-1">选项1</el-menu-item> -->
              </el-submenu>
              <el-menu-item index="1-5">家居</el-menu-item>
              <el-menu-item index="1-6">手表</el-menu-item>
               <el-menu-item index="1-7">包袋</el-menu-item>
              <el-menu-item index="1-8">配饰</el-menu-item>
              <el-menu-item index="1-9">潮玩</el-menu-item>
              <el-menu-item index="1-10">女装</el-menu-item>
              
            </el-submenu>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <template v-slot:title>
                <span>发布</span>
              </template>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <template v-slot:title>
                <span>设置</span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-col>
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

    <router-link :to="{ name: 'login' }"><button>登录</button></router-link>

    <div class="div1">
      <div class="div2">
        <img
          :src="require('@/assets/image.png')"
          class="user_person"
          height="150px"
          width="150px"
        />
      </div>

      <div class="div3">
        <p id="userName">用户名</p>
        <p id="id">ID:</p>
        <p id="adress">IP:</p>
      </div>

      <button id="button_concern">关注</button>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      information: {
        //头像url
        avatarUrl: "",
        //昵称
        nickName: "",
        //性别
        sex: "",
        //生日
        birthday: "",
        //地区
        area: "",
        //个性签名
        signature: "",
        //关注
        follow: "",
        //粉丝
        fans: "",
        //收藏
        collect: "",
        //历史
        history: "",
        //浏览记录
        browse: "",
        //我的收藏
        myCollect: "",
        //我的分享
        myShare: "",
      },
    };
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style>
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
.div1 {
  float: left;
  height: 150px;
  width: 550px;
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

button:active {
  /* transform: translateY(-1px); */
}
</style>