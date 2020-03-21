import React from "react";
import SaveFileName from "../../components/SaveFileName";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({
    adapter: new Adapter()
});

describe("Tests for <SaveFileName /> component", () => {
    let component;
    const func = jest.fn();
    beforeEach(() => {
        component = shallow(<SaveFileName handleChange={func} />);
    });

    test("should render input", () => {
        expect(component.find("input").exists()).toBeTruthy();
    });

    test("should call function passed as prop on change", () => {
        component.find("input").simulate("change");
        expect(func).toHaveBeenCalled();
    });
});
