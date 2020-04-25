import React from "react";
import RenderPolygon from "../../../view/graphComponents/RenderPolygon";
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
describe("<RenderCircles /> component", () => {
    let component;
    beforeEach(() => {
        component = shallow(
            <RenderPolygon
                scale={propScale}
                params={params}
                dataForTest={[propData[0]]}
            />
        );
    });

    // ================ COMPONENT RENDERING ================

    test("renders rect", () => {
        expect(component.containsMatchingElement(<rect />)).toEqual(true);
    });

    test("renders green rect if algorithm is svm and label is 1", () => {
        const component = mount(
            <svg>
                <RenderPolygon
                    viewDataTest={true}
                    params={params}
                    algorithm="svm"
                    scale={propScale}
                    dataForTraining={[propData[0]]}
                    dataForTest={[propData[0]]}
                />
            </svg>
        );
        expect(component.find("rect").prop("style")).toHaveProperty(
            "fill",
            "green"
        );
    });

    test("renders red rect if algorithm is svm and label is different from 1", () => {
        const component = mount(
            <svg>
                <RenderPolygon
                    viewDataTest={true}
                    params={params}
                    algorithm="svm"
                    scale={propScale}
                    dataForTraining={[propData[1]]}
                    dataForTest={[propData[1]]}
                />
            </svg>
        );
        expect(component.find("rect").prop("style")).toHaveProperty(
            "fill",
            "red"
        );
    });

    test("renders black rect if algorithm is rl", () => {
        const component = mount(
            <svg>
                <RenderPolygon
                    viewDataTest={true}
                    params={params}
                    algorithm="rl"
                    scale={propScale}
                    dataForTraining={[propData[0]]}
                    dataForTest={[propData[0]]}
                />
            </svg>
        );
        expect(component.find("rect").prop("style")).toHaveProperty(
            "fill",
            "white"
        );
    });
});
