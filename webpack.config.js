const {merge} = require("webpack-merge");
const {createDefaultWebpackConfiguration} = require("ragu-server");

module.exports.createWebpackConfig = () => {
  return merge(
    createDefaultWebpackConfiguration({}),
    {
      resolve: {
        extensions: ['.ts', '.tsx', '.js']
      },
      output: {
        libraryTarget: "commonjs2",
        filename: '[name].js',
      }
    }
  );
};
