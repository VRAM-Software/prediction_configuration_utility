import React from "react";
import RenderDataSvm from "../../../view/graphComponents/RenderDataSvm";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";

// ================ UTILS ================
configure({ adapter: new Adapter() });

const propData = [
    { weight: 1, size: 1, label: 1 },
    { weight: 1, size: 1, label: -1 },
];

const params = ["weight", "size", "label"];

const propScale = {
    x: jest.fn(),
    y: jest.fn(),
};

// ================ TESTS ================
describe("Tests for <RenderDataSvm /> component", () => {
    test("renders train data correctly", () => {
        const componentGreen = mount(
            <svg>
                <RenderDataSvm
                    params={params}
                    scale={propScale}
                    dataForTraining={[propData[0]]}
                    dataForQuality={[propData[0]]}
                    viewDataTraining={true}
                    viewDataQuality={false}
                />
            </svg>
        );
        expect(componentGreen.find("circle").prop("style")).toHaveProperty(
            "fill",
            "green"
        );

        const componentRed = mount(
            <svg>
                <RenderDataSvm
                    params={params}
                    scale={propScale}
                    dataForTraining={[propData[1]]}
                    dataForQuality={[propData[0]]}
                    viewDataTraining={true}
                    viewDataQuality={false}
                />
            </svg>
        );
        expect(componentRed.find("circle").prop("style")).toHaveProperty(
            "fill",
            "red"
        );

        expect(componentRed.containsMatchingElement(<circle />)).toEqual(true);
    });

    test("renders quality data correctly", () => {
        const componentGreen = mount(
            <svg>
                <RenderDataSvm
                    params={params}
                    scale={propScale}
                    dataForTraining={[propData[0]]}
                    dataForQuality={[propData[0]]}
                    viewDataTraining={false}
                    viewDataQuality={true}
                />
            </svg>
        );
        expect(componentGreen.find("rect").prop("style")).toHaveProperty(
            "fill",
            "green"
        );

        const componentRed = mount(
            <svg>
                <RenderDataSvm
                    params={params}
                    scale={propScale}
                    dataForTraining={[propData[0]]}
                    dataForQuality={[propData[1]]}
                    viewDataTraining={false}
                    viewDataQuality={true}
                />
            </svg>
        );
        expect(componentRed.find("rect").prop("style")).toHaveProperty(
            "fill",
            "red"
        );

        expect(componentRed.containsMatchingElement(<rect />)).toEqual(true);
    });
});
