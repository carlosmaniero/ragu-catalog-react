import {ReactElement} from "react";
import {ServerStyleSheet} from "styled-components";
import {renderToString} from "react-dom/server";

export type PropsToState<Props, State> = (props: Props) => Promise<State>;
export type ComponentRender<Props, State> = (props: Props, state: State) => ReactElement;

export interface CreateRaguComponent<Props, State> {
  propsToState: PropsToState<Props, State>,
  renderComponent: ComponentRender<Props, State>
}

export const reactComponentView = <Props, State>({propsToState, renderComponent}: CreateRaguComponent<Props, State>) => ({
  dependencies: [
    {
      nodeRequire: 'react',
      globalVariable: 'React',
      dependency: 'https://unpkg.com/react@16/umd/react.production.min.js'
    },
    {
      nodeRequire: 'react-is',
      globalVariable: 'reactIs',
      dependency: 'https://unpkg.com/react-is@16.13.1/umd/react-is.production.min.js'
    },
    {
      nodeRequire: 'react-dom',
      globalVariable: 'ReactDOM',
      dependency: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
      order: 1
    },
    {
      nodeRequire: 'styled-components',
      globalVariable: 'styled',
      dependency: 'https://unpkg.com/styled-components/dist/styled-components.min.js',
      order: 1
    }
  ],
  async render(props: Props) {
    const state = await propsToState(props);

    const sheet = new ServerStyleSheet()
    const html = renderToString(sheet.collectStyles(renderComponent(props, state)));
    const style = sheet.getStyleTags();

    return {
      state,
      html: `${style}<div class="react-root">${html}</div>`
    }
  }
})
