const {createNodeWebpackConfig, createBrowserConfig} = require("./webpack.config");

const path = require("path");
const fetch = require('node-fetch');

global.fetch = fetch;

const port = parseInt(process.env.PORT || '3101');
const baseurl = process.env.HEROKU_APP_NAME ? `${process.env.HEROKU_APP_NAME}` : `http://localhost:${port}`;

module.exports = {
  baseurl: baseurl,
  server: {
    port,
    routes: {
      assets: '/component-assets/'
    },
    previewEnabled: true
  },
  compiler: {
    assetsPrefix: `${baseurl}/component-assets/`,
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
    defaultDependencies: [
      {
        nodeRequire: 'react',
        globalVariable: 'React',
        dependency: 'https://cdnjs.cloudflare.com/ajax/libs/react/17.0.0-rc.2/umd/react.production.min.js'
      },
      {
        nodeRequire: 'react-is',
        globalVariable: 'reactIs',
        dependency: 'https://cdnjs.cloudflare.com/ajax/libs/react-is/17.0.0-rc.2/umd/react-is.production.min.js'
      },
      {
        nodeRequire: 'react-dom',
        globalVariable: 'ReactDOM',
        dependency: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.0-rc.2/umd/react-dom.production.min.js',
        order: 1
      },
      {
        nodeRequire: 'styled-components',
        globalVariable: 'styled',
        dependency: 'https://unpkg.com/styled-components@5.2.0/dist/styled-components.min.js',
        order: 1
      }
    ]
  },
};
