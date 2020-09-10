import * as React from "react";
import styled from "styled-components";
import {Pokemon} from "./pokemon";

export interface PokemonData {
  name: string;
  id: number;
}

interface PokemonListProps {
  pokemons: PokemonData[]
}

const PokemonItem = styled.div`
  float: left;
  min-width: 280px;
  margin-right: 20px;
  margin-bottom: 20px;
`;

export const PokemonList = ({pokemons}: PokemonListProps) => <>
  {pokemons.map((pokemon) => <PokemonItem key={pokemon.name}><Pokemon pokemon={pokemon} /></PokemonItem>)}
</>
