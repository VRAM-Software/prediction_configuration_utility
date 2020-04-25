import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from "enzyme";
import { ChangeParamModal } from "../../../view/UI";

configure({
    adapter: new Adapter(),
});

describe("Tests for <ChangeParamModal /> component", () => {
    let component;
    const setParamsFunc = jest.fn();
    const closeFunc = jest.fn();
    const changeAlgorithmFunc = jest.fn();
    const trainResetFunc = jest.fn();

    beforeEach(() => {
        component = mount(
            <ChangeParamModal
                data={["weight", "size"]}
                setParams={setParamsFunc}
                close={closeFunc}
                changeAlgorithm={changeAlgorithmFunc}
                trainReset={trainResetFunc}
            />
        );
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

    test("Should call props functions", () => {
        component.setState({
            selected: ["weight", "size", "label"],
            algorithm: "svm",
        });
        component.find("button").simulate("click");
        expect(changeAlgorithmFunc).toBeCalledWith(
            component.state(["algorithm"])
        );
        expect(setParamsFunc).toBeCalledWith(component.state(["selected"]));
        expect(trainResetFunc).toBeCalled();
    });

    test("Should add element to array onChange select", () => {
        component.setState({
            selected: [],
            algorithm: "svm",
        });
        component
            .find("select")
            .at(1)
            .simulate("change", {
                preventDefault: () => {},
                target: { value: "weight" },
            });
        expect(component.state("selected")).toEqual(["weight"]);
    });

    test("Should add null element if selected 'seleziona un algoritmo' option to array onChange select", () => {
        component.setState({
            selected: [],
            algorithm: "svm",
        });
        component
            .find("select")
            .at(1)
            .simulate("change", {
                preventDefault: () => {},
                target: { value: "null" },
            });
        expect(component.state("selected")).toEqual([null]);
    });
});
