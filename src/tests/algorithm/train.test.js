const Trainer = require("../../algorithm/train");
const SVM = require("ml-modules").SVM;

const mockedTrain = jest.fn();
const mockedToJSON = jest.fn();
const mockedSetOptions = jest.fn();

jest.mock("ml-modules", () => ({
    SVM: jest.fn(() => ({
        train: mockedTrain,
        toJSON: mockedToJSON,
        setOptions: mockedSetOptions
    }))
}));

describe("test for training algorithm's wrapper class", () => {
    let trainer;
    beforeEach(() => {
        trainer = new Trainer();
    });

    test("translateData should return expected array", () => {
        const data = [
            { weight: 1, size: 1, label: 1 },
            { weight: 2, size: 2, label: 2 }
        ];
        trainer.translateData(data);
        expect(trainer.data).toEqual([
            [1, 1],
            [2, 2]
        ]);
        expect(trainer.labels).toEqual([1, 2]);
    });

    test("train method should call train method from ml-modules", () => {
        const data = [
            { weight: 1, size: 1, label: 1 },
            { weight: 2, size: 2, label: 2 }
        ];
        const res = trainer.train(data);

        expect(mockedSetOptions).toHaveBeenCalledWith(trainer.options);
        expect(mockedTrain).toHaveBeenCalledWith(
            trainer.data,
            trainer.labels
        );
        expect(mockedToJSON).toHaveBeenCalled();
        expect(res).toEqual(trainer.trainedJson);
    });
});
