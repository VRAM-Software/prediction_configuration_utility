const Trainer = require("../../../model/algorithm/SvmTrainer");
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
        trainer.setParams(["weight", "size", "label"]);
    });

    test("translateData should return expected array with number of params < 4", () => {
        const data = [
            { weight: 1, size: 1, label: 1 },
            { weight: 2, size: 2, label: -1 }
        ];
        trainer.translateData(data);
        expect(trainer.data).toEqual([
            [1, 1],
            [2, 2]
        ]);
        expect(trainer.labels).toEqual([1, -1]);
    });

    test("translateData should return expected array with number of params >= 4", () => {
        const data = [
            { weight: 1, size: 1, height: 1, label: 1 },
            { weight: 2, size: 2, height: 2, label: -1 }
        ];
        trainer.setParams(["weight", "size", "height", "label"]);
        trainer.translateData(data);
        expect(trainer.data).toEqual([
            [1, 1, 1],
            [2, 2, 2]
        ]);
        expect(trainer.labels).toEqual([1, -1]);
    });

    test("train method should call train method from ml-modules", () => {
        const data = [
            { weight: 1, size: 1, label: 1 },
            { weight: 2, size: 2, label: -1 }
        ];
        const res = trainer.train(data);

        expect(mockedSetOptions).toHaveBeenCalledWith(trainer.options);
        expect(mockedTrain).toHaveBeenCalledWith(
            trainer.data,
            trainer.labels
        );
        expect(mockedToJSON).toHaveBeenCalled();
        expect(res).toEqual(trainer.buildTrainedObject(trainer.trainedJson));
    });

    test("buildTrainedObject should return a js Object with correct params", () => {
        let trainedObj = trainer.buildTrainedObject({N:15,D:3,b:49.77254566600638,kernelType:"linear",w:[-0.6580027516346796,-0.4545439115789933,-0.3641814838666142]});
        let result = Object.keys(trainedObj);

        expect(result.includes("author")).toBeTruthy();
        expect(result.includes("version")).toBeTruthy();
        expect(result.includes("date")).toBeTruthy();
        expect(result.includes("time")).toBeTruthy();
        expect(result.includes("pluginAim")).toBeTruthy();
        expect(result.includes("predictors")).toBeTruthy();
        expect(result.includes("result")).toBeTruthy();
    });

    test("setParams should set params correctly on SvmTrainer", () => {
       expect(trainer.params).toEqual(["weight", "size", "label"]);
    });
});
