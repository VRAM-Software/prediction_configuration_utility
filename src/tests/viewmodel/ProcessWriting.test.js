const PerformWritingJson = require("../../viewmodel/perform/writing/PerformWritingJson")
const ProcessWriting = require("../../viewmodel/ProcessWriting")

describe("Tests for ProcessWriting class", () => {
    let writer
    beforeEach(() => {
        writer = new ProcessWriting()
    })

    test("should create the right object based on extension", () => {
        writer.setStrategy("json")
        expect(writer.getStrategy() instanceof PerformWritingJson).toBeTruthy()
    })

    test("getPath should set the right path", () => {
        writer.setPath("testPath")
        writer.setName("testName")
        writer.setTrainingResult({ result: 42 })
        writer.setNotes("testNotes")
        expect(writer.getFileInfo()).toEqual({
            path: "testPath",
            name: "testName",
            trainedJson: { result: 42 },
            notes: "testNotes",
        })
    })
})
