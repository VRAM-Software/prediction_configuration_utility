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

    test("should return error if functions are not implemented in child class", () => {
        let child = new ChildRead();
        expect(() => child.parser({a:1,b:2,c:3})).toThrow("Do not call abstract method parser from child.");
    });
});
