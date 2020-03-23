import React from "react";
import "../mocks/mockFile";

import App from "../../components/App";
import Chooser from "../../components/Chooser";
import Graph from "../../components/Graph";
import UserNotes from "../../components/UserNotes";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow, mount } from "enzyme";
import Modal from "../../components/Modal";
import {ipcRenderer} from 'electron';
import CheckBox from "../../components/CheckBox";

jest.mock("electron", () => ({
    ipcRenderer: {
        on: jest.fn(),
        send: jest.fn()
    }
}));

configure({
    adapter: new Adapter()
});

describe("Rendering tests for <App /> component", () => {
    let component;
    beforeEach(() => {
        component = shallow(<App />);
    });

    test("should render VRAM Software Applicativo Esterno - PoC 3", () => {
        expect(
            component.containsMatchingElement(
                <span>VRAM Software Applicativo Esterno - PoC 3</span>
            )
        ).toBeTruthy();
    });

    test("should render two Chooser components", () => {
        expect(
            component.containsAllMatchingElements([<Chooser />, <Chooser />])
        ).toBeTruthy();
    });

    test("should render <Graph/> and two <UserNotes/> if userData exists", () => {
        component.setState({
            userData: [1, 2, 3, 4]
        });
        expect(
            component.containsAllMatchingElements([<Graph />, <UserNotes />], <UserNotes />)
        ).toBeTruthy();
    });

    test("should not render render <Graph/> and two <UserNotes/> when component is rendered", () => {
        expect(
            component.containsAllMatchingElements([<Graph />, <UserNotes />, <UserNotes />])
        ).toBeFalsy();
    });

    test("component <Modal/> should be displayed if showModal state is true", () => {
        component.setState({
            isModalEnabled: true
        });
        expect(component.containsMatchingElement(<Modal />)).toBeTruthy();
    });

    test("should not render <Modal/> when component is rendered", () => {
        expect(component.containsMatchingElement(<Modal />)).toBeFalsy();
    });

    test("button 'Inizia addestramento' should be disabled when <App /> is rendered", () => {
        expect(
            component
                .find("button[children='Inizia addestramento']")
                .is("[disabled]")
        ).toBeTruthy();
    });

    test("button 'Inizia addestramento' should be enabled when csvFile exists", () => {
        component.setState({
            csvFileInfo: "test"
        });
        expect(
            component
                .find("button[children='Inizia addestramento']")
                .is("[disabled]")
        ).toBeFalsy();
    });

    test("button 'Salva' should be disabled when <App /> is rendered", () => {
        expect(
            component.find("button[children='Salva json']").is("[disabled]")
        ).toBeTruthy();
    });

    test("button 'Salva json' should be enabled after training is done", () => {
        component.setState({
            isTrainingDone: true
        });
        expect(
            component.find("button[children='Salva json']").is("[disabled]")
        ).toBeFalsy();
    });

    test("should not render file paths if csv and json file are not selected", () => {
        expect(
            component.find("span[children='Nessun file selezionato']").length
        ).toEqual(2);
    });

    test("should render csv file name if csv file is selected", () => {
        component.setState({
            csvFileInfo: { name: "test.csv" }
        });
        expect(
            component.containsMatchingElement(<span>test.csv</span>)
        ).toBeTruthy();
    });

    test("should render json file name if json file is selected", () => {
        component.setState({
            jsonFileInfo: { name: "test.json" }
        });
        expect(
            component.containsMatchingElement(<span>test.json</span>)
        ).toBeTruthy();
    });

    test("should not render component <CheckBox />", () => {
        expect(component.containsMatchingElement(<CheckBox />)).toBeFalsy();
    });

    test("should render component <CheckBox /> after having userData", () => {
        component.setState({
            userData: [1, 2, 3, 4]
        });
        expect(component.containsMatchingElement(<CheckBox />)).toBeTruthy();
    });
});

describe("Method tests for <App/> component", () => {
    let component;
    let mountedComponent;
    beforeEach(() => {
        component = shallow(<App />);
        mountedComponent = mount(<App />);
    });

    test("button 'Salva json' should open modal", () => {
        component.setState({
            isTrainingDone: true
        });
        component.find("button[children='Salva json']").simulate("click", {
            preventDefault: () => {}
        });
        expect(component.state("isModalEnabled")).toEqual(true);
    });

    test("button 'Chiudi' in modal should close modal", () => {
        component.setState({
            isModalEnabled: true
        });
        component.find("button[children='Chiudi']").simulate("click", {
            preventDefault: () => {}
        });
        expect(component.state("isModalEnabled")).toEqual(false);
    });

    test("when modal is open clicking the background should close modal", () => {
        mountedComponent.setState({
            isModalEnabled: true
        });
        mountedComponent
            .find(".modalBackground")
            .simulate("click", { preventDefault: () => {} });
        expect(mountedComponent.state("isModalEnabled")).toEqual(false);
    });

    test("when modal is open clicking 'Salva Json' should trigger state change", () => {
        mountedComponent.setState({
            isModalEnabled: true
        });
        mountedComponent
            .find("button[children='Salva Json']")
            .simulate("click", { preventDefault: () => {} });
        expect(mountedComponent.state("isModalEnabled")).toEqual(false);
    });

    test("when modal is open changing input should trigger state change", () => {
        mountedComponent.setState({
            isModalEnabled: true
        });
        mountedComponent
            .find("#inputSaveName")
            .simulate("change", { target: { value: "test" } });
        expect(mountedComponent.state("fileName")).toEqual("test");
    });

    test("changing text in userNotes textarea should trigger state change", () => {
        mountedComponent.setState({
            userData: [1, 2, 3, 4]
        });
        mountedComponent
            .find("textarea").at(1)
            .simulate("change", { target: { value: "test text" } });
        expect(mountedComponent.state("userNotes")).toEqual("test text");
    });

    test("changing text in notesPredittore textarea should trigger state change", () => {
        mountedComponent.setState({
            userData: [1, 2, 3, 4]
        });
        mountedComponent
            .find("textarea").at(0)
            .simulate("change", { target: { value: "test text" } });
        expect(mountedComponent.state("notesPredittore")).toEqual("test text");
    });

    test("changing current algorithm with button should trigger state change in App", () => {
        mountedComponent.setState({
            userData: [1, 2, 3, 4]
        });
        mountedComponent.find(".checkNotSelected").simulate("click");
        expect(mountedComponent.state("algorithm")).toEqual("rl");
    });

    test("changing current algorithm with text should trigger state change in App", () => {
        mountedComponent = mount(<App />);
        mountedComponent.setState({
            userData: [1, 2, 3, 4]
        });
        mountedComponent.find("span[children='Regressione Lineare']").simulate("click");
        expect(mountedComponent.state("algorithm")).toEqual("rl");
    });

    test("onChange function should deal with json files properly", () => {
        const fileContents = { a: 1, b: 2, c: 3 };
        const file = new Blob([fileContents], {
            type: "application/json"
        });
        file.name = "test.json";
        file.path = "/path/to/json";
        mountedComponent
            .find("#fileChooser")
            .at(1)
            .simulate("change", { target: { files: [file] } });
        expect(mountedComponent.state("jsonFileInfo")).toEqual({
            name: "test.json",
            path: "/path/to/json",
            type: "application/json"
        });
    });

    test("onChange function should deal with csv files properly", () => {
        const fileContents = "a,b,c\n1,2,3";
        const file = new Blob([fileContents], {
            type: "text/csv"
        });
        file.name = "test.csv";
        file.path = "/path/to/csv";
        mountedComponent
            .find("#fileChooser")
            .at(0)
            .simulate("change", { target: { files: [file] } });
        expect(mountedComponent.state("csvFileInfo")).toEqual({
            name: "test.csv",
            path: "/path/to/csv",
            type: "text/csv"
        });
    });

    test("onChange function should callCsvToJson function", () => {
        const fileContents = "a,b,c\n1,2,3";
        const file = new Blob([fileContents], {
            type: "text/csv"
        });
        const readAsText = jest.fn();
        const addEventListener = jest.fn((_, evtHandler) => {
            evtHandler();
        });
        const dummyFileReader = {
            addEventListener,
            readAsText,
            result: fileContents
        };
        window.FileReader = jest.fn(() => dummyFileReader);
        file.name = "test.csv";
        file.path = "/path/to/csv";
        mountedComponent
            .find("#fileChooser")
            .at(0)
            .simulate("change", { target: { files: [file] } });
        expect(FileReader).toHaveBeenCalled();
        expect(readAsText).toHaveBeenCalledWith(file);
        expect(mountedComponent.state("csvFileInfo")).toEqual({
            name: "test.csv",
            path: "/path/to/csv",
            type: "text/csv"
        });
    });
});
