const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
module.exports = merge(common, {
  mode: "development", //開発用本番ではproduction
  devtool: "source-map",
  watch: true, //監視モードを有効化
});
