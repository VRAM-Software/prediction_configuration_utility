const AlgorithmTrainer = require("../../model/AlgorithmTrainer");

class ChildAlgorithmTrainer extends AlgorithmTrainer {
    constructor() {
        super();
    }
}

describe("Tests for class AlgorithmTrainer class", () => {
    test("should throw an error if initialising AlgorithmTrainer", () => {
        expect(() => new AlgorithmTrainer()).toThrowError("Can not construct abstract class AlgorithmTrainer.");
    });

    test("should return error if functions are not implemented in child class", () => {
        let child = new ChildAlgorithmTrainer();
        expect(() => child.train({a:1,b:2,c:3})).toThrow("Do not call abstract method train from child.");
        expect(() => child.translateData({a:1,b:2,c:3})).toThrow("Do not call abstract method translateData from child.");
    });
});
