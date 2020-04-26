import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { SetDataCheckBoxes } from "../../../view/UI";

configure({
    adapter: new Adapter(),
});

describe("Tests for <SetDataCheckBoxes /> component", () => {
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

    test("should render component correctly", () => {
        expect(component).toBeTruthy();
        expect(
            component.containsMatchingElement([
                <div className="checkbox-container"></div>,
                <div className="checkbox-container"></div>,
            ])
        ).toBeTruthy();
    });

    test("function passed as prop should be called on click event", () => {
        component.find(".checkbox-not-selected").simulate("click");
        component.find(".checkbox-selected").simulate("click");
        expect(func2).toBeCalled();
        expect(func1).toBeCalled();

        component.find("span").at(1).simulate("click");
        component.find("span").at(2).simulate("click");
        expect(func1).toBeCalled();
        expect(func2).toBeCalled();
    });
});
