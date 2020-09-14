import * as React from "react";
import {PokemonList} from "../../react-components/pokemon-list";
import {reactComponentHydrate} from "../../ragu-react-hydrate";

export interface PokemonData {
  name: string;
  id: number;
}

export default reactComponentHydrate<{}, PokemonData[]>({
    renderComponent: (_, state) => <PokemonList pokemons={state} />
})
