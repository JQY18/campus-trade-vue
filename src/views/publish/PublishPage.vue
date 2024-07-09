<template>
    <el-container>
        <el-aside>
            <el-row class="tac">
                <el-col :span="12">
                    <img :src="require('@/assets/logo3.png')" />
                    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">

                        <el-menu-item index="1" @click="goTo('home')">
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

                            <el-menu-item index="1-1">鞋类</el-menu-item>
                            <el-menu-item index="1-2">潮服</el-menu-item>
                            <el-menu-item index="1-3">数码</el-menu-item>

                            <el-submenu index="1-4">
                                <template v-slot:title>美妆</template>
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


        <el-main>

            <el-input type="textarea" autosize placeholder="请输入标题" v-model="textarea1" style="width: 400px;">
            </el-input>
            <div style="margin: 20px 0;"></div>
            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6 }" placeholder="请输入内容" v-model="textarea2"
                style="width: 400px;">
            </el-input>
            <el-upload action="#" list-type="picture-card" :auto-upload="false" :before-upload="beforeAvatarUpload">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                    <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                            <i class="el-icon-zoom-in"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                            <i class="el-icon-download"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                            <i class="el-icon-delete"></i>
                        </span>
                    </span>
                </div>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <el-button type="primary" class="btn">发布</el-button>

        </el-main>


    </el-container>
</template>
<script>
export default {
    data() {
        return {
            textarea1: '',
            textarea2: '',
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false
        }
    },
    methods: {
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleRemove(file) {
            const index = this.files.indexOf(file);
            if (index !== -1) {
                this.files.splice(index, 1); // 从数据列表中移除文件
            }
            console.log('Deleting:', file);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log('Downloading:', file);
        },
        goTo(name) {
      this.$router.push({ name: name }).catch((err) => {
        err;
      });
    },
    }
}
</script>
<style>
.btn{
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
.input-field:focus+.input-label {
    top: -20px;
    font-size: 12px;
    color: #007bff;
}

.input-field:focus+.input-label+.input-highlight {
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
    border-color: #409EFF;
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