<template>
  <div class="error-page">
    <h1>Error 500</h1>
    <p>There was an internal server error.</p>
    <button @click="goHome">Go to Home</button>
  </div>
</template>
  
<script>
export default {
  methods: {
    goHome() {
      this.$router.go(-1); // 回退到前一个路由
    },
  },
};
</script>
  
  <style scoped>
.error-page {
  text-align: center;
}
</style>