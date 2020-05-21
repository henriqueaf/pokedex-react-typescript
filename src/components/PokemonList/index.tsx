import React, { useContext } from 'react';
import './index.css';

import PokemonItem from '../PokemonItem';
import { PokemonContext } from '../../contexts/PokemonContext';

const PokemonList: React.FC = () => {
  const { pokemons, loading } = useContext(PokemonContext);

  return (
    <div className="pokemon-list-container">
      <ul>
        {!loading &&
          pokemons.map((pokemon) => (
            <PokemonItem
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
            />
          ))}
      </ul>
    </div>
  );
};

export default PokemonList;
