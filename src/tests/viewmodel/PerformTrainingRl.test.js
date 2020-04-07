const PerformTrainingRl = require("../../viewmodel/perform/training/PerformTrainingRl");
const RlTrainer = require("../../model/algorithm/RlTrainer");

describe("Tests for class PerformReadingCsv class", () => {
    let trainer;
    beforeEach(() => {
        trainer = new PerformTrainingRl();
    });

    test("should create ReadCsv reader", () => {
        expect(trainer.getTrainer() instanceof RlTrainer).toBeTruthy();
    });
});
