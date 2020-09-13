import ReactDOM from "react-dom";
import {ReactElement} from "react";
import {ServerStyleSheet} from "styled-components";
import {renderToString} from "react-dom/server";

export type PropsToState<Props, State> = (props: Props) => Promise<State>;
export type ComponentRender<Props, State> = (props: Props, state: State) => ReactElement;

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
      dependency: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
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
  },
  hydrate(element: HTMLElement, props: Props, state: State) {
    ReactDOM.hydrate(renderComponent(props, state), element.querySelector('.react-root'));
  }
})
