const { defineConfig } = require("@vue/cli-service");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: (config) => {
    // config.externals = [
    //   function ({ context, request }, callback) {
    //     if (/^amis/.test(request)) {
    //       return callback(null, "global " + request);
    //     }

    //     callback();
    //   },
    // ];

    config.plugins = config.plugins || [];
    config.plugins.push(
      new CopyPlugin({
        patterns: [{ from: "node_modules/amis/sdk", to: "amis/sdk" }],
      })
    );

    // config.module.rules = config.module.rules || [];
    // config.module.rules.push({
    //   test: /amis\/sdk\/.*\.js$/,
    //   type: "javascript/auto",
    // });

    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
      config.devtool = "source-map";
    }
  },
});
