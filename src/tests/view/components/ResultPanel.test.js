import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import { ResultPanel, SvmQualityIndex } from "../../../view/UI";

configure({
    adapter: new Adapter(),
});

describe("Tests for <ResultPanel /> component", () => {
    let component;

    const func1 = jest.fn();
    const func2 = jest.fn();
    beforeEach(() => {});

    test("Should render correctly if quality indexes exists", () => {
        const component = mount(
            <ResultPanel
                isTrainingFinished={true}
                qualityIndex={{ precision: 0.2, recall: 0.2 }}
                algorithmChosen="svm"
            />
        );
        expect(
            component.containsMatchingElement(<h3>Indici di qualità</h3>)
        ).toBeTruthy();
        expect(
            component.containsAllMatchingElements([
                <SvmQualityIndex />,
                <SvmQualityIndex />,
            ])
        ).toBeTruthy();
    });

    test("Should not render quality indexes are null", () => {
        const component = mount(
            <ResultPanel
                isTrainingFinished={true}
                qualityIndex={null}
                algorithmChosen="svm"
            />
        );
        expect(
            component.containsMatchingElement(<h3>Indici di qualità</h3>)
        ).toBeFalsy();
        expect(
            component.containsAllMatchingElements([
                <SvmQualityIndex />,
                <SvmQualityIndex />,
            ])
        ).toBeFalsy();
    });

    test("Should not render quality indexes with RL", () => {
        const component = mount(
            <ResultPanel isTrainingFinished={true} algorithmChosen="rl" />
        );
        expect(
            component.containsMatchingElement(<h3>Indici di qualità</h3>)
        ).toBeFalsy();
        expect(
            component.containsAllMatchingElements([
                <SvmQualityIndex />,
                <SvmQualityIndex />,
            ])
        ).toBeFalsy();
    });
});
