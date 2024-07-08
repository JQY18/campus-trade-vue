<!--评论模块-->
<template>
  <div class="container">
    <el-input
      type="textarea"
      placeholder="请输入评论"
      v-model="myComment"
      clearable
    />
    <el-button
      type="success"
      icon="el-icon-check"
      circle
      @click="submitComment"
    ></el-button>
    <div class="comment" v-for="item in comments" :key="item">
      <div class="info">
        <img
          class="avatar"
          :src="item.commenterAvatar"
          width="36"
          height="36"
        />
        <div class="right">
          <div class="name">{{ item.commenterNickname }}</div>
          <div class="date">{{ item.createTime }}</div>
        </div>
      </div>
      <div class="content">{{ item.content }}</div>
      <div class="control">
        <span
          class="like"
          :class="{ active: item.isLiked }"
          @click="likeClick(item)"
        >
          <i class="iconfont icon-like"></i>
          <span class="like-num">{{
            item.like > 0 ? item.like + "人赞" : "赞"
          }}</span>
        </span>
        <span class="comment-reply" @click="showCommentInput(item)">
          <i class="iconfont icon-comment"></i>
          <span>回复</span>
        </span>
      </div>
      <div class="reply">
        <div class="item" v-for="reply in item.reply" :key="reply">
          <div class="reply-content">
            <img
              class="avatar"
              :src="reply.replierAvatar"
              width="30"
              height="30"
            />
            <span class="from-name">{{ reply.replierNickname }}</span
            ><span>: </span>
            <span class="to-name">@{{ reply.commenterNickname }}</span>
            <span>{{ reply.content }}</span>
          </div>
          <div class="reply-bottom">
            <span>{{ reply.createTime }}</span>
            <span class="reply-text" @click="showCommentInput(item, reply)">
              <i class="iconfont icon-comment"></i>
              <span>回复</span>
            </span>
          </div>
        </div>
        <div
          class="write-reply"
          v-if="item.reply.length > 0"
          @click="showCommentInput(item)"
        >
          <i class="el-icon-edit"></i>
          <span class="add-comment">添加新评论</span>
        </div>
        <transition name="fade">
          <div class="input-wrapper" v-if="showItemId === item.id">
            <el-input
              class="gray-bg-input"
              v-model="inputComment"
              type="textarea"
              :rows="3"
              autofocus
              placeholder="写下你的评论"
            >
            </el-input>
            <div class="btn-control">
              <span class="cancel" @click="cancel">取消</span>
              <el-button class="btn" type="success" round @click="submitReply"
                >确定</el-button
              >
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
    
  <script>
import Vue from "vue";
import request from "@/utils/axiosInstance";

export default {
  components: {},
  data() {
    return {
      comments: [],
      postId: 1,
      userId: 2,
      myComment: "",
      inputComment: "",
      showItemId: "",
    };
  },
  computed: {},
  methods: {
    /**
     * 点赞
     */
    likeClick(item) {
      if (item.isLiked === null) {
        Vue.$set(item, "isLike", true);
        item.likeNum++;
      } else {
        if (item.isLiked) {
          item.like--;
        } else {
          item.like++;
        }
        item.isLiked = !item.isLiked;
      }
    },

    /**
     * 点击取消按钮
     */
    cancel() {
      this.showItemId = "";
    },

    /**
     * 提交评论
     */
    async submitComment() {
      //内容为空直接返回
      if (!this.myComment.trim()) {
        this.$message.warning("评论内容不能为空！");
        return;
      }

      try {
        await request.post("/comments/add", {
          content: this.myComment, //输入框的内容
          postId: this.postId, //当前帖子id
          commenterId: this.userId, //当前登录的用户id
        });
        this.$message.success("评论成功");
        this.myComment = ""; // 清空输入框
        this.fresh(); // 刷新评论列表
        /* this.$nextTick(() => {
          //this.comments.unshift(res.data.data); // 在列表的最前面添加新评论
          //this.$set(this.comments, -1, res.data.data); // 使用 Vue.set 更新数组中的第一个元素
          this.fresh(); // 刷新评论列表
        }); */
      } catch (err) {
        console.error(err);
        this.myComment = ""; // 清空输入框
        this.$message.error("评论失败");
      } finally {
        this.showItemId = ""; // 清除任何可能影响后续交互的状态
      }
    },

    /**
     * 提交回复
     */
    submitReply() {
      console.log(this.inputComment);
    },
    /**
     * 点击评论按钮显示输入框
     * item: 当前大评论
     * reply: 当前回复的评论
     */
    showCommentInput(item, reply) {
      if (reply) {
        this.inputComment = "@" + reply.commenterNickname + " ";
      } else {
        this.inputComment = "";
      }
      this.showItemId = item.id;
    },
    // 刷新评论区
    fresh() {
      request
        .get("/comments/1", { params: { userId: 2 } })
        .then((res) => {
          this.comments = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    // this.userId = sessionStorage.getItem("userId");
    this.userId = 2;
    this.postId = 1;
    this.fresh();
  },
  mounted() {},
};
</script>
    
<style scoped lang="scss">
@import "/public/scss/index.scss";

.container {
  padding: 0 10px;
  box-sizing: border-box;
  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid $border-fourth;
    .info {
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 50%;
      }
      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .name {
          font-size: 16px;
          color: $text-main;
          margin-bottom: 5px;
          font-weight: 500;
        }
        .date {
          font-size: 12px;
          color: $text-minor;
        }
      }
    }
    .content {
      font-size: 16px;
      color: $text-main;
      line-height: 20px;
      padding: 10px 0;
    }
    .control {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $text-minor;
      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        &.active,
        &:hover {
          color: $color-main;
        }
        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }
      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: $text-333;
        }
        .iconfont {
          font-size: 16px;
          margin-right: 5px;
        }
      }
    }
    .reply {
      margin: 10px 0;
      border-left: 2px solid $border-first;
      .item {
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px dashed $border-third;
        .reply-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $text-main;
          .avatar {
            border-radius: 50%;
          }
          .from-name {
            color: $color-main;
          }
          .to-name {
            color: $color-main;
            margin-left: 5px;
            margin-right: 5px;
          }
        }
        .reply-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
          font-size: 12px;
          color: $text-minor;
          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;
            &:hover {
              color: $text-333;
            }
            .icon-comment {
              margin-right: 5px;
            }
          }
        }
      }
      .write-reply {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: $text-minor;
        padding: 10px;
        cursor: pointer;
        &:hover {
          color: $text-main;
        }
        .el-icon-edit {
          margin-right: 5px;
        }
      }
      .fade-enter-active,
      fade-leave-active {
        transition: opacity 0.5s;
      }
      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }
      .input-wrapper {
        padding: 10px;
        .gray-bg-input,
        .el-input__inner {
          background-color: #67c23a;
        }
        .btn-control {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 10px;
          .cancel {
            font-size: 16px;
            color: $text-normal;
            margin-right: 20px;
            cursor: pointer;
            &:hover {
              color: $text-333;
            }
          }
          .confirm {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
    