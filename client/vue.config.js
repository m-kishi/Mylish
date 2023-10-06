const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
  devServer: {
    port: 8080,
    proxy: 'http://localhost:3000',
  },
})
