import path = require("path");
import {createWebpackConfig} from "./webpack.config";
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
    assetsPrefix: `${assetsPrefix}/component-assets/`,
    server: {
      assetsEndpoint: '/component-assets/'
    },
    components: {
      preCompiledOutput: path.join(__dirname, 'pre_compiled_components'),
      namePrefix: 'catalog',
      output: path.join(__dirname, 'compiled_components'),
      sourceRoot: path.join(__dirname, 'components')
    },
    port,
    webpackConfig: createWebpackConfig() as any
  };

  const compiler = new ComponentsCompiler(config);
  const server = new RaguServer(config, compiler);

  await compiler.compileAll();
  await server.start();
}

init();
