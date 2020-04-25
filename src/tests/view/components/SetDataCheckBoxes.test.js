import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { SetDataCheckBoxes } from "../../../view/UI";

configure({
    adapter: new Adapter(),
});

describe("Tests for <CheckBoxes /> component", () => {
    let component;

    const func1 = jest.fn();
    const func2 = jest.fn();
    beforeEach(() => {
        component = shallow(
            <SetDataCheckBoxes
                viewDataTraining={true}
                algorithm="svm"
                handleViewDataTest={func1}
                handleViewDataTraining={func2}
            />
        );
    });

    test("Should render correctly", () => {
        expect(component).toBeTruthy();
    });

    test("Should render two elements that represent the algorithm", () => {
        expect(
            component.containsMatchingElement([
                <div className="checkbox-container"></div>,
                <div className="checkbox-container"></div>,
            ])
        ).toBeTruthy();
    });

    test("Clicking on the text / button should call method passed as prop", () => {
        component.find(".checkbox-not-selected").simulate("click");
        expect(func1).toBeCalled();
    });
});
