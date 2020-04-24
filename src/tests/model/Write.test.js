import fs from "fs";

const WriteJson = require("../../model/output/WriteJson");
const Write = require("../../model/Write");

class ChildWrite extends Write {
    constructor() {
        super();
    }
}

describe("Tests for class Write class", () => {
    let writer;
    beforeEach(() => {
        writer = new WriteJson();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should throw an error if initialising Write", () => {
        expect(() => new Write()).toThrowError(
            "Can not construct abstract class Write."
        );
    });

    test("should return error if functions are not implemented in child class", () => {
        let child = new ChildWrite();
        expect(() => child.parser({ a: 1, b: 2, c: 3 })).toThrow(
            "Do not call abstract method parser from child."
        );
    });

    test("method buildTrainedFile should return js object with correct parametres", () => {
        let json = writer.buildTrainedFile(
            {
                author: "VRAM Software",
                version: "1.0.0",
                date: "2020/04/03",
                time: "21:56:55",
                pluginAim: "svm",
                predictors: ["a", "b"],
                Result: {
                    N: 15,
                    D: 3,
                    b: 49.77254566600638,
                    kernelType: "linear",
                    w: [
                        -0.6580027516346796,
                        -0.4545439115789933,
                        -0.3641814838666142,
                    ],
                },
            },
            "notes"
        );
        let array = Object.keys(json);
        expect(array.includes("author")).toBeTruthy();
        expect(array.includes("version")).toBeTruthy();
        expect(array.includes("date")).toBeTruthy();
        expect(array.includes("time")).toBeTruthy();
        expect(array.includes("pluginAim")).toBeTruthy();
        expect(array.includes("predictors")).toBeTruthy();
        expect(array.includes("Result")).toBeTruthy();
        expect(array.includes("notes")).toBeTruthy();
    });

    test("method writeToDisk should write file correctly", () => {
        let callback;
        jest.spyOn(fs, "writeFile").mockImplementation((path, data, cb) => {
            callback = cb;
        });
        const logSpy = jest.spyOn(console, "log");
        const json = {
            author: "VRAM Software",
            version: "1.0.0",
            date: "2020/04/03",
            time: "21:56:55",
            pluginAim: "svm",
            predictors: ["a", "b"],
            Result: {
                N: 15,
                D: 3,
                b: 49.77254566600638,
                kernelType: "linear",
                w: [
                    -0.6580027516346796,
                    -0.4545439115789933,
                    -0.3641814838666142,
                ],
            },
        };
        //const stringToWrite = writer.parser(json);
        writer.writeToDisk("src/output", "prova", json, "note", callback);
        expect(fs.writeFile).toBeCalledWith(
            "src/output/prova.json",
            JSON.stringify({
                author: "VRAM Software",
                version: "1.0.0",
                date: "2020/04/03",
                time: "21:56:55",
                pluginAim: "svm",
                predictors: ["a", "b"],
                Result: {
                    N: 15,
                    D: 3,
                    b: 49.77254566600638,
                    kernelType: "linear",
                    w: [
                        -0.6580027516346796,
                        -0.4545439115789933,
                        -0.3641814838666142,
                    ],
                },
                notes: "note",
            }),
            callback
        );
        callback();
        expect(logSpy).toBeCalledWith(
            "Successfully wrote file: prova.json to: src/output"
        );
    });
});
