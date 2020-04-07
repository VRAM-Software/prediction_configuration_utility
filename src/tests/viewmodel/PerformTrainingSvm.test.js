const PerformTrainingSvm = require("../../viewmodel/perform/training/PerformTrainingSvm");
const SvmTrainer = require("../../model/algorithm/SvmTrainer");

describe("Tests for class PerformReadingCsv class", () => {
    let trainer;
    beforeEach(() => {
        trainer = new PerformTrainingSvm();
    });

    test("should create ReadCsv reader", () => {
        expect(trainer.getTrainer() instanceof SvmTrainer).toBeTruthy();
    });
});
