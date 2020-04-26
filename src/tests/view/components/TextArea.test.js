import React from "react";
import { TextArea } from "../../../view/UI";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({
    adapter: new Adapter(),
});

describe("Tests for <TextArea /> component", () => {
    let component;
    const func = jest.fn();
    beforeEach(() => {
        component = shallow(<TextArea onChange={func} />);
    });

    test("should render component correctly", () => {
        expect(component).toBeTruthy();
        expect(component.find("textarea").exists()).toBeTruthy();
    });

    test("function passed as prop should be called on change event", () => {
        component.find("textarea").simulate("change");
        expect(func).toHaveBeenCalled();
    });
});
