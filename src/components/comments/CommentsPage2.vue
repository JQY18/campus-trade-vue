<template>
  <comment :commentsData="commentData" :postId="1" @update="created"></comment>
</template>
  
  <script>
import * as CommentData from "@/utils/mockdata";
import comment from "./CommentTemplate.vue";
import request from "@/utils/axiosInstance";

export default {
  props: {//接收父组件的帖子id
    id: {
      type: Number,
      required: true,
    },
  },
  components: {
    comment,
  },
  data() {
    return {
      commentData: [],
    };
  },
  created() {
    this.commentData = CommentData.comment.data;
    // let userId = sessionStorage.getItem("userId");
    // 根据帖子id查询帖子下的评论
    // request.get(`/comments/${this.id}`)
    request.get("/comments/1",{params: {userId: 2}})
    .then((res) => {
      this.commentData = res.data.data;
    }).catch((err) => {
      console.log(err)
    });

  },
};
</script>
  