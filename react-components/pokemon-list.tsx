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

const PokemonListWrapper = styled.div`
  display: grid;
  grid-gap: 20px;

  @media screen and (min-width: 550px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media screen and (min-width: 1500px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  @media screen and (min-width: 1900px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`;

export const PokemonList = ({pokemons}: PokemonListProps) => <PokemonListWrapper>
  {pokemons.map((pokemon) => <Pokemon pokemon={pokemon} key={pokemon.name} />)}
</PokemonListWrapper>
