import React from "react";
import RenderDataRl from "../../../view/graphComponents/RenderDataRl";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";

// ================ UTILS ================
configure({ adapter: new Adapter() });

const propData = [
    { weight: 1, size: 1 },
    { weight: 1, size: 1 },
];

const params = ["weight", "size", "label"];

const propScale = {
    x: jest.fn(),
    y: jest.fn(),
};

// ================ TESTS ================
describe("Tests for <RenderDataRl /> component", () => {
    test("renders train data correctly", () => {
        const component = mount(
            <svg>
                <RenderDataRl
                    params={params}
                    scale={propScale}
                    dataForTraining={[propData[0]]}
                    dataForQuality={[propData[0]]}
                    viewDataTraining={true}
                    viewDataQuality={false}
                />
            </svg>
        );
        expect(component.find("circle").prop("style")).toHaveProperty(
            "fill",
            "#4392f1"
        );

        expect(component.containsMatchingElement(<circle />)).toEqual(true);
    });

    test("renders quality data correctly", () => {
        const component = mount(
            <svg>
                <RenderDataRl
                    params={params}
                    scale={propScale}
                    dataForTraining={[propData[0]]}
                    dataForQuality={[propData[0]]}
                    viewDataTraining={false}
                    viewDataQuality={true}
                />
            </svg>
        );
        expect(component.find("rect").prop("style")).toHaveProperty(
            "fill",
            "#4392f1"
        );

        expect(component.containsMatchingElement(<rect />)).toEqual(true);
    });
});
