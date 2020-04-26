const PerformReadingCsv = require("../../viewmodel/perform/reading/PerformReadingCsv");
const PerformReadingJson = require("../../viewmodel/perform/reading/PerformReadingJson");
const ProcessReading = require("../../viewmodel/ProcessReading");
const mockedCallback = jest.fn();
jest.mock("../../viewmodel/perform/reading/PerformReadingCsv");
jest.mock("../../viewmodel/perform/reading/PerformReadingJson");
describe("Tests for ProcessReading class", () => {
    let readerCsv;
    let readerJson;
    beforeEach(() => {
        readerCsv = new ProcessReading();
        readerJson = new ProcessReading();
    });

    test("should create the right object based on file extension", () => {
        readerCsv.setStrategy("csv");
        readerJson.setStrategy("json");
        expect(
            readerCsv.getStrategy() instanceof PerformReadingCsv
        ).toBeTruthy();
        expect(
            readerJson.getStrategy() instanceof PerformReadingJson
        ).toBeTruthy();
    });

    test("getPath should set the right path", () => {
        readerCsv.setPath("testPath");
        readerJson.setPath("testPath");
        expect(readerCsv.getPath()).toEqual("testPath");
        expect(readerJson.getPath()).toEqual("testPath");
    });

    test("should call strategy's callRead", () => {
        readerCsv.setPath("testPath");
        readerJson.setPath("testPath");
        readerCsv.setStrategy("csv");
        readerJson.setStrategy("json");
        readerCsv.startReading(mockedCallback);
        readerJson.startReading(mockedCallback);
        expect(PerformReadingCsv.prototype.callRead).toBeCalledWith(
            readerCsv.path,
            mockedCallback
        );
        expect(PerformReadingJson.prototype.callRead).toBeCalledWith(
            readerJson.path,
            mockedCallback
        );
    });
});
