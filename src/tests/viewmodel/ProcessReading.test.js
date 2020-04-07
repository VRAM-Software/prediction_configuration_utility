const PerformReadingCsv = require("../../viewmodel/perform/reading/PerformReadingCsv")
const PerformReadingJson = require("../../viewmodel/perform/reading/PerformReadingJson")
const ProcessReading = require("../../viewmodel/ProcessReading");

describe("Tests for ProcessReading class", () => {
    let readerCsv;
    let readerJson;
    beforeEach(() => {
        readerCsv = new ProcessReading();
        readerJson = new ProcessReading()
    });

    test("should create the right object based on extension", () => {
        readerCsv.setStrategy("csv");
        readerJson.setStrategy("json");
        expect(readerCsv.getStrategy() instanceof PerformReadingCsv).toBeTruthy();
        expect(readerJson.getStrategy() instanceof PerformReadingJson).toBeTruthy();
    });

    test("getPath should set the right path", () => {
        readerCsv.setPath("testPath");
        expect(readerCsv.getPath()).toEqual("testPath");
    });
});
