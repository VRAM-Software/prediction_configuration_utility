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
        let json = writer.buildTrainedFile({author:"VRAM Software", version: "1.0.0",date:"2020/04/03",time:"21:56:55",pluginAim:"svm", Predictors:["a", "b"], Result:{N:15,D:3,b:49.77254566600638,kernelType:"linear",w:[-0.6580027516346796,-0.4545439115789933,-0.3641814838666142]}}, "notes");
        let array = Object.keys(json);
        expect(array.includes("author")).toBeTruthy();
        expect(array.includes("version")).toBeTruthy();
        expect(array.includes("date")).toBeTruthy();
        expect(array.includes("time")).toBeTruthy();
        expect(array.includes("pluginAim")).toBeTruthy();
        expect(array.includes("Predictors")).toBeTruthy();
        expect(array.includes("Result")).toBeTruthy();
        expect(array.includes("notes")).toBeTruthy();
    });

});
