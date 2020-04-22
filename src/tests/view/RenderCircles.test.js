import React from "react";
import RenderCircles from "../../view/graphComponents/RenderCircles";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";

// ================ UTILS ================
configure({ adapter: new Adapter() });

const propData = [
  { weight: 1, size: 1, label: 1 },
  { weight: 1, size: 1, label: -1 },
];

const params = ["weight", "size", "label"];

const propScale = {
  x: jest.fn(),
  y: jest.fn(),
};

// ================ TESTS ================
describe("<RenderCircles /> component", () => {
  let component;
  beforeEach(() => {
    component = shallow(<RenderCircles data={propData} scale={propScale} params={params} />);
  });

  // ================ COMPONENT RENDERING ================

  test("renders circle", () => {
    expect(component.containsMatchingElement(<circle />)).toEqual(true);
  });

  test("renders green circle if algorithm is svm and label is 1", () => {
    const component = mount(
      <svg>
        <RenderCircles data={[propData[0]]} params={params} algorithm='svm' scale={propScale} />
      </svg>
    );
    expect(component.find("circle").prop("style")).toHaveProperty("fill", "green");
  });

  test("renders red circle if algorithm is svm and label is different from 1", () => {
    const component = mount(
      <svg>
        <RenderCircles data={[propData[1]]} params={params} algorithm='svm' scale={propScale} />
      </svg>
    );
    expect(component.find("circle").prop("style")).toHaveProperty("fill", "red");
  });

  test("renders black circle if algorithm is rl", () => {
    const component = mount(
      <svg>
        <RenderCircles data={[propData[1]]} params={params} algorithm='rl' scale={propScale} />
      </svg>
    );
    expect(component.find("circle").prop("style")).toHaveProperty("fill", "black");
  });
});
