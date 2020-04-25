const PerformWritingJson = require("../../viewmodel/perform/writing/PerformWritingJson");
const WriteJson = require("../../model/output/WriteJson");
const mockedCallback = jest.fn();
jest.mock("../../model/output/WriteJson");
const fileInfo = {
    path: "test",
    name: "test",
    trainedJson: { test: "test" },
    notes: "test",
};
describe("Tests for class PerformWritingJson class", () => {
    let jsonWriter;
    beforeEach(() => {
        jsonWriter = new PerformWritingJson();
    });

    test("should create ReadCsv reader", () => {
        expect(jsonWriter.getWriter() instanceof WriteJson).toBeTruthy();
    });

    test("should call writeToDisk function", () => {
        jsonWriter.callWrite(fileInfo, mockedCallback);
        expect(WriteJson.prototype.writeToDisk).toBeCalledWith(
            fileInfo.path,
            fileInfo.name,
            fileInfo.trainedJson,
            fileInfo.notes,
            mockedCallback
        );
    });
});
