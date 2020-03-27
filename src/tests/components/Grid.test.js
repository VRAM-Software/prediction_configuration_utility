import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Grid from "../../components/Grid";

const data = [
    { weight: 1, size: 1, label: 1 },
    { weight: 2, size: 2, label: 2 }
];

const result = {
	w: [1,1],
	b: 1
};

configure({ adapter: new Adapter() });

describe("Test per il componente ScatterPlot", () => {
    let component;
    beforeEach(() => {
        component = shallow(<Grid />);
    });

    test("should rendere component properly", () => {
        expect(component).toBeTruthy();
    });

});