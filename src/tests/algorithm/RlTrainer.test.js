const Trainer = require("../../model/algorithm/RlTrainer");

jest.mock("../../model/algorithm/lib/regression.module");

describe("test for training RL algorithm's wrapper class", () => {
    let trainer;
    beforeEach(() => {
        trainer = new Trainer();
    });

    test("insertData should insert in the field data, the expected array", () => {
        const data = [
            { x1: 1, x2: 2, y: 2 },
            { x1: 9, x2: 9, y: 9 }
        ];
        trainer.options = {numX: 2};
        trainer.translateData(data);
        expect(trainer.data).toEqual(
            [{x: [1, 2], y: [2]},{x: [9, 9], y: [9]}]
       );

    });
});
