import React from "react";
import {
    ControlPanel,
    CheckBoxes,
    SetDataCheckBoxes,
    TextArea,
    ResultPanel,
    Button,
} from "../../../view/UI";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({
    adapter: new Adapter(),
});

describe("Tests for <ControlPanel /> component", () => {
    let component;
    beforeEach(() => {
        component = shallow(<ControlPanel />);
    });

    test("should render component correctly", () => {
        expect(component).toBeTruthy();
        expect(
            component.containsAllMatchingElements([
                <CheckBoxes />,
                <SetDataCheckBoxes />,
                <TextArea />,
                <ResultPanel />,
                <Button />,
            ])
        ).toBeTruthy();
    });
});
