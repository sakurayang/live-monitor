var config = {
  productionSourceMap: false,
  transpileDependencies: [/\bvue-awesome\b/]
};
process.env.NODE_ENV !== "production"
  ? (config.configureWebpack = { devtool: "source-map" })
  : false;
module.exports = config;
