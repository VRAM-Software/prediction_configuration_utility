import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from "enzyme";
import { SaveFileModal } from "../../../view/UI";

configure({
    adapter: new Adapter(),
});

describe("Tests for <SaveFileModal /> component", () => {
    let component;
    const funcClose = jest.fn();
    const funcSave = jest.fn();
    const funcChange = jest.fn();
    beforeEach(() => {
        component = mount(
            <SaveFileModal
                close={funcClose}
                save={funcSave}
                change={funcChange}
            />
        );
    });

    test("should render buttons correctly", () => {
        expect(
            component.containsAllMatchingElements([
                <button>Chiudi</button>,
                <button>Salva Json</button>,
            ])
        ).toBeTruthy();
    });

    test("close function should be called on button 'Chiudi'", () => {
        component.find("button[children='Chiudi']").simulate("click");
        expect(funcClose).toHaveBeenCalled();
    });

    test("save function should be called on button 'Salva Json'", () => {
        component.find("button[children='Salva Json']").simulate("click");
        expect(funcSave).toHaveBeenCalled();
    });
    test("close function should be called on click on background", () => {
        component.find(".modal-background").simulate("click");
        expect(funcClose).toHaveBeenCalled();
    });
});
