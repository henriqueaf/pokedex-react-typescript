import React from 'react';

import { PokemonProvider } from './contexts/PokemonContext';
import PokemonList from './components/PokemonList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './App.css';

const App = () => (
  <>
    <div className="main">
      <div className="header">Pokédex</div>
    </div>
    <PokemonProvider>
      <PokemonList />
    </PokemonProvider>
  </>
);

export default App;
