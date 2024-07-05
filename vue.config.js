const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
    // 设置端口
    ,
  devServer: {
    port: 8081
  }
})