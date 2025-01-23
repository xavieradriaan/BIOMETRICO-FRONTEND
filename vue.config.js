const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    disableHostCheck: true,
    public: 'biometrico-frontend-production.up.railway.app'
  }
})