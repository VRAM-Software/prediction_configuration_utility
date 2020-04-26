const PerformReadingCsv = require("../../viewmodel/perform/reading/PerformReadingCsv");
const ReadCsv = require("../../model/input/ReadCsv");
const mockedCallback = jest.fn();
jest.mock("../../model/input/ReadCsv");
describe("Tests for class PerformReadingCsv class", () => {
    let readerCsv;
    beforeEach(() => {
        readerCsv = new PerformReadingCsv();
    });

    test("should create ReadCsv object", () => {
        expect(readerCsv.getReader() instanceof ReadCsv).toBeTruthy();
    });

    test("should call ReadCsv.readFile", () => {
        readerCsv.callRead("test", mockedCallback);
        expect(ReadCsv.prototype.readFile).toBeCalledWith(
            "test",
            mockedCallback
        );
    });
});
