const PerformReading = require("../../viewmodel/perform/PerformReading")

class ChildPerformReading extends PerformReading {
    constructor() {
        super()
    }
}

describe("Tests for class AlgorithmTrainer class", () => {
    test("should throw an error if initialising AlgorithmTrainer", () => {
        expect(() => new PerformReading()).toThrowError(
            "Can not construct abstract class."
        )
    })

    test("should return error if function callRead is not implemented in child class", () => {
        let child = new ChildPerformReading()
        expect(() => child.callRead()).toThrow(
            "Do not call abstract method callRead from child."
        )
    })

    test("should return error if function getReader is not implemented in child class", () => {
        let child = new ChildPerformReading()
        expect(() => child.getReader()).toThrow(
            "Do not call abstract method getReader from child."
        )
    })
})
