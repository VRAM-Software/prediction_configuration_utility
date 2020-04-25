import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { ChangeParamModal } from "../../view/UI";

configure({
    adapter: new Adapter(),
});

describe("Tests for <ChangeParamModal /> component", () => {
    let component;
    beforeEach(() => {
        component = shallow(<ChangeParamModal data={["weight", "size"]} />);
    });

    test("renders correctly", () => {
        expect(
            component.containsMatchingElement(
                <h4>Seleziona i parametri da utilizzare</h4>
            )
        ).toBeTruthy();
        expect(
            component.containsAllMatchingElements([
                <option value="weight" />,
                <option value="weight" />,
                <option value="size" />,
                <option value="size" />,
            ])
        );
    });
});
