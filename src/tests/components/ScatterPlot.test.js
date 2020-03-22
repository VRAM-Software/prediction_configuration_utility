import React from "react";
import ScatterPlot from "../../components/graphComponents/ScatterPlot";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";

import Axis from "../../components/graphComponents/Axis";
import TrendLine from "../../components/graphComponents/TrendLine";
import RenderCircles from "../../components/graphComponents/RenderCircles";



// ============= UTILS =============
configure({	adapter: new Adapter()});

// ============= TESTS =============
describe("Test per il componente ScatterPlot", () => {
	let component;
	beforeEach(() => {
		component = shallow(<ScatterPlot />);
	});

  // ============= COMPONENT MUST RENDER CORRECTLY =============
	test("renders RenderCircles child component", () => {
    expect(component.containsMatchingElement(<RenderCircles />)).toEqual(true);
  });

	//test("renders TrendLine child component", () => {
  //  expect(component.containsMatchingElement(<TrendLine />)).toEqual(true);
  //});

	test("renders Axis X child component", () => {
		expect(component.containsMatchingElement(<Axis axis='x' />)).toEqual(true);
  });

	test("renders Axis Y child component", () => {
		expect(component.containsMatchingElement(<Axis axis='y'/>)).toEqual(true);
  });

});
