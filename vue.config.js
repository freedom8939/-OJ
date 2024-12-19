const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
    config.module
      .rule("js")
      .use("babel-loader")
      .tap((options) => {
        options.plugins = options.plugins || [];
        options.plugins.push("@babel/plugin-transform-class-static-block");
        return options;
      });
  },
});
