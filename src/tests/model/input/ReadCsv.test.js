const ReadCsv = require("../../../model/input/ReadCsv");
const csv = require("csvtojson");

const csvString = "a,b,c\n1,2,3";

describe("Test for ReadCsv class", () => {
    let reader;
    beforeEach(() => {
        reader = new ReadCsv();
    });

    test("parser function should return array of js objects given csv", () => {
        reader.parser(csvString, (err, res) => {
            expect(res).toEqual({ a: 1, b: 2, c: 3 });
        });
    });
});
