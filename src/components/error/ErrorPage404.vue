<template>
    <div class="error-page">
      <h1>Error 404</h1>
      <p>The page you are looking for does not exist.</p>
      <button @click="goHome">Go to Home</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goHome() {
        this.$router.go(-1); // 回退到前一个路由
      }
    }
  };
  </script>
  
  <style scoped>
  .error-page {
    text-align: center;
  }
  </style>