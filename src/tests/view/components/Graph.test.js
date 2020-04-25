import React from "react";
import { Graph } from "../../../view/UI";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import ScatterPlot from "../../../view/graphComponents/ScatterPlot";

configure({
    adapter: new Adapter(),
});

describe("Tests for <Graph /> component", () => {
    let component;
    beforeEach(() => {
        component = shallow(<Graph />);
    });

    test("should render <ScatterPlot /> correctly", () => {
        expect(component.containsMatchingElement(<ScatterPlot />)).toBeTruthy();
    });

    test("should render component correctly", () => {
        expect(component).toBeTruthy();
    });
});
