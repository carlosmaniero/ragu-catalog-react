import * as React from "react";
import {reactComponentView} from "../../ragu-react-view";
import {PokemonList} from "../../react-components/pokemon-list";

export interface PokemonData {
  name: string;
  id: number;
}

interface PokeAPIResult {
  name: string;
  url: string
}

let responseBody: any = null;

export default reactComponentView<{}, PokemonData[]>({
    propsToState: async () => {
      if (!responseBody) {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        responseBody = await response.json();
      }

      return responseBody.results.map((result: PokeAPIResult) => {
        return {
          name: result.name,
          id: parseInt(result.url?.match(/\/(\d+)\//)?.[1] || '0')
        }
      });
    },
    renderComponent: (_, state) => <PokemonList pokemons={state} />
})
