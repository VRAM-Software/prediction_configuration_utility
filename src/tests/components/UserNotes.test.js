import React from "react";
import UserNotes from "../../components/UserNotes";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({
    adapter: new Adapter()
});

describe("Tests for <UserNotes /> component", () => {
    let component;
    const func = jest.fn();
    beforeEach(() => {
        component = shallow(<UserNotes handleChange={func} />);
    });

    test("should render textarea", () => {
        expect(component.find("textarea").exists()).toBeTruthy();
    });

    test("should call function passed as prop on change", () => {
        component.find("textarea").simulate("change");
        expect(func).toHaveBeenCalled();
    });
});
