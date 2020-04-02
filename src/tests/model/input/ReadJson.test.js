const ReadJson = require("../../../model/input/ReadJson");

const jsObjString = '{"a":1,"b":2,"c":3}';

describe("Test for ReadJson class", () => {
    let reader;
    beforeEach(() => {
        reader = new ReadJson();
    });

    test("parser function should return array of js objects given csv", () => {
        let result = reader.parser(jsObjString);
        expect(result).toEqual({
            a: 1, b: 2, c: 3
        })
    })
});
