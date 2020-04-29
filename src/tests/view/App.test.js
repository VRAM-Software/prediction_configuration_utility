import React from "react";
import Adapter from "enzyme-adapter-react-16";
import "../mocks/mockFile";
import App from "../../view/App";
import {
    FileInput,
    SaveFileModal,
    ChangeParamModal,
    Graph,
    Button,
    ControlPanel,
} from "../../view/UI";
import { configure, shallow } from "enzyme";

// jest.mock("electron", () => ({
//     ipcRenderer: {
//         on: jest.fn(),
//         send: jest.fn(),
//     },
// }));

configure({
    adapter: new Adapter(),
});

describe("Render tests for <App /> component", () => {
    let component;
    beforeEach(() => {
        component = shallow(<App />);
    });

    test("should render component correctly", () => {
        expect(
            component.containsMatchingElement(
                <span>VRAM Software Applicativo Esterno</span>
            )
        ).toBeTruthy();
        expect(
            component.containsAllMatchingElements([
                <FileInput />,
                <FileInput />,
            ])
        ).toBeTruthy();
        expect(
            component.containsAllMatchingElements([<Graph />, <ControlPanel />])
        ).toBeFalsy();
        expect(
            component.containsMatchingElement(<SaveFileModal />)
        ).toBeFalsy();
        component.setState({
            algorithm: "svm",
        });
        expect(
            component.containsAllMatchingElements([<Button />, <Button />])
        ).toBeTruthy();
        component.setState({
            algorithm: "rl  ",
        });
        expect(
            component.containsAllMatchingElements([<Button />, <Button />])
        ).toBeTruthy();
        component.setState({
            userData: [1, 2, 3, 4],
        });
        expect(
            component.containsAllMatchingElements([<Graph />, <ControlPanel />])
        ).toBeTruthy();
        component.setState({
            isModalEnabled: true,
        });
        expect(
            component.containsMatchingElement(<SaveFileModal />)
        ).toBeTruthy();
        component.setState({
            isParamModalEnabled: true,
        });
        expect(
            component.containsMatchingElement(<ChangeParamModal />)
        ).toBeTruthy();
        component.setState({
            isParamModalEnabled: false,
        });
        expect(
            component.containsMatchingElement(<ChangeParamModal />)
        ).toBeFalsy();
    });

    test("onChange function should reset when jsonFileInfo is not null", () => {
        component.setState({
            jsonFileInfo: "info",
        });
        expect(component.state("userNotes")).toEqual("");
    });

    test("onChange function should reset state when csvFileInfo is not null", () => {
        component.setState({
            csvFileInfo: "info",
        });
        expect(component.state("trainedJson")).toEqual(null);
        expect(component.state("isTrainingDone")).toEqual(false);
        expect(component.state("userNotes")).toEqual("");
    });
});
