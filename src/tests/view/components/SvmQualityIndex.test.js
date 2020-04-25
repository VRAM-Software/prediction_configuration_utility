import React from "react";
import { SvmQualityIndex } from "../../../view/UI";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from "enzyme";

configure({
    adapter: new Adapter(),
});

describe("Tests for <SvmQualityIndex /> component", () => {
    test("should render different bgs if index is > 0.6", () => {
        const componentGood = mount(<SvmQualityIndex index={1} />);
        expect(componentGood.find("div").hasClass("good")).toEqual(true);
    });

    test("should render different bgs if index is = 0.5", () => {
        const componentMedium = mount(<SvmQualityIndex index={0.5} />);
        expect(componentMedium.find("div").hasClass("medium")).toEqual(true);
    });

    test("should render different bgs if index is < 0.4", () => {
        const componentBad = mount(<SvmQualityIndex index={0.1} />);
        expect(componentBad.find("div").hasClass("bad")).toEqual(true);
    });
});
