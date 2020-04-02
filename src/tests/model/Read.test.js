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
        expect(() => new Read()).toThrowError("Can not construct abstract class Read.");
    });

    test("should return error if functions are not implemented in child class", () => {
        let child = new ChildRead();
        expect(() => child.parser({a:1,b:2,c:3})).toThrow("Do not call abstract method parser from child.");
    });

    test("method readFile should read file correctly", () => {
        let callbackFs;
        let option;

        jest.spyOn(fs, "readFile").mockImplementation((path, data, cb) => {
            callbackFs = cb;
            option = data;
        });
        /*jest.spyOn(reader, 'parser').mockImplementation((data, cb) => {
            callbackReader = cb;
        });*/
        //const logSpy = jest.spyOn(console, 'log');
        /*const json = { author: "VRAMSoftware", version: "1.0.0", pluginAim: "svm", date: "2020/04/02", time: "16:2:24", N:15,
            D:2, b:63.54986981144975, kernelType: "linear", w:[-0.8503742683400565,-0.9184042098072634], notes:"" };*/

        reader.readFile("src/filetest.csv", callbackFs);
        expect(fs.readFile).toBeCalledWith(
            "src/filetest.csv",
            option,
            callbackFs
        );
        //expect(logSpy).toBeCalledWith("ciao");
        //expect(reader.parser).toHaveBeenCalled();
        //callback();
    });

    test("method readFile should throw error when read file failed", () => {
        let callbackFs;
        jest.spyOn(fs, 'readFile').mockImplementation((path, data, cb) => {
            callbackFs = cb;
        });
        const myError = new Error("read file failed");
        let callbackError = (myError, null);
        reader.readFile("src/filetest.csv", callbackError);
        expect(() => callbackFs(myError, null)).toThrowError(myError);
    });
});


   /* test('prints poem to console', done => {
        //const logSpy = jest.spyOn(console, 'log');
        let readFileCallback;
        // @ts-ignore
        jest.spyOn(fs, 'readFile').mockImplementation((path, options, callback) => {
            readFileCallback = callback;
        });

        viewText();
        readFileCallback(null, mockPoem);
        expect(logSpy).toBeCalledWith(mockPoem);
        expect(fs.readFile).toBeCalledWith('poem.txt', 'utf8', readFileCallback);
        done();
    });

    test('should throw error when read file failed', done => {
        let readFileCallback;
        // @ts-ignore
        jest.spyOn(fs, 'readFile').mockImplementation((path, options, callback) => {
            readFileCallback = callback;
        });

        viewText();
        const mError = new Error('read file failed');
        expect(() => readFileCallback(mError, null)).toThrowError(mError);
        expect(fs.readFile).toBeCalledWith('poem.txt', 'utf8', readFileCallback);
        done();
    });
});*/
