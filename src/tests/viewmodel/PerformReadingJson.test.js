const PerformReadingJson = require("../../viewmodel/perform/reading/PerformReadingJson")
const ReadJson = require("../../model/input/ReadJson")

describe("Tests for class PerformReadingCsv class", () => {
    let readerJson
    beforeEach(() => {
        readerJson = new PerformReadingJson()
    })

    test("should create ReadCsv reader", () => {
        expect(readerJson.getReader() instanceof ReadJson).toBeTruthy()
    })
})
