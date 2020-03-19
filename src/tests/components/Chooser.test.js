import React from "react";
import Chooser from "../../components/Chooser";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({
  adapter: new Adapter()
});

describe("Tests for <Chooser /> component", () => {
  let component;
  const func = jest.fn();
  beforeEach(() => {
    component = shallow(<Chooser type="test" onChange={func} />);
  });

  test("should render type button correctly", () => {
    expect(
      component.containsMatchingElement(<div>Seleziona un file test</div>)
    ).toBeTruthy();
  });

  test("should render input element correctly", () => {
    expect(component.find("input").prop("accept")).toEqual(".test");
  });

  test("function passed as prop should be called on event change", () => {
    component.find("input").simulate("change");
    expect(func).toHaveBeenCalled();
  });
});
