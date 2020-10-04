import * as React from "react";
import styled from "styled-components";
import {useState} from "react";

interface Props {
  pokemon: {
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    sprites: Record<string, string>
  }
}

const PokemonDetailsWrapper = styled.section`
  font-family: sans-serif;

`;

const TitleSection = styled.header`
  display: flex;
  align-items: center;
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  margin-right: 20px;
  
  img {
    width: 96px;
    height: 96px;
  }
  
  button {
    background: palevioletred;
    color: white;
    border: 0;
    width: 40px;
  }
  
  button.disabled {
    background: lightgrey;  
  }
  
  button:first-child {
    border-radius: 10px 0 0 10px;
  }
  
  button:last-child {
    border-radius: 0 10px 10px 0;
  }
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    margin-right: 20px;
    display: inline-block;
  }
`;


export const PokemonDetails = ({pokemon}: Props) => {
  const [currentImage, setCurrentImage] = useState(0);

  const sprites = Object.keys(pokemon.sprites)
      .filter((key) => typeof pokemon.sprites[key] === 'string')
      .map((key) => pokemon.sprites[key]);

  const images = [
    "https://img.pokemondb.net/sprites/home/normal/" + pokemon.name + ".png",
    ...sprites
  ]

  return <PokemonDetailsWrapper>
    <TitleSection>
      <ImageGallery>
        <button className={currentImage === 0 ? 'disabled' : ''} onClick={() => currentImage > 0 && setCurrentImage(currentImage - 1)}>&lt;️</button>
        <img src={images[currentImage]} alt={pokemon.name} />
        <button className={currentImage === images.length - 1 ? 'disabled' : ''} onClick={() => currentImage < images.length - 1 && setCurrentImage(currentImage + 1)}>&gt;️</button>
      </ImageGallery>

      <div>
        <h1>{pokemon.name.toUpperCase()}</h1>

        <SkillList>
          <li>📏 {pokemon.weight}w x {pokemon.height}h</li>
          <li>💪 {pokemon.base_experience}</li>
        </SkillList>
      </div>
    </TitleSection>
  </PokemonDetailsWrapper>;
}

