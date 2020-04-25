const PerformTrainingSvm = require("../../viewmodel/perform/training/PerformTrainingSvm");
const SvmTrainer = require("../../model/algorithm/SvmTrainer");

const params = ["a", "b", "c"];
const data = [{ a: 1, b: 1, c: 1 }];
const mockedCallback = jest.fn();
jest.mock("../../model/algorithm/SvmTrainer");

describe("Tests for class PerformTrainingSvm class", () => {
    let trainer;
    beforeEach(() => {
        trainer = new PerformTrainingSvm();
    });

    test("should create ReadCsv reader", () => {
        expect(trainer.getTrainer() instanceof SvmTrainer).toBeTruthy();
    });

    test("should call trainer functions", () => {
        trainer.callTrain(params, data, mockedCallback);
        expect(SvmTrainer.prototype.setParams).toBeCalledWith(params);
        expect(SvmTrainer.prototype.train).toBeCalledWith(data);
        expect(SvmTrainer.prototype.getQualityIndex).toBeCalled();
        expect(mockedCallback).toBeCalledWith(
            null,
            trainer.result,
            trainer.qualityIndex
        );
    });
});
