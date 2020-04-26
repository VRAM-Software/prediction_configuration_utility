import React from "react";
import { QualityIndex } from "../../../view/UI";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from "enzyme";

configure({
    adapter: new Adapter(),
});

describe("Tests for <QualityIndex /> component", () => {
    test("should render component correctly", () => {
        const componentGood = mount(<QualityIndex index={1} />);
        const componentMedium = mount(<QualityIndex index={0.5} />);
        const componentBad = mount(<QualityIndex index={0.1} />);
        expect(componentBad.find("div").hasClass("bad")).toEqual(true);
        expect(componentMedium.find("div").hasClass("medium")).toEqual(true);
        expect(componentGood.find("div").hasClass("good")).toEqual(true);
    });
});
