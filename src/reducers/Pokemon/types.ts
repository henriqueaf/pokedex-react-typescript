/**
 * Data types
 */
export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  imgUrl: string;
}

export interface PokemonsList {
  pokemons: Pokemon[];
}

/**
 * Action Types
 */
export enum ActionTypes {
  ADD_POKEMON = '@pokemon/ADD_POKEMON',
  ADD_POKEMONS = '@pokemon/ADD_POKEMONS',
  LOAD_POKEMONS = '@pokemon/LOAD_POKEMONS',
}

export type ActionType =
  | { type: ActionTypes.ADD_POKEMON; payload: Pokemon }
  | { type: ActionTypes.ADD_POKEMONS; payload: Pokemon[] };

/**
 * State type
 */
export interface State {
  readonly pokemons: Pokemon[];
}
