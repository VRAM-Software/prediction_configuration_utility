import React from 'react';
import Chooser from './Chooser';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
// import { render, getByLabelText, getByText, getByAltText } from '@testing-library/react'

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Chooser component renders with text 'Seleziona un file csv/json'", () => {
    act(() => {
        ReactDOM.render(<Chooser type="csv" />, container);
    });
    expect(container.textContent).toBe("Seleziona un file csv");

    act(() => {
        ReactDOM.render(<Chooser type="json" />, container);
    });
    expect(container.textContent).toBe("Seleziona un file json");
});