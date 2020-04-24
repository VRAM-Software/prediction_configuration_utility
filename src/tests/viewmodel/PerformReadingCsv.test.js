const PerformReadingCsv = require("../../viewmodel/perform/reading/PerformReadingCsv");
const ReadCsv = require("../../model/input/ReadCsv");

describe("Tests for class PerformReadingCsv class", () => {
    let readerCsv;
    beforeEach(() => {
        readerCsv = new PerformReadingCsv();
    });

    test("should create ReadCsv reader", () => {
        expect(readerCsv.getReader() instanceof ReadCsv).toBeTruthy();
    });
});
