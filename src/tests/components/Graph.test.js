import React from "react";
import Graph from "../../components/Graph";
import ScatterPlot from "../../components/graphComponents/ScatterPlot";
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

  test('should render ScatterPlot component', () => {
    expect(component.containsMatchingElement(<ScatterPlot />)).toBeTruthy();
  });
});