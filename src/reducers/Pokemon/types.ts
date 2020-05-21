/**
 * Data types
 */
export interface Pokemon {
  id: number;
  name: string;
  types: string[];
}

export interface PokemonsList {
  pokemons: Pokemon[];
}

/**
 * Action Types
 */
export enum ActionTypes {
  ADD_POKEMON = '@pokemon/ADD_POKEMON',
  LOAD_POKEMONS = '@pokemon/LOAD_POKEMONS',
}

export type ActionType = { type: ActionTypes.ADD_POKEMON; payload: Pokemon };

/**
 * State type
 */
export interface State {
  readonly pokemons: Pokemon[];
}
