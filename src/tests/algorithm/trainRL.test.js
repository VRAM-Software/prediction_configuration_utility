const Train = require("../../algorithm/trainRL");
//const SVM = require("ml-modules").SVM;

/*const mockedTrain = jest.fn();
const mockedToJSON = jest.fn();
const mockedSetOptions = jest.fn();

jest.mock("ml-modules", () => ({
    SVM: jest.fn(() => ({
        train: mockedTrain,
        toJSON: mockedToJSON,
        setOptions: mockedSetOptions
    }))
}));*/

describe("test for training RL algorithm's wrapper class", () => {
    let trainer;
    beforeEach(() => {
        trainer = new Train();
    });

    test("insertData should insert in the field data, the expected array", () => {
        const data = [
            { x1: 1, x2: 2, y: 2 },
            { x1: 2, x2: 4, y: 4 }
        ];
        trainer.insertData(data);
        expect(trainer.data).toEqual([
            [{x: [1, 2], y: [2]}, {x: [2, 4], y: [4]}]
        ]);
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
