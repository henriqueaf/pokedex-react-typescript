import React, { createContext, useEffect, useState } from 'react';
import { usePokemonReducer } from '../reducers/Pokemon';
import { Pokemon } from '../reducers/Pokemon/types';
import { addPokemon } from '../reducers/Pokemon/actions';

interface PokemonContextData {
  pokemons: Pokemon[];
  loading: boolean;
}

const PokemonContext = createContext<PokemonContextData>(
  {} as PokemonContextData
);

const PokemonProvider: React.SFC = ({ children }) => {
  const [state, dispatch] = usePokemonReducer();
  const [loading, setLoading] = useState(true);
  const { pokemons } = state;

  const providerValue = {
    pokemons,
    loading,
  };

  const getPokemonUrl = (id: Number) =>
    `https://pokeapi.co/api/v2/pokemon/${id}`;

  const getPokemonImageUrl = (id: Number) =>
    `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

  useEffect(() => {
    const pokemonPromises = [];

    for (let i = 1; i <= 150; i++) {
      pokemonPromises.push(
        fetch(getPokemonUrl(i)).then((response) => response.json())
      );
    }

    Promise.all(pokemonPromises).then((pokemons) => {
      pokemons.forEach((pokemonJson) =>
        dispatch(
          addPokemon({
            id: pokemonJson.id,
            name: pokemonJson.name,
            types: pokemonJson.types.map(
              (typeInfo: { type: { name: string } }) => typeInfo.type.name
            ),
            imgUrl: getPokemonImageUrl(pokemonJson.id),
          })
        )
      );

      setLoading(false);
    });
  }, [dispatch]);

  return (
    <PokemonContext.Provider value={providerValue}>
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
