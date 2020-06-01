const BASE_URL = 'https://pokeapi.co/api/v2';
const PAGE_LIMIT = 100;

export const getFirstPageUrl = () => `${BASE_URL}/pokemon?limit=${PAGE_LIMIT}`;

export const getPokemonUrl = (id: string | null) => `${BASE_URL}/pokemon/${id}`;

export const getPokemonImageUrl = (id: string) =>
  `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
