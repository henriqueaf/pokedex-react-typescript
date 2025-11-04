import React, { createContext, useEffect, useState, useCallback } from 'react';
import { usePokemonReducer } from '../../reducers/Pokemon';
import { Pokemon } from '../../reducers/Pokemon/types';
import { addPokemons } from '../../reducers/Pokemon/actions';
import { getFirstPageUrl, processPromisesInBatches } from './utils';

interface PokemonContextData {
  pokemons: Pokemon[];
  loading: boolean;
}

interface RequestResultObject {
  name: string;
  url: string;
}

const PokemonContext = createContext<PokemonContextData>(
  {} as PokemonContextData
);

const PokemonProvider: React.FC = ({ children }) => {
  const [state, dispatch] = usePokemonReducer();
  const { pokemons } = state;

  const [loading, setLoading] = useState(false);

  const providerValue = {
    pokemons,
    loading,
  };

  const addPokemonsFromRequestResult = useCallback(
    async (requestResultArray: RequestResultObject[]) => {
      const pokemonPromises: Promise<any>[] = [];

      requestResultArray.forEach((resultObject) => {
        pokemonPromises.push(
          fetch(resultObject.url).then((response) => response.json())
        );
      });

      await processPromisesInBatches(pokemonPromises, 10).then((pokemons) => {
        const parsedPokemons = pokemons.map((pokemonJson) => ({
          id: pokemonJson.id,
          name: pokemonJson.name,
          types: pokemonJson.types.map(
            (typeInfo: { type: { name: string } }) => typeInfo.type.name
          ),
          imgUrl: pokemonJson.sprites.other.home.front_default
        }));

        localStorage.setItem('parsedPokemons', JSON.stringify(parsedPokemons));
        dispatch(addPokemons(parsedPokemons));
      });

      setLoading(false);
    },
    [dispatch]
  );

  const fetchPokemons = useCallback(
    (url: string, acc: Array<any>) => {
      setLoading(true);

      fetch(url)
        .then((response) => response.json())
        .then((jsonResponse) => {
          const joinedResults = [...acc, ...jsonResponse.results];

          if (jsonResponse.next) {
            fetchPokemons(jsonResponse.next, joinedResults);
          } else {
            addPokemonsFromRequestResult(joinedResults);
          }
        });
    },
    [addPokemonsFromRequestResult]
  );

  useEffect(() => {
    const savedParsedPokemons = localStorage.getItem('parsedPokemons');

    if (savedParsedPokemons) {
      dispatch(addPokemons(JSON.parse(savedParsedPokemons)));
      return;
    }

    fetchPokemons(getFirstPageUrl(), []);
  }, [fetchPokemons, dispatch]);

  return (
    <PokemonContext.Provider value={providerValue}>
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
