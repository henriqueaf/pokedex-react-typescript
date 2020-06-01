import React, { createContext, useEffect, useState, useCallback } from 'react';
import { usePokemonReducer } from '../../reducers/Pokemon';
import { Pokemon } from '../../reducers/Pokemon/types';
import { addPokemons } from '../../reducers/Pokemon/actions';
import { getFirstPageUrl, getPokemonUrl, getPokemonImageUrl } from './utils';

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

const PokemonProvider: React.SFC = ({ children }) => {
  const [state, dispatch] = usePokemonReducer();
  const { pokemons } = state;

  const [loading, setLoading] = useState(false);

  const providerValue = {
    pokemons,
    loading,
  };

  const addPokemonsFromRequestResult = useCallback(
    (requestResultArray: RequestResultObject[]) => {
      const pokemonPromises: Promise<any>[] = [];

      requestResultArray.forEach((resultObject) => {
        const regexResult = new RegExp('/([0-9]+)/', 'g').exec(
          resultObject.url
        );
        const pokemonId = regexResult && regexResult[1];

        pokemonPromises.push(
          fetch(getPokemonUrl(pokemonId)).then((response) => response.json())
        );
      });

      Promise.all(pokemonPromises).then((pokemons) => {
        const parsedPokemons = pokemons.map((pokemonJson) => ({
          id: pokemonJson.id,
          name: pokemonJson.name,
          types: pokemonJson.types.map(
            (typeInfo: { type: { name: string } }) => typeInfo.type.name
          ),
          imgUrl: getPokemonImageUrl(pokemonJson.id),
        }));

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

          // if (jsonResponse.next) {
          //   fetchPokemons(jsonResponse.next, joinedResults);
          // } else {
          addPokemonsFromRequestResult(joinedResults);
          // }
        });
    },
    [addPokemonsFromRequestResult]
  );

  useEffect(() => {
    fetchPokemons(getFirstPageUrl(), []);
  }, [fetchPokemons]);

  return (
    <PokemonContext.Provider value={providerValue}>
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
