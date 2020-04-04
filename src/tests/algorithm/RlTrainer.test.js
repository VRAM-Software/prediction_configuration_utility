import fs from "fs";

const Trainer = require("../../model/algorithm/RlTrainer");

const Regression = require("../../model/algorithm/lib/regression.module.js");
//import Regression from "../../model/algorithm/lib/regression.module.js";
/*jest.mock("../../model/algorithm/lib/regression.module.js");

const mockedTrain = jest.fn();
const mockedCalculateCoefficients = jest.fn();
const mockedInsertData = jest.fn();

jest.mock("../../model/algorithm/lib/regression.module.js", () => ({
    Regression: jest.fn(() => ({
        constructor: Regression,
        calculateCoefficients: mockedCalculateCoefficients,
        insertData: mockedInsertData
    }))
}));*/

describe("test for training RL algorithm's wrapper class", () => {
    let trainer;
    beforeEach(() => {
        trainer = new Trainer();
        trainer.setOptions({ numX: 2, numY: 1});
        trainer.setParams(["x1", "x2", "y"]);
    });

    test("insertData should insert in the field data, the expected array", () => {
        const data = [
            { x1: 1, x2: 2, y: 2 },
            { x1: 9, x2: 9, y: 9 }
        ];
        trainer.translateData(data);
        expect(trainer.options).toEqual({ numX: 2, numY: 1 });
        expect(trainer.data).toEqual([
            { x: [1, 2], y: [2] },
            { x: [9, 9], y: [9] }
        ]);
    });

    /*test("train method should call train method from regression.module", () => {
        const data = [
            { x1: 1, x2: 2, y: 2 },
            { x1: 9, x2: 9, y: 9 }
        ];

        const res = trainer.train(data);
        //jest.spyOn(insertData, 'Regression').mockImplementation((data) => {});
        expect(mockedInsertData).toHaveBeenCalledWith(trainer.insertData(data));
        expect(mockedCalculateCoefficients).toHaveBeenCalled();
        expect(res).toEqual(trainer.buildTrainedObject(trainer.trainedJson));
    });*/

    test("buildTrainedObject should return a js Object with correct params", () => {
        let trainedObj = trainer.buildTrainedObject([ [ 2.1013431013431014 ] ]);
        let result = Object.keys(trainedObj);

        expect(result.includes("author")).toBeTruthy();
        expect(result.includes("version")).toBeTruthy();
        expect(result.includes("date")).toBeTruthy();
        expect(result.includes("time")).toBeTruthy();
        expect(result.includes("pluginAim")).toBeTruthy();
        expect(result.includes("Predictors")).toBeTruthy();
        expect(result.includes("result")).toBeTruthy();
    });

    test("setParams should set params correctly on RlTrainer", () => {
        expect(trainer.params).toEqual(["x1", "x2", "y"]);
    });

    test("setOptions should set params correctly on RlTrainer", () => {
        expect(trainer.options).toEqual({ numX: 2, numY: 1});
    });
});
