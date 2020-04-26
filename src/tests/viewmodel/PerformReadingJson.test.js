const PerformReadingJson = require("../../viewmodel/perform/reading/PerformReadingJson");
const ReadJson = require("../../model/input/ReadJson");
const mockedCallback = jest.fn();
jest.mock("../../model/input/ReadJson");
describe("Tests for class PerformReadingJson class", () => {
    let readerJson;
    beforeEach(() => {
        readerJson = new PerformReadingJson();
    });

    test("should create ReadJson object", () => {
        expect(readerJson.getReader() instanceof ReadJson).toBeTruthy();
    });

    test("should call ReadJson.readFile", () => {
        readerJson.callRead("test", mockedCallback);
        expect(ReadJson.prototype.readFile).toBeCalledWith(
            "test",
            mockedCallback
        );
    });
});
