import styled from "styled-components";
import * as React from "react";

export interface Pokemon {
  name: string;
  id: number;
}

interface PokemonProps {
  pokemon: Pokemon
}

const Button = styled.button`
  border-radius: 3px;
  border: 2px solid palevioletred;
  background: palevioletred;
  color: white;
  padding: 1em 2em;
`;

const Title = styled.h1`
  font-family: sans-serif;
  text-transform: capitalize;
`;

const PokemonNumber = styled.span`
  width: 30px;
  height: 30px;
  background: palevioletred;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 200px;
  margin-right: 20px;
`

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const PokemonWrapper = styled.section`
  max-width: 400px;
  border: 2px solid palevioletred;
  border-radius: 15px;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-gap: 15px;
  text-align: center;
`;

export const Pokemon = ({pokemon}: PokemonProps) => <PokemonWrapper>
  <Heading>
    <PokemonNumber>#{pokemon.id}</PokemonNumber>
    <Title>{pokemon.name}</Title>
  </Heading>
  <div>
    <img src={"https://img.pokemondb.net/sprites/home/normal/" + pokemon.name + ".png"} alt={pokemon.name} />
  </div>
  <Button onClick={(e) => {
    e.target.dispatchEvent(new CustomEvent('add-to-cart', { detail: pokemon, bubbles: true }))
  }}>Add To Cart</Button>
</PokemonWrapper>;
