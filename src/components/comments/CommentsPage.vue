<template>
  <comment :comments="commentData"></comment>
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
    // 根据帖子id查询帖子下的评论
    // request.get(`/comments/${this.id}`)
    request.get("/comments/1")
    .then((res) => {
      this.commentData = res.data.data;
    }).catch((err) => {
      console.log(err)
    });

  },
};
</script>
  