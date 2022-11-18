const { defineConfig } = require('@vue/cli-service')
//const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/ptuFakemon/" : "/",
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/scss/_variables.scss"; @import "@/scss/_mixins.scss";'
      }
    }
  },
  // configureWebpack: {
  //   plugins: [new NodePolyfillPlugin()],
  //   optimization: {
  //     splitChunks: {
  //       chunks: "all",
  //     },
  //   },
  // },
});