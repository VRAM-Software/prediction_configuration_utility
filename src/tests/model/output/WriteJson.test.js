import * as Utils from "../../../model/Utils";
import fs from 'fs';

const WriteJson = require("../../../model/output/WriteJson");

const jsObj = {
    a: 1, b: 2, c: 3
};

describe("Test for WriteJson class", () => {
    let writer;
    beforeEach(() => {
        writer = new WriteJson();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("parser function should return array of js objects given csv", () => {
        let result = writer.parser(jsObj);
        expect(result).toEqual('{"a":1,"b":2,"c":3}');
    });

    test("method buildTrainedFile should return js object with correct parametres", () => {
        let json = writer.buildTrainedFile({N: 1, D: 2, b: 3, kernelType: 4, w: 5}, "notes", {author: "test", version: "testVersion"});
        let array = Object.keys(json);
        expect(array.includes("author")).toBeTruthy();
        expect(array.includes("version")).toBeTruthy();
        expect(array.includes("pluginAim")).toBeTruthy();
        expect(array.includes("date")).toBeTruthy();
        expect(array.includes("time")).toBeTruthy();
        expect(array.includes("N")).toBeTruthy();
        expect(array.includes("D")).toBeTruthy();
        expect(array.includes("b")).toBeTruthy();
        expect(array.includes("kernelType")).toBeTruthy();
        expect(array.includes("w")).toBeTruthy();
        expect(array.includes("notes")).toBeTruthy();
    });

    test("method writeToDisk should write file correctly", () => {
        let callback;
        jest.spyOn(fs, 'writeFile').mockImplementation((path, data, cb) => {
            callback = cb;
        });
        const logSpy = jest.spyOn(console, 'log');
        const json = { author: "VRAMSoftware", version: "1.0.0", pluginAim: "svm", date: "2020/04/02", time: "16:2:24", N:15,
                       D:2, b:63.54986981144975, kernelType: "linear", w:[-0.8503742683400565,-0.9184042098072634], notes:"" };
        writer.writeToDisk("src/output", "prova", json);
        expect(fs.writeFile).toBeCalledWith(
            "src/output/prova.json",
            JSON.stringify({ author: "VRAMSoftware", version: "1.0.0", pluginAim: "svm", date: "2020/04/02", time: "16:2:24", N:15,
                D:2, b:63.54986981144975, kernelType: "linear", w:[-0.8503742683400565,-0.9184042098072634], notes:"" }),
            callback
        );
        callback();
        expect(logSpy).toBeCalledWith("Successfully wrote file: prova.json to: src/output");
    });
});
