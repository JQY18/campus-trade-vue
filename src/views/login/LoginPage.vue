
<template>
  <div class="login-register">
    <!-- 视频背景 -->
    <video autoplay muted loop class="video-background">
      <source src="@/assets/树屋.mp4" type="video/mp4" />
    </video>
    <div class="contain">
      <div class="big-box" :class="{ active: isLogin }">
        <div class="big-contain" key="bigContainLogin" v-if="isLogin">
          <div class="btitle">账户登录</div>
          <div class="bform">
            <input type="text" placeholder="用户名" v-model="form.username" />
            <!-- <span class="errTips" v-if="usernameError">* 用户名填写错误 *</span> -->
            <input type="password" placeholder="密码" v-model="form.password" />
            <!-- <span class="errTips" v-if="passwordError">* 密码填写错误 *</span> -->
          </div>
          <button class="bbutton" @click="login">登录</button>
        </div>

        <div class="big-contain" key="bigContainRegister" v-else>
          <div class="btitle">创建账号</div>
          <div class="bform">
            <input type="nickname" placeholder="昵称" v-model="form.nickname" />
            <input type="text" placeholder="用户名" v-model="form.username" />
            <span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
            <input type="password" placeholder="密码" v-model="form.password" />
          </div>
          <button class="bbutton" @click="register">注册</button>
        </div>
      </div>
      <!-- 登录和注册框的转换 -->
      <div class="small-box" :class="{ active: isLogin }">
        <div class="small-contain" key="smallContainRegister" v-if="isLogin">
          <div class="stitle">Hello，friend!</div>
          <p class="scontent">开始注册，和我们一起旅行</p>
          <button class="sbutton" @click="changeType">注册</button>
        </div>
        <div class="small-contain" key="smallContainLogin" v-else>
          <div class="stitle">Welcome back!</div>
          <p class="scontent">已经有账号了吗，去登录账号来计入奇妙世界吧！</p>
          <button class="sbutton" @click="changeType">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/axiosInstance";

export default {
  name: "login-register",
  data() {
    return {
      isLogin: true,
      usernameError: false,
      passwordError: false,
      existed: false,
      form: {
        nickname: "",
        username: "",
        password: "",
      },
    };
  },
  created() {
    this.tryLogin();
  },
  mounted() {},
  methods: {
    tryLogin() {
      request.get("/user/authentic").then((res) => {
        if (res.data.code == 1) {
          this.$router.push("/");
        }
      });
    },
    showMessage(msg, type) {
      this.$message({
        message: msg,
        type: type, // 消息类型，可选值：success / warning / info / error
        duration: 3 * 1000, // 显示时间，单位毫秒，默认是 3000
      });
    },
    changeType() {
      this.isLogin = !this.isLogin;
      this.form.nickname = "";
      this.form.username = "";
      this.form.password = "";
    },
    login() {
      const self = this;
      if (self.form.username != "" && self.form.password != "") {
        request
          .post("/user/login", {
            username: self.form.username,
            password: self.form.password,
          })
          .then((res) => {
            switch (res.data.code) {
              case 1:
                this.showMessage("登陆成功！", "success");
                localStorage.setItem("token", res.data.data.token);
                this.$router.push("/");
                break;
              case 0:
                this.showMessage(res.data.msg, "error");
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.showMessage("填写不能为空！", "warning");
      }
    },
    register() {
      const self = this;
      if (
        self.form.nickname != "" &&
        self.form.username != "" &&
        self.form.password != ""
      ) {
        request
          .post("/user/register", self.form)
          .then((res) => {
            switch (res.data.code) {
              case 1:
                this.showMessage("注册成功！", "success");
                this.isLogin = !this.isLogin;
                break;
              case 0:
                this.showMessage(res.data.msg, "error");
                break;
              case 2:
                this.existed = true;
                this.showMessage(res.data.msg, "error");
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.showMessage("填写不能为空！", "warning");
      }
    },
    centerButtons() {
      const buttons = document.querySelectorAll(".bbutton, .sbutton");
      buttons.forEach((button) => {
        button.style.display = "flex";
        button.style.alignItems = "center";
        button.style.justifyContent = "center";
      });
    },
  },
};
</script>

<style scoped>
/* 视频背景样式 */
.video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保视频填充整个容器 */
  z-index: -1; /* 确保视频在背景层 */
}

.bbutton:hover,
.sbutton:hover {
  box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
  transform: scale(0.985);
  transition: 0.25s;
}

.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bbutton {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin: 0; /* 确保页面没有默认边距 */
}

.login-register {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.contain {
  width: 60%;
  height: 60%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.5); /* 使用半透明背景 */
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}

.big-box {
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}

.big-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btitle {
  font-size: 2em;
  font-weight: bold;
  color: rgb(57, 167, 176);
}

.bform {
  width: 100%;
  height: 40%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.bform .errTips {
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}

.bform input {
  width: 50%;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: #f0f0f0;
}

.bform input:focus {
  box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}

.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}

.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}

.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}

.big-box.active {
  left: 0;
  transition: all 0.5s;
}

.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
</style>

