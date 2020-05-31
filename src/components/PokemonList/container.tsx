import React from 'react';

import { PokemonProvider } from '../../contexts/PokemonContext';
import PokemonList from './index';

const Container = () => (
  <PokemonProvider>
    <PokemonList />
  </PokemonProvider>
);

export default Container;
