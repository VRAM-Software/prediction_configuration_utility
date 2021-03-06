import React from "react";
import { Button } from "../../../view/UI";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({
    adapter: new Adapter(),
});

describe("Tests for <Button /> component", () => {
    let component;
    const func = jest.fn();
    beforeEach(() => {
        component = shallow(
            <Button
                onClick={func}
                loading={false}
                text="test"
                loadingText="loading"
                disabled={false}
            />
        );
    });

    test("should render component correctly", () => {
        expect(component).toBeTruthy();
        expect(
            component.containsMatchingElement(<button>test</button>)
        ).toBeTruthy();
    });

    test("function passed as prop should be called on click event", () => {
        component.find("button").simulate("click");
        expect(func).toHaveBeenCalled();
    });

    test("button should render different text if loading", () => {
        const componentLoading = shallow(
            <Button
                onClick={func}
                loading={true}
                text="test"
                loadingText="loading"
                disabled={false}
            />
        );
        expect(
            componentLoading.containsMatchingElement(<button>loading</button>)
        ).toBeTruthy();
    });

    test("button should render different text if disabled", () => {
        const componentDisabled = shallow(
            <Button
                onClick={func}
                loading={false}
                text="test"
                loadingText="loading"
                disabledText="disabled"
                disabled={true}
            />
        );
        expect(
            componentDisabled.containsMatchingElement(<button>disabled</button>)
        ).toBeTruthy();
        expect(componentDisabled.find("button").is("[disabled]")).toBeTruthy();
    });

    test("button should render custom message if showMessage is true", () => {
        const componentCustom = shallow(
            <Button
                showMessage={true}
                customMessage="custom"
                onClick={func}
                loading={false}
                text="test"
                loadingText="loading"
                disabledText="disabled"
                disabled={false}
            />
        );
        expect(
            componentCustom.containsMatchingElement(<span>custom</span>)
        ).toBeTruthy();
    });

    test("button should not render custom message if showMessage is false", () => {
        const componentCustom = shallow(
            <Button
                showMessage={false}
                customMessage="custom"
                onClick={func}
                loading={false}
                text="test"
                loadingText="loading"
                disabledText="disabled"
                disabled={false}
            />
        );
        expect(
            componentCustom.containsMatchingElement(<span>custom</span>)
        ).toBeFalsy();
    });
});
