import React from 'react';
import { render } from '@testing-library/react';
import Chooser from './Chooser';

test("render test component Chooser", () => {
    const component = render(<Chooser />)
    expect(component).toMatchSnapshot();
});