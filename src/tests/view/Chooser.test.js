import React from "react";
import Chooser from "../../view/ui/Chooser";
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

    test("should render component correctly", () => {
        expect(component).toBeTruthy();
    });

    test("function passed as prop should be called on event change", () => {
        component.find("input").simulate("change");
        expect(func).toHaveBeenCalled();
    });

    test("button should change color if file is chosen", () => {
        const componentFileChosen = shallow(
            <Chooser type="test" onChange={func} isFileChosen={true} />
        );
        expect(componentFileChosen.find(".file-chosen").exists()).toBeTruthy();
    });
});
