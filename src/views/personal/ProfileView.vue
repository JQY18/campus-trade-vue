<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="personalInfo"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item index="personalInfo">
          <i class="el-icon-user"></i>
          个人信息
        </el-menu-item>
        <el-menu-item index="changeAvatar">
          <i class="el-icon-picture"></i>
          修改头像
        </el-menu-item>
        <el-menu-item index="changePassword">
          <i class="el-icon-lock"></i>
          修改密码
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main>
      <div v-if="activeMenu === 'personalInfo'">
        <h2>编辑个人信息</h2>
        <hr />
        <el-form :model="userInfo">
          <el-form-item label="用户名">
            <el-input v-model="userInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="学校">
            <el-input v-model="userInfo.school"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUserInfo">保存</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="activeMenu === 'changeAvatar'">
        <h2>修改头像</h2>
        <hr />
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :limit="1"
          :before-upload="beforeAvatarUpload"
          :on-exceed="handleExceed"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>

      <div v-if="activeMenu === 'changePassword'">
        <h2>修改密码</h2>
        <hr />
        <el-form :model="passwordForm">
          <el-form-item label="当前密码">
            <el-input
              type="password"
              v-model="passwordForm.currentPassword"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input
              type="password"
              v-model="passwordForm.newPassword"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input
              type="password"
              v-model="passwordForm.confirmPassword"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updatePassword">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeMenu: "personalInfo",
      userInfo: {
        username: "",
        nickname: "",
        school: "",
      },
      imageUrl: "",
      passwordForm: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeMenu = key;
      console.log("Selected key:", key);
      console.log("Key path:", keyPath);
    },
    updateUserInfo() {
      // 处理更新个人信息的逻辑
      console.log("用户信息已更新:", this.userInfo);
    },
    handleAvatarSuccess(response, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      // 清除之前的上传记录
      this.$refs.upload.clearFiles();

      return isJPG && isLt2M;
    },
    handleExceed(files, fileList) {
      this.$message.warning("只能上传一张图片！");
    },
    updatePassword() {
      // 处理更新密码的逻辑
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        this.$message.error("新密码与确认新密码不一致!");
        return;
      }
      console.log("密码已更新:", this.passwordForm);
    },
    handleRemove(file) {
      const index = this.files.indexOf(file);
      if (index !== -1) {
        this.files.splice(index, 1); // 从数据列表中移除文件
      }
      console.log("Deleting:", file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log("Downloading:", file);
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
hr {
  margin-top: 40px;
  margin-bottom: 40px;
}
h2 {
  margin-left: 0px;
  font-size: 3.5ch;
}

.el-container {
  display: flex;
  height: 100vh;
}

.el-aside {
  display: flex;
  flex-direction: column;
}

.el-main {
  flex: 1;
  padding: 20px;
}

.avatar-uploader {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
    