<template>
  <div>
    <div class="div1">
      <img :src="require('@/assets/image.png')" class="user" />
    </div>
    <div>
      <h2></h2>
    </div>
  </div>
</template>

<style scoped>
.div1 {
  width: 600px;
  height: 300px;
}
.user {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  margin-left: 400px;
  margin-top: 100px;
}
</style>