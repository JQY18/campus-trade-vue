<template>
    <el-container>
        <el-aside>
            <el-row class="tac">
                <el-col :span="12">
                    <img :src="require('@/assets/logo3.png')" />
                    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
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
            </el-row>
        </el-aside>


        <el-main>
            <form class="file-upload-form" style="float:right;">
                <label for="file" class="file-upload-label">
                    <div class="file-upload-design">
                        <svg viewBox="0 0 640 512" height="1em">
                            <path
                                d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z">
                            </path>
                        </svg>
                        <p>Drag and Drop</p>
                        <p>or</p>
                        <span class="browse-button">Browse file</span>
                    </div>
                    <input id="file" type="file" />
                </label>
            </form>
            <el-input type="textarea" autosize placeholder="请输入标题" v-model="textarea1" style="width: 400px;">
            </el-input>
            <div style="margin: 20px 0;"></div>
            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6 }" placeholder="请输入内容" v-model="textarea2" style="width: 400px;">
            </el-input>



        </el-main>


    </el-container>
</template>
<script>
export default {
    data() {
        return {
            textarea1: '',
            textarea2: ''
        }
    }
}
</script>
<style>
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
</style>