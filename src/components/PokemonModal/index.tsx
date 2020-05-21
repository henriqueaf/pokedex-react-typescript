import React from 'react';
import { Modal } from 'react-bootstrap';
import { Pokemon } from '../../reducers/Pokemon/types';

interface StateProps {
  show: boolean;
  pokemon: Pokemon | null;
}

interface DispatchProps {
  handleClose(): void;
}

export type Props = StateProps & DispatchProps;

const PokemonModal: React.FC<Props> = ({ show, handleClose, pokemon }) => {
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{pokemon?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    </Modal>
  );
};

export default PokemonModal;
