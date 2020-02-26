import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders VRAM Software Web App - PoC 1 text', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/VRAM Software Web App - PoC 1/i);
  expect(linkElement).toBeInTheDocument();
});
