const { defineConfig } = require('@vue/cli-service')
module.exports = 
{
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        // pathRewrite 是 webpack-dev-server 的一个配置选项，用于重写路径。在该配置中， '^/api': '' 表示把以 /api 开头的请求路径重写为一个空字符串，即去掉了 /api 前缀。
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  transpileDependencies: [
    'vue',
    'axios',
    'element-ui'
  ]
}
