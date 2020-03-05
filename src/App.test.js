import React, { Component } from 'react';
import { render, getByText } from '@testing-library/react';
import App from './App';
import Graph from './components/Graph';

// Things to test:
// enable "salva json" after training
// test notes input
// test all functions
// test all nodejs functions
// test that csv is loaded properly in the state variable of component App
// test that when loading a file that isnt a csv or json theres an error

// Old test that i dont think they should be tested in App:
// graph is enabled when csv is loaded
// notes is enabled when csv is loaded

test('renders learn react link', () => {
  const app = render(<App />);
  window.require = jest.fn();
  const linkElement = getByText(/VRAM Software Web App - PoC 3/i);
  expect(linkElement).toBeInTheDocument();
});

test("Button Salva Json should not be loaded before training", () => {
  const app = render(<App />);
  window.require = jest.fn();
  const element = getByText("Salva json");
  expect(element).toHaveClass("customButtonDisabled");
});

test("Button Salva Json should be loaded after training", () => {
  const app  = render(<App />).setState({ isTrainingDone: true });
  window.require = jest.fn();
  const element = getByText("Salva json");
  expect(element).toHaveClass("customButton");
});


// da correggere
test("csv is loaded properly", () => {
  const app = render(<App />);
  const fileContents = 'Year;Make;Model;Length\n1997;Ford;E350;2,35\n2000;Mercury;Cougar;2,38';
  const expectedFinalState = {jsonFile: fileContents};
  const file = new Blob([fileContents], {type: 'application/json'});
  app.findByText('Seleziona un file json').simulate('change', {target: {files: [file]}});
  expect(component.state).toEqual(expectedFinalState);
});

// idk if it works
test("json is loaded properly", () => {
  const app = render(<App />);
  const fileContents = '{ "name": "asd", "age": "12", "weight": "128lb" }';
  const expectedFinalState = {jsonFile: fileContents};
  const file = new Blob([fileContents], {type: 'application/json'});
  app.findByText('Seleziona un file json').simulate('change', {target: {files: [file]}});
  expect(component.state).toEqual(expectedFinalState);
});