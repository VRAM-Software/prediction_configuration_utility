import fs from "fs";

const Read = require("../../model/Read");
const ReadJson = require("../../model/input/ReadJson");

class ChildRead extends Read {
    constructor() {
        super();
    }
}

describe("Tests for class Read class", () => {
    let reader;
    beforeEach(() => {
        reader = new ReadJson();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should throw an error if initialising Read", () => {
        expect(() => new Read()).toThrowError(
            "Can not construct abstract class Read."
        );
    });

    test("should return error if functions are not implemented in child class", () => {
        let child = new ChildRead();
        expect(() => child.parser({ a: 1, b: 2, c: 3 })).toThrow(
            "Do not call abstract method parser from child."
        );
    });

    test("method readFile should read file correctly", () => {
        let callbackFs;
        let option;

        jest.spyOn(fs, "readFile").mockImplementation((path, data, cb) => {
            callbackFs = cb;
            option = data;
        });

        reader.readFile("src/filetest.csv", callbackFs);
        expect(fs.readFile).toBeCalledWith(
            "src/filetest.csv",
            option,
            callbackFs
        );
    });

    test("method readFile should throw error when read file failed", () => {
        let callbackFs;
        jest.spyOn(fs, "readFile").mockImplementation((path, data, cb) => {
            callbackFs = cb;
        });
        const myError = new Error("read file failed");
        let callbackError = (myError, null);
        reader.readFile("src/filetest.csv", callbackError);
        expect(() => callbackFs(myError, null)).toThrowError(myError);
    });
});
