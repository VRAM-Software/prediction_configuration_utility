import React from 'react';
import { render } from '@testing-library/react';
import UserNotes from './UserNotes';
import { interpolate } from 'd3';

test("render test component UserNotes", () => {
    const component = render(<UserNotes />)
    expect(component).toMatchSnapshot();
});
