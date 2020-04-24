const PerformTraining = require("../../viewmodel/perform/PerformTraining");

class ChildPerformTraining extends PerformTraining {
    constructor() {
        super();
    }
}

describe("Tests for class AlgorithmTrainer class", () => {
    test("should throw an error if initialising AlgorithmTrainer", () => {
        expect(() => new PerformTraining()).toThrowError(
            "Can not construct abstract class."
        );
    });

    test("should return error if function callTrain is not implemented in child class", () => {
        let child = new ChildPerformTraining();
        expect(() => child.callTrain()).toThrow(
            "Do not call abstract method callTrain from child."
        );
    });

    test("should return error if function getTrainer is not implemented in child class", () => {
        let child = new ChildPerformTraining();
        expect(() => child.getTrainer()).toThrow(
            "Do not call abstract method getTrainer from child."
        );
    });
});
