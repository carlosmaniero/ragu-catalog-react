import * as React from "react";
import {reactComponentHydrate} from "../../ragu-react-hydrate";
import {PokemonDetails} from "../../react-components/pokemon-details";

interface Pokemon {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: Record<string, string>
}

export default reactComponentHydrate<{}, Pokemon>({
    renderComponent: (_, state) => <PokemonDetails pokemon={state} />
})
