import React from "react";
import { FolderInput } from "../../../view/UI";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";

configure({
    adapter: new Adapter(),
});

describe("Tests for <FolderInput /> component", () => {
    let component;
    const func = jest.fn();
    beforeEach(() => {
        component = shallow(<FolderInput folderPath="test" onClick={func} />);
    });

    test("should render input element", () => {
        expect(component.find("input").exists()).toBeTruthy();
    });

    test("should render folder path", () => {
        expect(component.find("input").props().value).toEqual("test");
    });
});
