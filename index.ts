import path = require("path");
import {ComponentsCompiler, RaguServer, RaguServerConfig} from "ragu-server";

const fetch = require('node-fetch');

global.fetch = fetch;

const getAssetsPrefix = (port: number) => {
  return process.env.HEROKU_APP_NAME ? `${process.env.HEROKU_APP_NAME}` : `http://localhost:${port}`;
}


const init = async () => {
  const port = parseInt(process.env.PORT || '3101');
  const assetsPrefix = getAssetsPrefix(port);

  const config: RaguServerConfig = {
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
      output: {
        node: path.join(__dirname, 'pre_compiled_components'),
        browser: path.join(__dirname, 'compiled_components')
      }
    },
    components: {
      namePrefix: 'catalog',
      sourceRoot: path.join(__dirname, 'components'),
    },
  };

  const compiler = new ComponentsCompiler(config);
  const server = new RaguServer(config, compiler);

  await compiler.compileAll();
  await server.start();
}

init();
