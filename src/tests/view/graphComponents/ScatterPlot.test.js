import React from "react";
import ScatterPlot from "../../../view/graphComponents/ScatterPlot";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import Axis from "../../../view/graphComponents/Axis";
import RenderDataSvm from "../../../view/graphComponents/RenderDataSvm";
import Grid from "../../../view/graphComponents/Grid";

const data = [
    { weight: 1, size: 1, label: 1 },
    { weight: 2, size: 2, label: 2 },
];
const results = {
    result: {
        N: 2,
        D: 2,
    },
};

const params = ["weight", "size"];

configure({ adapter: new Adapter() });

describe("Tests for <ScatterPlot /> component", () => {
    let component;
    beforeEach(() => {
        component = shallow(
            <ScatterPlot
                data={data}
                result={results}
                params={params}
                paramLength={3}
                algorithm="svm"
            />
        );
    });

    test("should render component correctly", () => {
        expect(component.containsMatchingElement(<RenderDataSvm />)).toEqual(
            true
        );
        expect(component.containsMatchingElement(<Grid />)).toEqual(true);
        expect(component.containsMatchingElement(<Axis axis="x" />)).toEqual(
            true
        );
        expect(component.containsMatchingElement(<Axis axis="y" />)).toEqual(
            true
        );
    });
});
