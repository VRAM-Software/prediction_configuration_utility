import React from 'react';
import { render } from '@testing-library/react';
import SaveFileName from './SaveFileName';

test("render test component SaveFileName", () => {
    const component = render(<SaveFileName />)
    expect(component).toMatchSnapshot();
});