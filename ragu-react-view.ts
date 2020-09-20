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
