import { useReducer } from 'react';
import { State, ActionType, ActionTypes } from './types';

const INITIAL_STATE: State = {
  pokemons: [],
};

const PokemonReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case ActionTypes.ADD_POKEMON:
      return {
        pokemons: [...state.pokemons, action.payload],
      };
    default:
      return state;
  }
};

export const usePokemonReducer = () =>
  useReducer(PokemonReducer, INITIAL_STATE);
