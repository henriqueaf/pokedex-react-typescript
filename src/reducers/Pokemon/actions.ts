import { action } from 'typesafe-actions';
import { ActionTypes, Pokemon } from './types';

export const addPokemon = (pokemon: Pokemon) =>
  action(ActionTypes.ADD_POKEMON, pokemon);
