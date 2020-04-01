const Read = require("../../model/Read");

class ChildRead extends Read {
    constructor() {
        super();
    }
}

describe("Tests for class Read class", () => {
    test("should throw an error if initialising Read", () => {
        expect(() => new Read()).toThrowError("Can not construct abstract class Read.");
    });
});
