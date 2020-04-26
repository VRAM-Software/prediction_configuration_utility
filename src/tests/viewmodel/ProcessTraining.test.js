const PerformTrainingRl = require("../../viewmodel/perform/training/PerformTrainingRl");
const PerformTrainingSvm = require("../../viewmodel/perform/training/PerformTrainingSvm");
const ProcessTraining = require("../../viewmodel/ProcessTraining");
const mockedCallback = jest.fn();
jest.mock("../../viewmodel/perform/training/PerformTrainingRl");
jest.mock("../../viewmodel/perform/training/PerformTrainingSvm");
describe("Tests for ProcessTraining class", () => {
    let trainerSvm;
    let trainerRl;
    beforeEach(() => {
        trainerSvm = new ProcessTraining();
        trainerRl = new ProcessTraining();
    });

    test("should create the right object based on algorithm chosen", () => {
        trainerSvm.setStrategy("svm");
        trainerRl.setStrategy("rl");
        expect(
            trainerSvm.getStrategy() instanceof PerformTrainingSvm
        ).toBeTruthy();
        expect(
            trainerRl.getStrategy() instanceof PerformTrainingRl
        ).toBeTruthy();
    });

    test("getParams should return the right information", () => {
        trainerSvm.setData([
            [1, 2],
            [2, 3],
        ]);
        trainerSvm.setParams(["x", "y", "l"]);
        expect(trainerSvm.getData()).toEqual([
            [1, 2],
            [2, 3],
        ]);
        trainerRl.setData([
            [1, 2],
            [2, 3],
        ]);
        trainerRl.setParams(["x", "y", "l"]);
        expect(trainerRl.getData()).toEqual([
            [1, 2],
            [2, 3],
        ]);
        expect(trainerRl.getParams()).toEqual(["x", "y", "l"]);
    });

    test("should call strategy's callTrain", () => {
        trainerSvm.setStrategy("svm");
        trainerRl.setStrategy("rl");
        trainerSvm.setData([
            [1, 2],
            [2, 3],
        ]);
        trainerSvm.setParams(["x", "y", "l"]);
        trainerRl.setData([
            [1, 2],
            [2, 3],
        ]);
        trainerRl.setParams(["x", "y", "l"]);
        expect(trainerRl.getData()).toEqual([
            [1, 2],
            [2, 3],
        ]);
        trainerRl.startTraining(mockedCallback);
        trainerSvm.startTraining(mockedCallback);
        expect(PerformTrainingRl.prototype.callTrain).toBeCalledWith(
            trainerRl.params,
            trainerRl.data,
            mockedCallback
        );
        expect(PerformTrainingSvm.prototype.callTrain).toBeCalledWith(
            trainerSvm.params,
            trainerSvm.data,
            mockedCallback
        );
    });
});
