import * as React from "react";
import {reactComponentView} from "../../ragu-react-view";
import {PokemonDetails} from "../../react-components/pokemon-details";

export interface PokemonData {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: Record<string, string>
}

export interface Props {
  name: string
}

let responses: Record<string, PokemonData> = {
}

export default reactComponentView<Props, PokemonData>({
    propsToState: async (props) => {
      if (!responses[props.name]) {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + props.name.toLowerCase());
        responses[props.name] = await response.json();
      }
      return responses[props.name];
    },
    renderComponent: (_, state) => <PokemonDetails pokemon={state} />
})
