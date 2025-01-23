const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    disableHostCheck: true,
    allowedHosts: [
      'biometrico-frontend-production.up.railway.app'
    ]
  }
})