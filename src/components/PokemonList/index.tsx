import React, { useContext, useState, MouseEvent } from 'react';
import './index.css';

import PokemonItem from '../PokemonItem';
import { PokemonContext } from '../../contexts/PokemonContext';
import { Pokemon } from '../../reducers/Pokemon/types';
import PokemonModal from '../PokemonModal';

const PokemonList: React.FC = () => {
  const { pokemons, loading } = useContext(PokemonContext);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const handlePokemonClick = (pokemon: Pokemon) => (
    e: MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setSelectedPokemon(pokemon);
  };

  return (
    <div className="pokemon-list-container">
      <PokemonModal
        show={Boolean(selectedPokemon)}
        handleClose={() => setSelectedPokemon(null)}
        pokemon={selectedPokemon}
      />

      <ul>
        {!loading &&
          pokemons.map((pokemon) => (
            <a
              key={pokemon.id}
              className="pokemon-link"
              href="#none"
              onClick={handlePokemonClick(pokemon)}
            >
              <PokemonItem pokemon={pokemon} />
            </a>
          ))}
      </ul>
    </div>
  );
};

export default PokemonList;
