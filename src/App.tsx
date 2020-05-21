import React from 'react';

import { PokemonProvider } from './contexts/PokemonContext';
import PokemonList from './components/PokemonList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => (
  <PokemonProvider>
    <div className="main">
      <div className="header">Pokédex</div>
    </div>
    <PokemonList />
  </PokemonProvider>
);

export default App;
