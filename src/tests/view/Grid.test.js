import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Grid from "../../view/graphComponents/Grid";

const data = [
    { weight: 1, size: 1, label: 1 },
    { weight: 2, size: 2, label: -1 }
];

const result = {
	w: [1,1],
    b: 1,
    D: 2
};

const x = x => x;
const y = y => y;

const constraints = {
    maxX: 2,
    maxY: 2,
    minX: 0,
    minY: 0
}

configure({ adapter: new Adapter() });

describe("Test per il componente Grid", () => {
    let component;
    beforeEach(() => {
        component = shallow(<Grid scale={{x, y}} result={result} constraints={constraints}/>);
    });

    test("should render component properly", () => {
        expect(component).toBeTruthy();
    });

    test("should render rect component", () => {
        expect(component.containsMatchingElement(<rect />)).toBeTruthy();
    });
});
