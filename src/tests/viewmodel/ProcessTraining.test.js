const PerformTrainingRl = require("../../viewmodel/perform/training/PerformTrainingRl")
const PerformTrainingSvm = require("../../viewmodel/perform/training/PerformTrainingSvm")
const ProcessTraining = require("../../viewmodel/ProcessTraining")

describe("Tests for ProcessTraining class", () => {
    let trainerSvm
    let trainerRl
    beforeEach(() => {
        trainerSvm = new ProcessTraining()
        trainerRl = new ProcessTraining()
    })

    test("should create the right object based on algorithm chosen", () => {
        trainerSvm.setStrategy("svm")
        trainerRl.setStrategy("rl")
        expect(
            trainerSvm.getStrategy() instanceof PerformTrainingSvm
        ).toBeTruthy()
        expect(
            trainerRl.getStrategy() instanceof PerformTrainingRl
        ).toBeTruthy()
    })

    test("getPath should set the right information", () => {
        trainerSvm.setData([
            [1, 2],
            [2, 3],
        ])
        trainerSvm.setParams(["x", "y", "l"])
        expect(trainerSvm.getData()).toEqual([
            [1, 2],
            [2, 3],
        ])
        expect(trainerSvm.getParams()).toEqual(["x", "y", "l"])
    })
})
