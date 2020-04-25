import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { CheckBoxes } from "../../../view/UI";

configure({
    adapter: new Adapter(),
});

describe("Tests for <CheckBoxes /> component", () => {
    let component;

    const func = jest.fn();
    beforeEach(() => {
        component = shallow(
            <CheckBoxes
                algorithms={[
                    { name: "svm", desc: "Support Vector Machine" },
                    { name: "rl", desc: "Regressione Lineare" },
                ]}
                handleCheckBox={func}
                algorithm="svm"
            />
        );
    });

    test("Should render correctly", () => {
        expect(component).toBeTruthy();
    });

    test("Should render two elements that represent the algorithm", () => {
        expect(
            component.find("span[children='Support Vector Machine']")
        ).toBeTruthy();
        expect(
            component.find("span[children='Regressione Lineare']")
        ).toBeTruthy();
    });

    test("Clicking on the button should call method passed as prop", () => {
        component.find(".checkbox-not-selected").simulate("click");
        expect(func).toBeCalled();
    });
});