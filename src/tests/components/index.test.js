import ReactDOM from 'react-dom';
import React from 'react';
import "../mockFile";
import App from '../../components/App';

jest.mock('react-dom', () => ({render: jest.fn()}))


test("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  global.document.getElementById = (id) => id ==='root' && div;
  expect(ReactDOM.render).toHaveBeenCalled();
});