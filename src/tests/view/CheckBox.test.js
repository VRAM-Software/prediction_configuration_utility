import React from "react";
import CheckBox from "../../view/ui/CheckBox";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({
    adapter: new Adapter()
});

describe("Tests for <CheckBox /> component", () => {
    let component;

    const func = jest.fn();
    beforeEach(() => {
        component = shallow(
            <CheckBox
                algorithms={[
                    { name: "svm", desc: "Support Vector Machine" },
                    { name: "rl", desc: "Regressione Lineare" }
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

    test("Clickin on the text / button should call method passed as prop", () => {
        component.find(".checkNotSelected").simulate("click");
        expect(func).toBeCalled();
    });
});
