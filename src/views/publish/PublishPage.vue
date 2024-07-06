<template>
    <el-container>
        <el-aside>
            <el-row class="tac">
                <el-col :span="8">
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
    <el-container>
        <div class="main">
            <div></div>
        </div>
    </el-container>
    
    </el-container>
</template>
<script>
export default {

}
</script>
<style>
body{

    background-color: rgb(95, 92, 92);
}
.main{
    margin: 20px;
    background-color: rgb(255, 255, 255);
    height: 100%;
    width: 100%;
    border-radius: 10px;
}
</style>