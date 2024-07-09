
<template>
  <div class="shell" :style="{ backgroundImage: backgroundImage }">
    <div class="photo">
      <img src="@/assets/1.jpg" alt="" />
    </div>
    <div class="content">
      <div class="text">
        <h3>We are a team</h3>
        <h6>创作者团队</h6>
      </div>
      <div class="btn" :class="{ active: isActive }" @click="toggleActive">
        <span></span>
      </div>
    </div>
    <div class="box" :class="{ open: isActive }">
      <i class="iconfont icon-qq" @mouseover="showText('队长，火影玩家')" @mouseleave="resetText">江启越</i>
      <i class="iconfont icon-youtube" @mouseover="showText('瓦洛兰特职业选手，高玩')" @mouseleave="resetText">陈剑锋</i>
      <i class="iconfont icon-wechat" @mouseover="showText('生存游戏爱好者')" @mouseleave="resetText">任鹏宇</i>
      <div v-if="hoverText" class="hover-text">{{ hoverText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
  return {
    isActive: false,
    hoverText: '',
    defaultBackground: '',
    hoverBackground: '@/assets/卡卡西.png', // 作为字符串处理
    backgroundImage: ''
  };
}
,
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    },
    showText(text) {
      this.hoverText = text;
      this.backgroundImage = this.hoverBackground;
    },
    resetText() {
      this.hoverText = '';
      this.backgroundImage = this.defaultBackground;
    }
  },
  mounted() {
    this.defaultBackground = window.getComputedStyle(document.body).backgroundImage;
    this.backgroundImage = this.defaultBackground;
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

body {
  color: #ffffff;
  background-color: #f3f3f3;
}

.shell {
  width: 330px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background-color: #fafafa;
  box-shadow: 0 0 2rem #babbbc;
  animation: show-shell 0.5s forwards ease-in-out;
  background-size: cover;
  background-position: center;
}

@keyframes show-shell {
  0% {
    width: 0;
  }
}

.photo,
.content {
  box-sizing: border-box;
}

.photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #fafafa;
  background-color: #fafafa;
  margin-left: -50px;
  box-shadow: 0 0 0.5rem #babbbc;
  animation: rotate-photo 0.5s forwards ease-in-out;
}

@keyframes rotate-photo {
  100% {
    transform: rotate(-360deg);
  }
}

.photo img {
  width: 100%;
}

.content {
  padding: 10px;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.content::before {
  content: "";
  position: absolute;
  width: 230px;
  height: 150px;
  left: 0;
  top: -20px;
  z-index: -1;
  transform: rotate(-8deg);
  background-image: linear-gradient(to top, #6866ee 0%, #fbc8d4 100%);
}

.content .text {
  margin-top: 20px;
  margin-left: 50px;
}

.content .text h3,
.content .text h6 {
  font-weight: normal;
  margin: 3px 0;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.content .btn {
  background-color: rgb(106, 106, 245);
  width: 50px;
  height: 50px;
  position: absolute;
  right: 25px;
  top: 25px;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
  transition-duration: 0.3s;
  animation: pop-btn 0.3s both ease-in-out 0.5s;
}

@keyframes pop-btn {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.content .btn:hover {
  box-shadow: 0 0 0 5px rgba(170, 187, 204, 0.5);
}

.content .btn span {
  width: 60%;
  height: 2px;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 20%;
  transform: translateY(-50%);
  animation: to-hamburger 0.3s forwards ease-in-out;
}

.content .btn span::before,
.content .btn span::after {
  content: "";
  width: 100%;
  height: 2px;
  position: absolute;
  background-color: white;
  transition-duration: 0.3s;
  transform: rotate(0deg);
  right: 0;
}

.content .btn span::before {
  margin-top: -7px;
}

.content .btn span::after {
  margin-top: 7px;
}

.content .btn.active span {
  animation: to-arrow 0.3s forwards ease-in-out;
}

.content .btn.active span::before,
.content .btn.active span::after {
  width: 60%;
  right: -1px;
}

.content .btn.active span::before {
  transform: rotate(45deg);
}

.content .btn.active span::after {
  transform: rotate(-45deg);
}

@keyframes to-hamburger {
  from {
    transform: translateY(-50%) rotate(-180deg);
  }
}

@keyframes to-arrow {
  from {
    transform: translateY(-50%) rotate(0deg);
  }

  to {
    transform: translateY(-50%) rotate(180deg);
  }
}

.box {
  opacity: 0;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 50%;
  right: -30%;
  transform: translate(-50%, -50%);
  transition-duration: 0.3s;
  box-shadow: 0 0 10px #fff;
  border: 5px #fff solid;
}

.box::after {
  content: "";
  display: block;
  width: 120px;
  height: 120px;
  background-image: url("@/assets/2.gif");
  background-size: cover;
  opacity: 0.7;
  border-radius: 50%;
}

.box i {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 13px;
  text-align: center;
  line-height: 60px;
  position: absolute;
  left: 18px;
  top: calc(60px - 50px / 2);
  box-shadow: 0 0 10px #fff;
  color: rgb(0, 0, 0);
  background-color: #ac7eb5;
  transition-duration: 0.3s;
}

.box i:hover {
  transition-delay: initial !important;
  box-shadow: 0 0 0 5px #babbbc;
  background-color: rgb(106, 106, 245);
  color: #fff;
}

.box.open {
  opacity: 1;
}

.box.open i {
  left: 20px;
  opacity: 1;
}

.box.open i:nth-of-type(1) {
  transform: rotate(-90deg) translateX(120px) rotate(90deg);
  transition-delay: 0s;
}

.box.open i:nth-of-type(2) {
  transform: rotate(-45deg) translateX(120px) rotate(45deg);
  transition-delay: 0.1s;
}

.box.open i:nth-of-type(3) {
  transform: rotate(0deg) translateX(130px) rotate(0deg);
  transition-delay: 0.2s;
}

.box.open i:nth-of-type(4) {
  transform: rotate(45deg) translateX(120px) rotate(-45deg);
  transition-delay: 0.3s;
}

.box.open i:nth-of-type(5) {
  transform: rotate(90deg) translateX(110px) rotate(-90deg);
  transition-delay: 0.4s;
}

.hover-text {
  position: absolute;
  width: 100vw; /* 宽度使用视窗宽度 */
  height: 100vh; /* 高度使用视窗高度 */
  bottom: -450px;
  left: -60%;
  transform: translateX(-50%);
  padding: 5px 10px;
  font-size: 100px;
  font-family: 'Courier New', Courier, monospace;
  color: #ffffff;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s;
  white-space: nowrap;
  opacity: 1;
  background-color: rgba(255, 255, 255, 0); /* 背景颜色设置为完全透明 */
  background-image: url('@/assets/卡卡西.png'); /* 使用正确的路径 */
  background-size: cover; /* 使背景图片覆盖整个元素 */
  background-position: center; /* 将背景图片居中 */
  z-index: -1;
}


</style>