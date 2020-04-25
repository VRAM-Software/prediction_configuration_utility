const PerformTrainingRl = require("../../viewmodel/perform/training/PerformTrainingRl");
const RlTrainer = require("../../model/algorithm/RlTrainer");

const params = ["a", "b", "c"];
const data = [{ a: 1, b: 1, c: 1 }];
const mockedCallback = jest.fn();
jest.mock("../../model/algorithm/RlTrainer");

describe("Tests for class PerformTrainingCsv class", () => {
    let trainer;
    beforeEach(() => {
        trainer = new PerformTrainingRl();
    });

    test("should create ReadCsv reader", () => {
        expect(trainer.getTrainer() instanceof RlTrainer).toBeTruthy();
    });

    test("should call trainer functions", () => {
        trainer.callTrain(params, data, mockedCallback);
        expect(RlTrainer.prototype.setParams).toBeCalledWith(params);
        expect(RlTrainer.prototype.setOptions).toBeCalledWith({
            numX: params.length,
            numY: 1,
        });
        expect(RlTrainer.prototype.train).toBeCalledWith(data);
        expect(mockedCallback).toBeCalledWith(null, trainer.result);
    });
});
