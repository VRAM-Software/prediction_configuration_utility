import React from "react";
import Adapter from "enzyme-adapter-react-16";
import "../mocks/mockFile";

import App from "../../view/App";
import { ChangeParamModal } from "../../view/UI";
import { configure, shallow, mount } from "enzyme";

jest.mock("electron", () => ({
    ipcRenderer: {
        on: jest.fn(),
        send: jest.fn(),
    },
}));

configure({
    adapter: new Adapter(),
});

describe("Component's integration tests", () => {
    let mountedComponent;
    const log = (logMsg) => console.log(logMsg);
    beforeEach(() => {
        mountedComponent = mount(<App />);
    });

    test("should render files name if files are selected", () => {
        mountedComponent.setState({
            csvFileInfo: { name: "test.csv" },
        });
        expect(
            mountedComponent.containsMatchingElement(<span>test.csv</span>)
        ).toBeTruthy();

        mountedComponent.setState({
            jsonFileInfo: { name: "test.json" },
        });
        expect(
            mountedComponent.containsMatchingElement(<span>test.json</span>)
        ).toBeTruthy();
    });

    test("button 'Inizia addestramento' should trigger state change when clicked", () => {
        mountedComponent.setState({
            userData: [1, 2, 3, 4],
            csvFileInfo: "csv",
            algorithm: "svm",
        });
        mountedComponent
            .find("button[children='Inizia addestramento SVM']")
            .simulate("click", {
                preventDefault: () => {},
            });
        expect(mountedComponent.state("isTraining")).toEqual(true);

        const app = mount(<App />);
        app.setState({
            userData: [1, 2, 3, 4],
            csvFileInfo: "csv",
            algorithm: "rl",
        });
        app.find("button[children='Inizia addestramento RL']").simulate(
            "click",
            {
                preventDefault: () => {},
            }
        );
        expect(app.state("isTraining")).toEqual(true);
    });

    test("button 'Salva json' should open modal", () => {
        mountedComponent.setState({
            isTrainingDone: true,
        });
        mountedComponent
            .find("button[children='Salva json']")
            .simulate("click", {
                preventDefault: () => {},
            });
        expect(mountedComponent.state("isModalEnabled")).toEqual(true);
    });

    test("button 'Chiudi' in modal should close modal", () => {
        mountedComponent.setState({
            isModalEnabled: true,
        });
        mountedComponent.find("button[children='Chiudi']").simulate("click", {
            preventDefault: () => {},
        });
        expect(mountedComponent.state("isModalEnabled")).toEqual(false);
    });

    test("when modal is open clicking the background should close modal", () => {
        mountedComponent.setState({
            isModalEnabled: true,
        });
        mountedComponent
            .find(".modal-background")
            .simulate("click", { preventDefault: () => {} });
        expect(mountedComponent.state("isModalEnabled")).toEqual(false);
    });

    test("when <SaveFileModal/> is open clicking the button 'Salva Json' should trigger state change  in <App/> component", () => {
        mountedComponent.setState({
            isModalEnabled: true,
        });
        mountedComponent
            .find("button[children='Salva Json']")
            .simulate("click", { preventDefault: () => {} });
        expect(mountedComponent.state("isModalEnabled")).toEqual(false);
    });

    test("when <SaveFileModal/> is open changing text input should trigger state change in <App/> component", () => {
        mountedComponent.setState({
            isModalEnabled: true,
        });
        mountedComponent
            .find("#inputSaveName")
            .at(1)
            .simulate("change", { target: { value: "test" } });
        expect(mountedComponent.state("fileName")).toEqual("test");
    });

    test("changing text in textarea in <ControlPanel/> component should trigger state change in <App/> component", () => {
        mountedComponent.setState({
            userData: [1, 2, 3, 4],
        });
        mountedComponent
            .find("textarea")
            .simulate("change", { target: { value: "test text" } });
        expect(mountedComponent.state("userNotes")).toEqual("test text");
    });

    test("changing current algorithm in <CheckBoxes/> should trigger state change in <App/> component", () => {
        mountedComponent.setState({
            userData: [1, 2, 3, 4],
            algorithm: "svm",
        });
        mountedComponent.find(".checkbox-not-selected").at(0).simulate("click");
        expect(mountedComponent.state("algorithm")).toEqual("rl");

        mountedComponent = mount(<App />);
        mountedComponent.setState({
            userData: [1, 2, 3, 4],
        });
        mountedComponent
            .find("span[children='Regressione Lineare']")
            .simulate("click");
        expect(mountedComponent.state("algorithm")).toEqual("rl");
    });

    test("onChange function should deal with json files properly", () => {
        const fileContents = { a: 1, b: 2, c: 3 };
        const file = new Blob([fileContents], {
            type: "application/json",
        });
        file.name = "test.json";
        file.path = "/path/to/json";
        mountedComponent
            .find("#fileChooserjson")
            .simulate("change", { target: { files: [file] } });
        expect(mountedComponent.state("jsonFileInfo")).toEqual({
            name: "test.json",
            path: "/path/to/json",
            type: "application/json",
            extension: "json",
        });
    });

    test("onChange function should deal with csv files properly", () => {
        const fileContents = "a,b,c\n1,2,3";
        const file = new Blob([fileContents], {
            type: "text/csv",
        });
        file.name = "test.csv";
        file.path = "/path/to/csv";
        mountedComponent
            .find("#fileChoosercsv")
            .simulate("change", { target: { files: [file] } });
        expect(mountedComponent.state("csvFileInfo")).toEqual({
            name: "test.csv",
            path: "/path/to/csv",
            type: "text/csv",
            extension: "csv",
        });
    });

    test("onChange function should deal with null files correctly", () => {
        console.log = jest.fn();
        mountedComponent
            .find("#fileChoosercsv")
            .simulate("change", { target: { files: [null] } });

        expect(console.log).toHaveBeenCalledWith("Il file è nullo");
        mountedComponent
            .find("#fileChooserjson")
            .simulate("change", { target: { files: [null] } });

        expect(console.log).toHaveBeenCalledWith("Il file è nullo");
    });

    test("handleChangeAlgorithm should output to console if algorithm chosen is already chosen", () => {
        console.log = jest.fn();
        mountedComponent.setState({
            userData: [1, 2, 3, 4],
        });
        mountedComponent.find(".checkbox-selected").at(0).simulate("click");

        expect(console.log).toHaveBeenCalledWith(
            "Algoritmo scelto è già inizializzato"
        );
    });

    test("component <ChangeParamModal/> should be closed if handleCloseParamModal is called", () => {
        mountedComponent.setState({
            isParamModalEnabled: true,
            userData: null,
        });
        mountedComponent
            .find(".modal-background")
            .simulate("click", { preventDefault: () => {} });
        expect(
            mountedComponent.containsMatchingElement(<ChangeParamModal />)
        ).toBeFalsy();
        expect(mountedComponent.state("userData")).toEqual(null);
        expect(mountedComponent.state("fileName")).toEqual("addestramento");
        expect(mountedComponent.state("userNotes")).toEqual("");
        expect(mountedComponent.state("tempData")).toEqual([]);
        expect(mountedComponent.state("params")).toEqual([]);
        expect(mountedComponent.state("array")).toEqual([]);
    });

    test("component <ChangeParamModal/> should be closed if handleCloseParamModal is called", () => {
        mountedComponent.setState({
            isParamModalEnabled: true,
            userData: [1, 2, 3, 4],
        });
        mountedComponent
            .find(".modal-background")
            .simulate("click", { preventDefault: () => {} });
        expect(
            mountedComponent.containsMatchingElement(<ChangeParamModal />)
        ).toBeFalsy();
    });
});
