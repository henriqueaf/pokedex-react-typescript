import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders Pokédex string', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Pokédex/i);
  expect(linkElement).toBeInTheDocument();
});
