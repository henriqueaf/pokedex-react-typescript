import React, {
  useContext,
  useEffect,
  useState,
  MouseEvent,
  ChangeEvent,
} from 'react';
import { Form } from 'react-bootstrap';
import includes from 'lodash/includes';
import './index.css';

import PokemonItem from '../PokemonItem';
import { PokemonContext } from '../../contexts/PokemonContext';
import { Pokemon } from '../../reducers/Pokemon/types';
import PokemonModal from '../PokemonModal';

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

  interface FormControlElement {
    value: string;
  }

  const handleFilter = (event: ChangeEvent<FormControlElement>) => {
    const filterText = event.target.value;

    if (Boolean(filterText)) {
      const newArray = pokemons.filter((el) => includes(el.name, filterText));
      setFilteredPokemons(newArray);
    } else {
      setFilteredPokemons(pokemons);
    }
  };

  return (
    <div className="pokemon-list-container">
      <div className="pokemon-filter">
        <Form>
          <Form.Group controlId="pokemonFilter">
            <Form.Control
              onChange={handleFilter}
              type="text"
              placeholder="Filter Pokemon by name"
            />
          </Form.Group>
        </Form>
      </div>

      <PokemonModal
        show={Boolean(selectedPokemon)}
        handleClose={() => setSelectedPokemon(null)}
        pokemon={selectedPokemon}
      />

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
