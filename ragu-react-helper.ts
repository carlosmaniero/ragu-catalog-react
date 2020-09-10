import ReactDOM from "react-dom";
import {ReactElement} from "react";

export type PropsToState<Props, State> = (props: Props) => Promise<State>;
export type ComponentRender<Props, State> = (props: Props, state: State) => ReactElement;

function _non_webpack_require(id: string) {
  return require(id);
}

export interface CreateRaguComponent<Props, State> {
  propsToState: PropsToState<Props, State>,
  renderComponent: ComponentRender<Props, State>
}

export const createReactRaguComponent = <Props, State>({propsToState, renderComponent}: CreateRaguComponent<Props, State>) => ({
  dependencies: [
    {
      nodeRequire: 'react',
      globalVariable: 'React',
      dependency: 'https://unpkg.com/react@16/umd/react.production.min.js'
    },
    {
      nodeRequire: 'react-dom',
      globalVariable: 'ReactDOM',
      dependency: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js'
    },
    {
      nodeRequire: 'react-dom/server',
      globalVariable: 'ReactDOM',
      dependency: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js'
    }
  ],
  async render(props: Props) {
    const {renderToString} = _non_webpack_require("react-dom/server");
    const {ServerStyleSheet} = _non_webpack_require("styled-components");

    const state = await propsToState(props);

    const sheet = new ServerStyleSheet()
    const html = renderToString(sheet.collectStyles(renderComponent(props, state)));
    const style = sheet.getStyleTags();

    return {
      state,
      html: `${style}<div class="react-root">${html}</div>`
    }
  },
  hydrate(element: HTMLElement, props: Props, state: State) {
    ReactDOM.hydrate(renderComponent(props, state), element.querySelector('.react-root'));
  }
})
