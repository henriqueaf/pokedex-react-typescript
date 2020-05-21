import React from 'react';
import './index.css';

import { Pokemon } from '../../reducers/Pokemon/types';

type StateProps = Pokemon;

export type Props = StateProps;

const PokemonItem: React.FC<Props> = ({ id, name, types }) => (
  <li className={`card ${types[0]}`}>
    <img
      className="card-image"
      alt={name}
      src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
    />
    <h2 className="card-title">
      {id}. {name}
    </h2>
    <p className="card-subtitle">{types.join(' | ')}</p>
  </li>
);

export default PokemonItem;
