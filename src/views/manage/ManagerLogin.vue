<template>
  <div class="shell">
    <div id="img-box" style="margin-top: 50px; transform: scale(1.1)">
      <img :src="require('@/assets/13.png')" />
    </div>

    <el-form
      :model="loginForm"
      label-width="100px"
      :rules="rules"
      ref="loginForm"
      style="margin-top: 50px; transform: scale(1.1)"
    >
      <div id="form-body">
        <div id="welcome-lines" style="margin-top: -40px; margin-right: -50px">
          <div id="w-line-2">欢迎回来!</div>
        </div>

        <div id="input-area" style="margin-right: 50px; transform: scale(1.5)">
          <el-form-item label="账号" prop="no">
            <el-input
              style="width: 200px"
              type="text"
              v-model="username"
              autocomplete="off"
              size="small"
            ></el-input>
          </el-form-item>
          
          <el-form-item label="密码" prop="password" style="margin-top: 12px">
            <el-input
              style="width: 200px"
              type="password"
              v-model="password"
              show-password
              autocomplete="off"
              size="small"
              @keyup.enter.native="confirm"
            ></el-input>
          </el-form-item>
        </div>
        <div
          id="submit-button-cvr"
          style="margin-top: 40px; margin-left: -120px"
        >
          <el-form-item>
            <el-button
              type="danger"
              round
              @click="goTo('manage')"
              :disabled="confirm_disabled"
              style="width: 200%"
              >登 录</el-button
            >
          </el-form-item>
        </div>

      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    goTo(name) {
      // 验证用户名和密码
      if (this.username === "" || this.password === "") {
        alert("请输入用户名和密码");
        return;
      }

      if (this.password.length < 8 || this.password.length > 15) {
        alert("密码长度必须在8到15之间");
        return;
      }
      if (this.username !== "admin" || this.password !== "admin123") {
        alert("用户名或密码错误");
        return;
      }
      // 跳转到管理员页面

      this.$router.push({ name: name }).catch((err) => {
        err;
      });
    },
    // 跳转到商家页面
    // 执行路由跳转
  },
};
</script>
<style scoped >
* {
  padding: 0;
  margin: 0;
  outline: none;
}
body {
  background: linear-gradient(45deg, #6962cd, #267aa0);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.shell {
  background: linear-gradient(45deg, #6962cd, #267aa0);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
form {
  position: relative;
}

.shell {
  display: flex;
  justify-content: center;
}

form {
  width: 562px;
  height: 520px;
  background-color: #fff;
  box-shadow: 0px 15px 40px #5a35b6;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#img-box {
  width: 330px;
  height: 520px;
}

#img-box img {
  height: 100%;
}

#form-body {
  width: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#welcome-lines {
  width: 100%;
  text-align: center;
  line-height: 1;
}

#w-line-1 {
  color: #7f7f7f;
  font-size: 65px;
}

#w-line-2 {
  color: #9c9c9c;
  font-size: 30px;
  margin-top: 17px;
}

#input-area {
  width: 100%;
  margin-top: 40px;
}

.f-inp {
  padding: 13px 25px;
  border: 2px solid #6e6d6d;
  line-height: 1;
  border-radius: 20px;
  margin-bottom: 15px;
}

.f-inp input {
  width: 100%;
  font-size: 14px;
  padding: 0;
  margin: 0;
  border: 0;
}

.f-inp input::placeholder {
  color: #b9b9b9;
}

#submit-button-cvr {
  margin-top: 20px;
}

#submit-button {
  display: block;
  width: 100%;
  color: #fff;
  font-size: 14px;
  margin: 0;
  padding: 14px 40px;
  border: 0;
  background-color: #f5506e;
  border-radius: 25px;
  line-height: 1;
  cursor: pointer;
}

#forgot-pass {
  text-align: center;
  margin-top: 10px;
}

#forgot-pass a {
  color: #868686;
  font-size: 12px;
  text-decoration: none;
  display: inline-block;
  margin-right: 20px; /*字之间空距离 */
}
</style>
