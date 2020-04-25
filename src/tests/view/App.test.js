import React from "react";
import Adapter from "enzyme-adapter-react-16";
import "../mocks/mockFile";

import App from "../../view/App";
import {
    FileInput,
    TextArea,
    SaveFileModal,
    ChangeParamModal,
    CheckBoxes,
    Content,
    ControlPanel,
} from "../../view/UI";
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

describe("Render tests for <App /> component", () => {
    let component;
    beforeEach(() => {
        component = shallow(<App />);
    });

    test("should render VRAM Software Applicativo Esterno", () => {
        expect(
            component.containsMatchingElement(
                <span>VRAM Software Applicativo Esterno</span>
            )
        ).toBeTruthy();
    });

    test("should render two FileInput components", () => {
        expect(
            component.containsAllMatchingElements([
                <FileInput />,
                <FileInput />,
            ])
        ).toBeTruthy();
    });

    test("should render <Content/> and two <ControlPanel/> if userData exists", () => {
        component.setState({
            userData: [1, 2, 3, 4],
        });
        expect(
            component.containsAllMatchingElements([
                <Content />,
                <ControlPanel />,
            ])
        ).toBeTruthy();
    });

    test("should not render render <Content/> and <ControlPanel/> when component is rendered", () => {
        expect(
            component.containsAllMatchingElements([
                <Content />,
                <ControlPanel />,
            ])
        ).toBeFalsy();
    });

    test("component <SaveFileModal/> should be displayed if isModalEnabled state is true", () => {
        component.setState({
            isModalEnabled: true,
        });
        expect(
            component.containsMatchingElement(<SaveFileModal />)
        ).toBeTruthy();
    });

    test("should not render <SaveFileModal/> when component is rendered", () => {
        expect(
            component.containsMatchingElement(<SaveFileModal />)
        ).toBeFalsy();
    });

    test("component <ChangeParamModal/> should be displayed if isParamModalEnabled state is true", () => {
        component.setState({
            isParamModalEnabled: true,
        });
        expect(
            component.containsMatchingElement(<ChangeParamModal />)
        ).toBeTruthy();
    });

    // test("button 'Inizia addestramento svm' should be disabled when <App /> is rendered", () => {
    //     expect(
    //         component
    //             .find("button[children='Inizia addestramento svm']")
    //             .is("[disabled]")
    //     ).toBeTruthy();
    // });

    // test("button 'Inizia addestramento rl' should be disabled when <App /> is rendered", () => {
    //     component.setState({
    //         algorithm: "rl",
    //     });
    //     expect(
    //         component
    //             .find("button[children='Inizia addestramento rl']")
    //             .is("[disabled]")
    //     ).toBeTruthy();
    // });

    // test("button 'Inizia addestramento svm' should be enabled when csvFile exists", () => {
    //     component.setState({
    //         csvFileInfo: "test",
    //     });
    //     expect(
    //         component
    //             .find("button[children='Inizia addestramento svm']")
    //             .is("[disabled]")
    //     ).toBeFalsy();
    // });

    // test("button 'Inizia addestramento rl' should be enabled when csvFile exists", () => {
    //     component.setState({
    //         csvFileInfo: "test",
    //         algorithm: "rl",
    //     });
    //     expect(
    //         component
    //             .find("button[children='Inizia addestramento rl']")
    //             .is("[disabled]")
    //     ).toBeFalsy();
    // });

    // test("button 'Salva' should be disabled when <App /> is rendered", () => {
    //     expect(
    //         component.find("button[children='Salva json']").is("[disabled]")
    //     ).toBeTruthy();
    // });

    // test("button 'Salva json' should be enabled after training is done", () => {
    //     component.setState({
    //         isTrainingDone: true,
    //     });
    //     expect(
    //         component.find("button[children='Salva json']").is("[disabled]")
    //     ).toBeFalsy();
    // });

    // test("should render button with 'Addestrando...' when component is busy training", () => {
    //     component.setState({
    //         isTraining: true,
    //     });
    //     expect(
    //         component.find("button[children='Addestrando...']")
    //     ).toBeTruthy();
    // });

    // test("should not render button with 'Addestrando...' when component is not training", () => {
    //     component.setState({
    //         isTraining: false,
    //     });
    //     expect(
    //         component.find("button[children='Inizia addestramento']")
    //     ).toBeTruthy();
    // });
});

describe("Method tests for <App/> component", () => {
    let component;
    let mountedComponent;
    const log = (logMsg) => console.log(logMsg);
    beforeEach(() => {
        component = shallow(<App />);
        mountedComponent = mount(<App />);
    });

    test("should render csv file name if csv file is selected", () => {
        mountedComponent.setState({
            csvFileInfo: { name: "test.csv" },
        });
        expect(
            mountedComponent.containsMatchingElement(<span>test.csv</span>)
        ).toBeTruthy();
    });

    test("should render json file name if json file is selected", () => {
        mountedComponent.setState({
            jsonFileInfo: { name: "test.json" },
        });
        expect(
            mountedComponent.containsMatchingElement(<span>test.json</span>)
        ).toBeTruthy();
    });

    test("onChange function should reset when jsonFileInfo is not null", () => {
        component.setState({
            jsonFileInfo: "info",
        });
        expect(component.state("userNotes")).toEqual("");
    });

    test("onChange function should reset when csvFileInfo is not null", () => {
        component.setState({
            csvFileInfo: "info",
        });
        expect(component.state("trainedJson")).toEqual(null);
        expect(component.state("isTrainingDone")).toEqual(false);
        expect(component.state("userNotes")).toEqual("");
    });

    test("button 'Inizia addestramento svm' should trigger state change when clicked", () => {
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
    });

    test("button 'Inizia addestramento rl' should trigger state change when clicked", () => {
        mountedComponent.setState({
            userData: [1, 2, 3, 4],
            csvFileInfo: "csv",
            algorithm: "rl",
        });
        mountedComponent
            .find("button[children='Inizia addestramento RL']")
            .simulate("click", {
                preventDefault: () => {},
            });
        expect(mountedComponent.state("isTraining")).toEqual(true);
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

    test("when modal is open clicking 'Salva Json' should trigger state change", () => {
        mountedComponent.setState({
            isModalEnabled: true,
        });
        mountedComponent
            .find("button[children='Salva Json']")
            .simulate("click", { preventDefault: () => {} });
        expect(mountedComponent.state("isModalEnabled")).toEqual(false);
    });

    test("when modal is open changing input should trigger state change", () => {
        mountedComponent.setState({
            isModalEnabled: true,
        });
        mountedComponent
            .find("#inputSaveName")
            .at(1)
            .simulate("change", { target: { value: "test" } });
        expect(mountedComponent.state("fileName")).toEqual("test");
    });

    test("changing text in userNotes textarea should trigger state change", () => {
        mountedComponent.setState({
            userData: [1, 2, 3, 4],
        });
        mountedComponent
            .find("textarea")
            //.at(1)
            .simulate("change", { target: { value: "test text" } });
        expect(mountedComponent.state("userNotes")).toEqual("test text");
    });

    test("changing current algorithm with button should trigger state change in App", () => {
        mountedComponent.setState({
            userData: [1, 2, 3, 4],
            algorithm: "svm",
        });
        mountedComponent.find(".checkbox-not-selected").at(0).simulate("click");
        expect(mountedComponent.state("algorithm")).toEqual("rl");
    });

    test("changing current algorithm with text should trigger state change in App", () => {
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
});
