import React from 'react';
import './mockFile';
import { render, getByText, fireEvent, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('VRAM Software Applicativo Esterno - PoC 3');
  expect(linkElement).toBeInTheDocument();
});

test("Button Salva Json should not be loaded before training", () => {
  const { getByText } = render(<App />);
  const element = getByText("Salva json");
  expect(element).toHaveClass("customButtonDisabled");
});
