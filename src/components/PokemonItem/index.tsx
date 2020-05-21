import React from 'react';
import './index.css';

import { Pokemon } from '../../reducers/Pokemon/types';

interface StateProps {
  pokemon: Pokemon;
}

export type Props = StateProps;

const PokemonItem: React.FC<Props> = ({ pokemon }) => {
  const { id, name, types, imgUrl } = pokemon;

  return (
    <li className={`pokemon-card ${types[0]}`}>
      <img className="card-image" alt={name} src={imgUrl} />
      <h2 className="card-title">
        {id}. {name}
      </h2>
      <p className="card-subtitle">{types.join(' | ')}</p>
    </li>
  );
};

export default PokemonItem;
