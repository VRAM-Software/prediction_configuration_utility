import React from "react";
import TrendLine from "../../view/graphComponents/TrendLine";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";

configure({
    adapter: new Adapter()
});

const propData = [
    { weight: 1, size: 1 },
    { weight: 2, size: 2 },
    { weight: 3, size: 3 },
    { weight: 4, size: 4 },
    { weight: 5, size: 5 }
];

const propScale = {
    x: jest.fn(),
    y: jest.fn()
};

describe("Test per il componente TrendLine", () => {
    let component;
    beforeEach(() => {
        component = shallow(<TrendLine data={propData} scale={propScale} />);
    });

    test("Render della linea", () => {
        expect(component.containsMatchingElement(<line />)).toEqual(true);
    });

    test("Chiamate d3", () => {
        expect(propScale.x).toHaveBeenNthCalledWith(1, 1);
        expect(propScale.y).toHaveBeenNthCalledWith(1, 1);
        expect(propScale.x).toHaveBeenNthCalledWith(2, 5);
        expect(propScale.y).toHaveBeenNthCalledWith(2, 5);
    });
});
