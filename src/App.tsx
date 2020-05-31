import React from 'react';

import PokemonListContainer from './components/PokemonList/container';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './App.css';

const App = () => (
  <>
    <div className="main">
      <div className="header">Pokédex</div>
    </div>
    <PokemonListContainer />
  </>
);

export default App;
