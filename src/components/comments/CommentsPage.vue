<template>
  <comment :comments="commentData"></comment>
</template>
  
  <script>
import * as CommentData from "@/utils/mockdata";
import comment from "./CT";

export default {
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
  },
};
</script>
  