import React from "react";
import TrendLine from "../../view/graphComponents/TrendLine";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";

configure({
    adapter: new Adapter()
});

const propData = [
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 6 },
    { x: 4, y: 8 },
    { x: 5, y: 10 }
];

const propScale = {
    x: jest.fn(),
    y: jest.fn()
};

const propResult = [ [ 2 ] ];

const propParams = ["x", "y"];

describe("Test per il componente TrendLine", () => {
    let component;
    beforeEach(() => {
        component = shallow(<TrendLine
            data = {propData}
            scale = {propScale}
            result = {propResult}
            params = {propParams}
        />);
    });

    test("Render della linea", () => {
        expect(component.containsMatchingElement(<line />)).toEqual(true);
    });

    test("Chiamate d3", () => {
        expect(propScale.x).toHaveBeenNthCalledWith(1,1);
        expect(propScale.y).toHaveBeenNthCalledWith(1,2);
        expect(propScale.x).toHaveBeenNthCalledWith(2,5);
        expect(propScale.y).toHaveBeenNthCalledWith(2,10);
    });

    test("should render component properly", () => {
        expect(component).toBeTruthy();
    });
});
