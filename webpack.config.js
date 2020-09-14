const {merge} = require("webpack-merge");
const {createDefaultWebpackConfiguration} = require("ragu-server");

const createBaseConfig = () => {
  return merge(
    createDefaultWebpackConfiguration({}),
    {
      resolve: {
        extensions: ['.ts', '.tsx', '.js']
      }
    }
  );
}

module.exports.createNodeWebpackConfig = () => {
  return merge(createBaseConfig(), {
    target: "node",
    output: {
      libraryTarget: "commonjs2",
      filename: '[name].js',
    }
  });
};

module.exports.createBrowserConfig = () => {
  return merge(createBaseConfig(), {
    target: "web"
  });
};
