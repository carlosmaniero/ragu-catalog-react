import path = require("path");
import {createWebpackConfig} from "./webpack.config";
import {ComponentsCompiler, RaguServer} from "ragu-server";
const fetch = require('node-fetch');

global.fetch = fetch;

const init = async () => {
  const port = process.env.PORT || 3101;

  const config: any = {
    assetsPrefix: `http://localhost:${port}/component-assets/`,
    server: {
      assetsEndpoint: '/component-assets/'
    },
    components: {
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
