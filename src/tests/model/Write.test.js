const Write = require("../../model/Write");

class ChildWrite extends Write {
    constructor() {
        super();
    }
}

describe("Tests for class Write class", () => {
    test("should throw an error if initialising Write", () => {
        expect(() => new Write()).toThrowError("Can not construct abstract class Write.");
    });
});
