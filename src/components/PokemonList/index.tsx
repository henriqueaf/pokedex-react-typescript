import React, { useContext, useEffect, useState, MouseEvent } from 'react';
import { FormGroup } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import './index.css';

import PokemonItem from '../PokemonItem';
import { PokemonContext } from '../../contexts/PokemonContext';
import { Pokemon } from '../../reducers/Pokemon/types';
import PokemonModal from '../PokemonModal';
import Pokeball from '../../images/pokeball.png';

const PokemonList: React.FC = () => {
  const { pokemons, loading } = useContext(PokemonContext);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  const handlePokemonClick = (pokemon: Pokemon) => (
    e: MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setSelectedPokemon(pokemon);
  };

  const handleFilterTextChange = (input: string, event: Event) => {
    if (Boolean(input)) {
      const newArray = pokemons.filter((el) => includes(el.name, input));
      setFilteredPokemons(newArray);
    } else {
      setFilteredPokemons(pokemons);
    }
  };

  const handleFilterOptionSelected = (selected: Pokemon[]) => {
    if (isEmpty(selected)) {
      setFilteredPokemons(pokemons);
    } else {
      setFilteredPokemons(selected);
    }
  };

  return (
    <div className="pokemon-list-container">
      <PokemonModal
        show={Boolean(selectedPokemon)}
        handleClose={() => setSelectedPokemon(null)}
        pokemon={selectedPokemon}
      />

      <div className="pokemon-filter">
        <FormGroup controlId="pokemonFilter">
          <Typeahead
            onChange={handleFilterOptionSelected}
            onInputChange={handleFilterTextChange}
            options={pokemons}
            labelKey="name"
            multiple={false}
            placeholder="Filter Pokemon by name"
            id="pokemon-filter-typeahead"
            maxResults={10}
          />
        </FormGroup>
      </div>

      {loading && (
        <div className="loading-container">
          <img src={Pokeball} alt="Pokeball" className="loading" />
        </div>
      )}

      <ul>
        {!loading &&
          filteredPokemons.map((pokemon) => (
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
