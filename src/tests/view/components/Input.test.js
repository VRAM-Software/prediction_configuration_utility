import React from "react";
import { Input } from "../../../view/UI";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({
    adapter: new Adapter(),
});

describe("Tests for <SaveFileName /> component", () => {
    let component;
    const func = jest.fn();
    beforeEach(() => {
        component = shallow(<Input handleChange={func} />);
    });

    test("should render component correctly", () => {
        expect(component).toBeTruthy();
        expect(component.find("input").exists()).toBeTruthy();
    });

    test("function passed as prop should be called on change event", () => {
        component.find("input").simulate("change");
        expect(func).toHaveBeenCalled();
    });
});
