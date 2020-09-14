import ReactDOM from "react-dom";
import {ReactElement} from "react";

export type ComponentRender<Props, State> = (props: Props, state: State) => ReactElement;

export interface CreateRaguComponent<Props, State> {
  renderComponent: ComponentRender<Props, State>
}

export const reactComponentHydrate = <Props, State>({renderComponent}: CreateRaguComponent<Props, State>) => ({
  hydrate(element: HTMLElement, props: Props, state: State) {
    ReactDOM.hydrate(renderComponent(props, state), element.querySelector('.react-root'));
  }
})
