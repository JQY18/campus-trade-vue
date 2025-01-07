<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column fixed prop="id" label="id" width="150"> </el-table-column>
    <el-table-column fixed prop="createTime" label="创建日期" width="150">
    </el-table-column>
    <el-table-column prop="username" label="用户名" width="120">
    </el-table-column>
    <el-table-column prop="school" label="学校" width="120"> </el-table-column>
    <el-table-column prop="gender" label="性别" width="120"> </el-table-column>
    <el-table-column prop="age" label="年龄" width="300"> </el-table-column>
    <el-table-column prop="nickname" label="昵称" width="120"></el-table-column>
    <el-table-column prop="" label="操作" width="120">
      <template #default="{ row }">
        <button @click="deleteUser(row.id)">删除</button>
      </template>
    </el-table-column>
  </el-table>
</template>
  
<script>
import request from "@/utils/axiosInstance";

export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
    deleteUser(id) {
      request
        .get("/admin/delete", {
          params: { id: id },
        })
        .then((res) => {
          if (res.data.code === 1) {
            this.$message.success("删除成功");
          } else {
            this.$message.error("删除失败");
          }
        });
    },
  },
  created() {
    request
      .get("/admin/list")
      .then((res) => {
        this.tableData = res.data.data;
      })
      .catch((err) => {
        console.info(err);
      });
  },

  data() {
    return {
      tableData: [
        {
          id: 1,
          createTime: "2016-05-02",
          username: "王小虎",
          school: "湖大",
          gender: "男",
          nickname: "弄",
          age: 0,
        },
      ],
    };
  },
};
</script>


<style scoped>
</style>