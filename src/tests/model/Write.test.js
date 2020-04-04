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

    test("should return error if functions are not implemented in child class", () => {
        let child = new ChildWrite();
        expect(() => child.parser({a:1,b:2,c:3})).toThrow("Do not call abstract method parser from child.");
        expect(() => child.writeToDisk("path", "name", {a:1,b:2,c:3})).toThrow("Do not call abstract method writeToDisk from child.");
        expect(() => child.buildTrainedFile({a:1,b:2,c:3}, "note")).toThrow("Do not call abstract method buildTrainedFile from child.");
    });
});
