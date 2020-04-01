import React from "react";
import Graph from "../../view/ui/Graph";
import ScatterPlot from "../../view/graphComponents/ScatterPlot";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({
    adapter: new Adapter()
});

describe("Tests for <Graph /> component", () => {
    let component;
    beforeEach(() => {
        component = shallow(<Graph />);
    });

    test("should render ScatterPlot component", () => {
        expect(component.containsMatchingElement(<ScatterPlot />)).toBeTruthy();
    });
});
