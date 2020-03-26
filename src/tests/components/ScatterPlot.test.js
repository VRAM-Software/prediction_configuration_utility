import React from "react";
import ScatterPlot from "../../components/graphComponents/ScatterPlot";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import Axis from "../../components/graphComponents/Axis";
import RenderCircles from "../../components/graphComponents/RenderCircles";

const data = [
	{ weight: 1, size: 1, label: 1 },
	{ weight: 2, size: 2, label: 2 }
];

// ============= UTILS =============
configure({	adapter: new Adapter()});

// ============= TESTS =============
describe("Test per il componente ScatterPlot", () => {
	let component;
	beforeEach(() => {
		component = shallow(<ScatterPlot data={data} />);
	});

  // ============= COMPONENT MUST RENDER CORRECTLY =============
	test("renders RenderCircles child component", () => {
    expect(component.containsMatchingElement(<RenderCircles />)).toEqual(true);
  });

	test("renders Axis X child component", () => {
		expect(component.containsMatchingElement(<Axis axis='x' />)).toEqual(true);
  });

	test("renders Axis Y child component", () => {
		expect(component.containsMatchingElement(<Axis axis='y'/>)).toEqual(true);
  });

});
