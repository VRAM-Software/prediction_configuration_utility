const Trainer = require("../../algorithm/trainRL");

jest.mock('../../algorithm/regression.module');

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
        trainer.insertData(data);
        expect(trainer.data).toEqual(
            [{x: [1, 2], y: [2]},{x: [9, 9], y: [9]}]
       );

    });

    /*test("train method should call train method from ml-modules", () => {
        const data = [
            { weight: 1, size: 1, label: 1 },
            { weight: 2, size: 2, label: 2 }
        ];
        const res = trainer.train(data);
        const options = {
            kernel: {
                linear: true
            },
            karpathy: true
        }
        expect(mockedSetOptions).toHaveBeenCalledWith(trainer.options);
        expect(mockedTrain).toHaveBeenCalledWith(
            trainer.data,
            trainer.labels
        );
        expect(mockedToJSON).toHaveBeenCalled();
        expect(res).toEqual(trainer.trainedJson);
    });*/
});
