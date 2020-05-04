import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import { ResultPanel, QualityIndex } from "../../../view/UI";

configure({
    adapter: new Adapter(),
});

describe("Tests for <ResultPanel /> component", () => {
    test("should render component correctly if quality indexes of svm exists", () => {
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
                <QualityIndex />,
                <QualityIndex />,
            ])
        ).toBeTruthy();
    });

    // test("should render component correctly if quality indexes are null", () => {
    //     const component = mount(
    //         <ResultPanel isTrainingFinished={true} qualityIndex={null} />
    //     );
    //     expect(
    //         component.containsMatchingElement(<h3>Indici di qualità</h3>)
    //     ).toBeFalsy();
    //     expect(
    //         component.containsAllMatchingElements([
    //             <QualityIndex />,
    //             <QualityIndex />,
    //         ])
    //     ).toBeFalsy();
    // });

    test("should render component correctly if quality indexes of rl exists", () => {
        const component = mount(
            <ResultPanel
                isTrainingFinished={true}
                qualityIndex={{ rSquared: 0.2 }}
                algorithmChosen="rl"
            />
        );
        expect(
            component.containsMatchingElement(<h3>Indici di qualità</h3>)
        ).toBeTruthy();
        expect(
            component.containsAllMatchingElements([<QualityIndex />])
        ).toBeTruthy();
    });
});
