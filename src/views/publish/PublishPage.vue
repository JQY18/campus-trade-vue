<template>
  <el-container>
    <el-aside>
      <el-row class="tac">
        <el-col :span="12">
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
      </el-row>
    </el-aside>

    <el-main>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入标题"
        v-model="title"
        style="width: 400px"
      >
      </el-input>
      <div style="margin: 20px 0"></div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 6 }"
        placeholder="请输入内容"
        v-model="content"
        style="width: 400px"
      >
      </el-input>
      <!-- 多文件上传 -->
      <el-upload
        ref="uploadRef"
        list-type="picture-card"
        :auto-upload="false"
        :http-request="handlePublish"
        multiple
        :on-change="handleChange"
        :file-list="files"
        :on-submit="handleSubmit"
        :on-remove="handleRemoveFromComponent"
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
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
          只能上传jpg/png文件，且不超过2MB
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
      <el-button type="primary" class="btn" @click="handlePublish"
        >发布</el-button
      >
    </el-main>
  </el-container>
</template>
<script>
import request from "@/utils/axiosInstance";
export default {
  data() {
    return {
      files: [], // 用于存储上传文件的信息
      userId: 2,
      title: "",
      content: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  methods: {
    showMessage(msg, type) {
      this.$message({
        message: msg,
        type: type, // 消息类型，可选值：success / warning / info / error
        duration: 3 * 1000, // 显示时间，单位毫秒，默认是 3000
      });
    },
    handleChange(file, fileList) {
      // 当文件列表发生变化时被调用
      // fileList参数包含了所有已上传的文件信息
      console.log("File list changed:", file);
      this.files = fileList;
    },
    // 上传前判断是否符合要求
    beforeAvatarUpload(file) {
      const allowedTypes = ["jpeg", "jpg", "png", "gif"];
      //截取file.name的最后一个.后面的字符串
      const fileType = file.name.split(".").pop().toLowerCase();
      const isAllowedType = allowedTypes.includes(fileType);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isAllowedType) {
        this.$message.error("上传图片只能是 JPG/JPEG、PNG 或 GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isAllowedType && isLt2M;
    },

    // 发布帖子
    handlePublish() {
      if (this.files.length == 0) {
        this.showMessage("请上传图片", "warning");
        return;
      }
      const formData = new FormData();

      // 将文件添加到 FormData 中
      this.files.forEach((file) => {
        //alert(JSON.stringify(file))
        if (!this.beforeAvatarUpload(file)) return false;
        formData.append("images", file.raw); // 注意：这里的 file.raw 是 Element UI 中的文件对象的原始 Blob/File 对象
      });

      // 如果还有其他非文件数据需要发送，也可以添加进来
      formData.append("userId", this.userId);
      formData.append("title", this.title);
      formData.append("content", this.content);

      // 发送请求到后端
      request
        .post("/post/addPost", formData)
        .then((response) => {
          console.log("Files uploaded successfully:", response.data);
        })
        .catch((error) => {
          console.error("Failed to upload files:", error);
        });
    },
    handleRemove(file) {
      const index = this.files.findIndex((f) => f.uid === file.uid);
      if (index !== -1) {
        this.files.splice(index, 1);
      }
      console.log("Deleting:", file);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleRemoveFromComponent(file, fileList) {
      // 这里的fileList是组件内部维护的文件列表
      // 你不需要手动处理这个数组，因为`el-upload`会自动更新它
      console.log("File removed from component:", fileList);

      console.log("File removed from component:", file);
    },
  },
};
</script>

<style>
.btn {
  float: left;
}
.file-upload-form {
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-upload-label input {
  display: none;
}

.file-upload-label svg {
  height: 50px;
  /* fill: rgb(82, 82, 82); */
  margin-bottom: 20px;
}

.file-upload-label {
  cursor: pointer;
  /* background-color: #ddd; */
  padding: 30px 70px;
  border-radius: 40px;
  border: 2px dashed rgb(82, 82, 82);
  /* box-shadow: 0px 0px 200px -50px rgba(0, 0, 0, 0.719); */
}

.file-upload-design {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.browse-button {
  /* background-color: rgb(82, 82, 82); */
  padding: 5px 15px;
  border-radius: 10px;
  /* color: black; */
  transition: all 0.3s;
}

.browse-button:hover {
  background-color: rgb(14, 14, 14);
}

/* Input container */
.input-container {
  position: relative;
  margin: 20px;
}

/* Input field */
.input-field {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  background-color: transparent;
}

/* Input label */
.input-label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 16px;
  color: rgba(204, 204, 204, 0);
  pointer-events: none;
  transition: all 0.3s ease;
}

/* Input highlight */
.input-highlight {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background-color: #007bff;
  transition: all 0.3s ease;
}

/* Input field:focus styles */
.input-field:focus + .input-label {
  top: -20px;
  font-size: 12px;
  color: #007bff;
}

.input-field:focus + .input-label + .input-highlight {
  width: 100%;
}

.styled-input {
  position: relative;
  cursor: text;
  font-size: 14px;
  line-height: 20px;
  padding: 0 16px;
  height: 48px;
  background-color: #fff;
  border: 1px solid #d6d6e7;
  border-radius: 3px;
  color: rgb(35, 38, 59);
  box-shadow: inset 0 1px 4px 0 rgb(119 122 175 / 30%);
  overflow: hidden;
  transition: all 100ms ease-in-out;
}

.styled-input:focus {
  border-color: #3c4fe0;
  box-shadow: 0 1px 0 0 rgb(35 38 59 / 5%);
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>