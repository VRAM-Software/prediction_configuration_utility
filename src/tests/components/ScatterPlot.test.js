import React from "react";
import ScatterPlot from "../../view/graphComponents/ScatterPlot";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import Axis from "../../view/graphComponents/Axis";
import RenderCircles from "../../view/graphComponents/RenderCircles";
import Grid from "../../view/graphComponents/Grid";

const data = [
    { weight: 1, size: 1, label: 1 },
    { weight: 2, size: 2, label: 2 }
];

const result = {
	w: [1,1],
	b: 1
};

const params = [
    "weight", "size"
]

configure({ adapter: new Adapter() });

describe("Test per il componente ScatterPlot", () => {
    let component;
    beforeEach(() => {
        component = shallow(<ScatterPlot data={data} result={result} params={params} />);
    });

    test("renders RenderCircles child component", () => {
        expect(component.containsMatchingElement(<RenderCircles />)).toEqual(
            true
        );
	});
	
	test("renders Grid component if props result exist", () => {
		expect(component.containsMatchingElement(<Grid result={result} />)).toEqual(
            true
        );
	});

    test("renders Axis X child component", () => {
        expect(component.containsMatchingElement(<Axis axis="x" />)).toEqual(
            true
        );
    });

    test("renders Axis Y child component", () => {
        expect(component.containsMatchingElement(<Axis axis="y" />)).toEqual(
            true
        );
    });
});
