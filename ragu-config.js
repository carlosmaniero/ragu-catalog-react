const {createNodeWebpackConfig, createBrowserConfig} = require("./webpack.config");

const path = require("path");
const fetch = require('node-fetch');

global.fetch = fetch;

const port = parseInt(process.env.PORT || '3101');
const assetsPrefix = process.env.HEROKU_APP_NAME ? `${process.env.HEROKU_APP_NAME}` : `http://localhost:${port}`;

module.exports = {
  server: {
    port,
    routes: {
      assets: '/component-assets/'
    },
    previewEnabled: true
  },
  compiler: {
    assetsPrefix: `${assetsPrefix}/component-assets/`,
    watchMode: process.env.WATCH_MODE === 'true',
    webpack: {
      view: createNodeWebpackConfig(),
      hydrate: createBrowserConfig()
    },
    output: {
      view: path.join(__dirname, 'compiled/node_components'),
      hydrate: path.join(__dirname, 'compiled/browser_components')
    }
  },
  components: {
    namePrefix: 'catalog',
    sourceRoot: path.join(__dirname, 'components'),
  },
};
