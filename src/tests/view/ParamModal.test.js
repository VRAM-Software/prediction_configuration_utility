import React from "react";
import ParamModal from "../../view/ui/ParamModal";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({
    adapter: new Adapter(),
});

describe("Tests for <ParamModal /> component", () => {
    let component;
    beforeEach(() => {
        component = shallow(<ParamModal data={["weight", "size"]} />);
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
