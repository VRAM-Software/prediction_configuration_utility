const PerformWriting = require("../../viewmodel/perform/PerformWriting");

class ChildPerformWriting extends PerformWriting {
    constructor() {
        super();
    }
}

describe("Tests for class PerformWriting class", () => {
    test("should throw an error if initialising PerformWriting", () => {
        expect(() => new PerformWriting()).toThrowError(
            "Can not construct abstract class."
        );
    });

    test("should return error if function callWrite are not implemented in child class", () => {
        let child = new ChildPerformWriting();
        expect(() => child.callWrite()).toThrow(
            "Do not call abstract method callWrite from child."
        );
    });

    test("should return error if function getWriter are not implemented in child class", () => {
        let child = new ChildPerformWriting();
        expect(() => child.getWriter()).toThrow(
            "Do not call abstract method getWriter from child."
        );
    });
});
