import React from "react";
import TrendLine from "../../../view/graphComponents/TrendLine";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";

configure({
    adapter: new Adapter(),
});

const propData = [
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 6 },
    { x: 4, y: 8 },
    { x: 5, y: 10 },
];

const propScale = {
    x: jest.fn(),
    y: jest.fn(),
};

const propResult = [[0], [2]];

const propParams = ["x", "y"];

describe("Tests for <TrendLine /> component", () => {
    let component;
    beforeEach(() => {
        component = shallow(
            <TrendLine
                data={propData}
                scale={propScale}
                result={propResult}
                params={propParams}
            />
        );
    });

    test("should render component correctly", () => {
        expect(component).toBeTruthy();
        expect(component.containsMatchingElement(<line />)).toEqual(true);
    });

    test("function passed as prop should be called", () => {
        expect(propScale.x).toHaveBeenNthCalledWith(1, 1);
        expect(propScale.y).toHaveBeenNthCalledWith(1, 2);
        expect(propScale.x).toHaveBeenNthCalledWith(2, 5);
        expect(propScale.y).toHaveBeenNthCalledWith(2, 10);
    });
});
