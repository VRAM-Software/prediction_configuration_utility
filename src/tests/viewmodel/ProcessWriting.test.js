const PerformWritingJson = require("../../viewmodel/perform/writing/PerformWritingJson");
const ProcessWriting = require("../../viewmodel/ProcessWriting");
const mockedCallback = jest.fn();
jest.mock("../../viewmodel/perform/writing/PerformWritingJson");
describe("Tests for ProcessWriting class", () => {
    let writer;
    beforeEach(() => {
        writer = new ProcessWriting();
    });

    test("should create the right object based on file extension", () => {
        writer.setStrategy("json");
        expect(writer.getStrategy() instanceof PerformWritingJson).toBeTruthy();
    });

    test("getFileInfo should return the right informations", () => {
        writer.setPath("testPath");
        writer.setName("testName");
        writer.setTrainingResult({ result: 42 });
        writer.setNotes("testNotes");
        expect(writer.getFileInfo()).toEqual({
            path: "testPath",
            name: "testName",
            trainedJson: { result: 42 },
            notes: "testNotes",
        });
    });

    test("should call strategy's callWrite", () => {
        writer.setPath("testPath");
        writer.setName("testName");
        writer.setTrainingResult({ result: 42 });
        writer.setNotes("testNotes");
        writer.setStrategy("json");
        writer.startWriting(mockedCallback);
        expect(PerformWritingJson.prototype.callWrite).toBeCalledWith(
            writer.fileInfo,
            mockedCallback
        );
    });
});
