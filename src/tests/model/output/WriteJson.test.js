import * as Utils from "../../../model/Utils";

const WriteJson = require("../../../model/output/WriteJson");

const jsObj = {
    a: 1, b: 2, c: 3
};

describe("Test for WriteJson class", () => {
    let writer;
    beforeEach(() => {
        writer = new WriteJson();
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
});
